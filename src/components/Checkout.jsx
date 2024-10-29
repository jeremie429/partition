import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js'
import { CLIENT_ID, APP_SECRET } from '../tools/paypalConfig'
import React from 'react'

import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'




const Checkout = () => {

   const {id} = useParams()
    const [showButtonCheckout, setshowButtonCheckout] = useState(false)
    const [partitionName, setPartitionName] = useState("")



    useEffect( () => {

  fetch("https://partition-backend-2vkhxfcia-jeremie429.vercel.app/titles")
  .then(res => {
    res.json().then(data => {
     
      setPartitionName(data[parseInt(id)].name)
    })
  })
  .catch(err => console.error(err))

}, [id])

function showCheckout(){
        setshowButtonCheckout(true)
}

function hideCheckout(){
        setshowButtonCheckout(false)
}

  function createOrder() {
        return fetch("/my-server/create-paypal-order", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            // use the "body" param to optionally pass additional order information
            // like product ids and quantities
            body: JSON.stringify({
                cart: [
                    {
                        id: "YOUR_PRODUCT_ID",
                        quantity: "YOUR_PRODUCT_QUANTITY",
                    },
                ],
            }),
        })
            .then((response) => response.json())
            .then((order) => order.id);
}
    function onApprove(data) {
          return fetch("/my-server/capture-paypal-order", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              orderID: data.orderID
            })
          })
          .then((response) => response.json())
          .then((orderData) => {
                const name = orderData.payer.name.given_name;
                alert(`Transaction completed by ${name}`);
          });

        }
    

  return (
    
            <div className='partition-page'>
                <div className="wrapper">
                   
                   {partitionName && <h1>{partitionName}</h1>}
                   <button onClick={showCheckout}>GetPartition</button>
                </div>
                <br></br>
             
                    { showButtonCheckout && <PayPalButtons
                        style={{ layout: "vertical" }}
                        
                    /> }
                
            </div>
       
  )
}

export default Checkout
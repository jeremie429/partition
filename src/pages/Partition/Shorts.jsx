import React from 'react'
import { useState } from 'react'

const Shorts = () => {

  const [fileToUpload, setFileToUpload] = useState("")

    async function handleFileSelected(e){

      const file = e.target.files[0]

      const reader = new FileReader()

      //console.log(reader)

      reader.readAsDataURL(file)

      
      reader.onload = () => {
        setFileToUpload(reader.result)
      }
        
    }

    async function handleSaveVideo(){
      const result = await fetch('http://localhost:5000/upload', {
        method : "POST",
        crossDomain : true,
        headers : {
          'Content-Type': 'application/json',
          Accept : "application/json",
          "Access-Control-Allow-Origin" : "*"
        },

        body:
        JSON.stringify(
          {
            fileToUpload
          }
        )
      })
    }
  return (
    <div>
        <input onChange={handleFileSelected} type="file" name="" id="" />
        <input onClick={handleSaveVideo} type="button" value="Save Video" />
    </div>
  )
}

export default Shorts
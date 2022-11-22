import React from 'react'
import Sidebar from '../Sidebar'
import './index.scss'

const Layout = ({children}) => {
  return (
    <div className='layout-container'>
        
        <Sidebar />
      

   <div className="layout-body">

   {
        children
       }

   </div>
    
      

       
    </div>
  )
}

export default Layout
import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='container'>
        <h3 className='coming-soon'>
        Welcome to our website. Happy for your interest. For now we have only develop /partition page. Click to the link below to go to partition page
        </h3>
        <Link to='/partition'>Go to partition page</Link>
    </div>
  )
}

export default Home
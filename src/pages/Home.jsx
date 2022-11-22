import React, { useEffect, useState } from 'react'
import Loader from 'react-loaders'
import { Link } from 'react-router-dom'
import AnimatedLetters from '../components/AnnimatedLetters'
import me from '../assets/me.png'


import "../styles/home.scss"

const Home = () => {


  const [letterClass, setLetterClass] = useState('text-animate')

  setTimeout(() => {
    setLetterClass('text-animate-hover')
  }, 4000);

  const nameArray = ['J', 'e', 'r', 'e', 'm', 'i', 'e', ' ', 'T', 'C', 'H', 'E', 'P', 'N', 'G', 'W', 'A']
  const jobArray = ['F', 'u', 'l', 'l', ' ', 'S','t', 'a', 'c','k',' ', 'D', 'e', 'v', 'e', 'l', 'o', 'p', 'e', 'r']
    useEffect(() => {
      document.title = "TTJ Web Home"

      
    }, [])
    
  return (

      <div className='home-page'>
        <section id="head">

        <div className='text-zone'>

<h1>
 <span className={letterClass}>H</span>
 <span className={`${letterClass} _12`}>i,</span>
  <br />
  <span className={letterClass}>I</span>
 <span className={`${letterClass} _12`}>'m</span>
<span>   </span>

<AnimatedLetters letterClass={letterClass}
strArray={nameArray} idx={15} />

<br />
<AnimatedLetters letterClass={letterClass}
strArray={jobArray} idx={22} />

</h1>

<h2>Frontend Developer / Back End Developer / Java & Javascript Expert / Youtuber</h2>

<Link to="/contact" className='flat-button'>
  CONTACT ME
</Link>

</div>
<div className="img-zone">
  <img src={me} alt="my profile" />
</div>
        </section>
        

        <Loader type='pacman' />
       </div>

  
  )
}

export default Home
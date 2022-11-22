import { faAngular, faCss3, faHtml5, faReact } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import Loader from 'react-loaders'
import AnimatedLetters from '../components/AnnimatedLetters'

import '../styles/about.scss'

const About = () => {

  const [letterClass, setLetterClass] = useState('text-animate')

  useEffect(() => {
    document.title = "About TTJ"

     setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 3000);
  }, [])
  


  return (

    <>
    <div className='container about-page' >


        <div className='text-zone'>

<h1>
  <AnimatedLetters 
  letterClass={letterClass}
  strArray={['A','b', 'o', 'u', 't',' ', 'm', 'e']} idx={15} />
</h1>

<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam temporibus sed iusto sint soluta esse ullam vel saepe eos culpa perferendis quas, cum ipsum laboriosam suscipit, sapiente dolorem odio debitis voluptatibus fuga eius perspiciatis quis consequuntur magnam. Blanditiis, corporis doloremque.</p>
<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quod soluta iusto excepturi nulla. Reprehenderit in amet nobis facere obcaecati provident.</p>
<p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cumque, dolor rerum. Odio autem voluptatibus iste sint reprehenderit saepe omnis rerum, nulla aliquid provident labore a. Molestiae, adipisci. Impedit commodi voluptatibus voluptate sapiente voluptatem saepe repellat inventore. Repellendus, laboriosam ipsam nobis, sint quam corrupti expedita architecto minus provident saepe eum fugiat totam neque hic. Eveniet ipsum itaque sapiente, magnam quis dolorem.</p>
        </div>

        <div className='stage-cube-cont'>
          <div className='cubespinner'>
            <div className='face1'>
                  <FontAwesomeIcon
                  icon={faAngular}
                  color='#DD0031'
                  />
            </div>
            <div className='face2'>
                  <FontAwesomeIcon
                  icon={faHtml5}
                  color='#F06529'
                  />
            </div>
            <div className='face3'>
                  <FontAwesomeIcon
                  icon={faCss3}
                  color='#28A4D9'
                  />
            </div>
            <div className='face4'>
                  <FontAwesomeIcon
                  icon={faReact}
                  color='#5ED4F4'
                  />
            </div>
          </div>
        </div>
    </div>

    <Loader type='pacman' />

    </>
  )
}

export default About
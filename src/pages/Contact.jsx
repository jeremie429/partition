import React from 'react'
import Loader from 'react-loaders'
import AnimatedLetters from '../components/AnnimatedLetters'
import '../styles/contact.scss'

const Contact = () => {
  return (

    <>
    <div className='container contact-page'>
        <div className='text-zone'>

            <h1>
                <AnimatedLetters
                
                strArray={['C', 'o', 'n', 't', 'a', 'c', 't', ' ', 'm', 'e' ]  } idx={15}/>
            </h1>

            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque ut deleniti mollitia, provident ducimus ratione temporibus. Ipsam, nostrum. Rerum, esse. Minima consequatur beatae provident quis cum iure velit ipsa? Eaque optio vel totam in magnam recusandae, incidunt nisi nostrum facere.</p>

            <div className="contact-form">

                <form action="">
                    <ul>
                        <li className="half">
                            <input type="text" name="name"
                            placeholder='Name' id="" required/>
                        </li>
                        <li className="half">
                            <input type="email" name="email"
                            placeholder='Email' id="" required/>
                        </li>
                        <li>
                            <input type="text" name="subject" id=""  placeholder='subject' required/>
                        </li>
                        <li>
                            <textarea name="" id="" cols="30" rows="10"
                            placeholder='Message'
                            required
                            ></textarea>
                        </li>
                        <li>
                            <input type="submit" value="Send" />
                        </li>
                    </ul>
                </form>
            </div>
        </div>


    </div>
        <Loader type='pacman' />
    </>
  )
}

export default Contact
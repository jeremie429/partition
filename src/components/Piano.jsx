import React, { useState } from 'react'
import { playOneAudio } from '../tools/noteFunc';

const Piano = ({        
            currentNote,    
  
            currentAudioSrc,
            noteSyntax
}) => {

  const [time, setTime] = useState(1);
  const [showTimeSelect, setShowTimeSelect] = useState(false)

   async function handleSubmit(e) {
        e.preventDefault();

       // console.log(e.target.offsetParent)

        
        const textArea = e.target.offsetParent.children[1].children[0]
        let currentValueInTextArea = textArea.value

        let textArrLength = currentValueInTextArea.split(";").length

        if(textArrLength >= 25){
          alert("You have passed max notes to insert in this block. Please go to the next area")
          return
        }

       // let duration = parseFloat(time*tempo).toFixed(2)

        let valueToAdd 
         if(currentValueInTextArea === ""){
          valueToAdd = noteSyntax + "," + time 
         }else{
          valueToAdd = ";" + noteSyntax + "," + time 
         }

        textArea.value = currentValueInTextArea + valueToAdd


            setShowTimeSelect(false)
              
      }

    
  return (
   
    <>
    { showTimeSelect &&  <div className='piano-time' onMouseLeave={(e) => setShowTimeSelect(false)}>
      <input type="number" step={0.5} value={time} onChange={e => setTime(e.target.value)} />
      <button onClick={handleSubmit}>Ok</button>
    </div>}
    {!showTimeSelect && <button  className='piano-touch' onClick={(e) => {
       //console.log({currentAudioSrc})

       playOneAudio(currentAudioSrc)
      setShowTimeSelect(true)}}>{currentNote}</button>}
    </>
    
  )
}

export default Piano
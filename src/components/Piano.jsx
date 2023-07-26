import React, { useState } from 'react'
import { playOneAudio } from '../tools/noteFunc';

const Piano = ({        
            currentNote,    
            isPiano,
            tempo,
            relTextArea,
            currentAudioSrc,
            noteSyntax
}) => {

  const [time, setTime] = useState(1);
  const [showTimeSelect, setShowTimeSelect] = useState(false)
  const [noteMultiplication, setNoteMultiplication] = useState(1)

   async function handleSubmit(e) {
        e.preventDefault();

        let currentValueInTextArea = relTextArea.current.value
        let valueToAdd = ""

        for (let i = 0; i < noteMultiplication; i++) {
          if(currentValueInTextArea === "" && valueToAdd === ""){
            if(isPiano){
                valueToAdd = currentAudioSrc + "," + parseFloat(tempo*time).toFixed(2)
            }else{

              
              valueToAdd = noteSyntax + "," + time
            }
            
           }else{
            if(isPiano){
              if(currentValueInTextArea[currentValueInTextArea.length -1].trim() === "|")
              valueToAdd = currentAudioSrc + "," + parseFloat(tempo*time).toFixed(2)
              else valueToAdd += ";"  + currentAudioSrc + "," + parseFloat(tempo*time).toFixed(2)
          }else{

            valueToAdd += ";" + noteSyntax + "," + time
          }
            
           }        
        }
        
        relTextArea.current.value = currentValueInTextArea + valueToAdd


            setShowTimeSelect(false)
              
      }

    
  return (
   
    <>
    { showTimeSelect &&  <div className='piano-time' onMouseLeave={(e) => setShowTimeSelect(false)}>
    <div className='multiply-container'>
        <span>X</span>
        <input min={1}  className='input-multiplication' type="number" step={1} value={noteMultiplication} onChange={e => setNoteMultiplication(e.target.value)} />
      </div>
      <input type="number"min={0} step={0.5} value={time} onChange={e => setTime(e.target.value)} />
      
      
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
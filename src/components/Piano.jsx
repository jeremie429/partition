import React, { useState } from 'react'
import { playOneAudio } from '../tools/noteFunc';

const Piano = ({        
            currentNote,    
            index,     
            incrementPos,
            tempo,
            currentAudioSrc
}) => {

  const [time, setTime] = useState(1);
  const [showTimeSelect, setShowTimeSelect] = useState(false)

   async function handleSubmit(e) {
        e.preventDefault();

       
      
        const pos = incrementPos()
        if(pos>24) return

       
     
            const divToTrigger = e.target.offsetParent.children[1].children[index].children[0]
            
          await  divToTrigger.click()

          const noteContainer = divToTrigger.querySelectorAll('.note-container')[pos]

               
            const noteChoiceBloc = noteContainer.querySelector('.note-choice-bloc')
          const noteBloc = noteChoiceBloc.querySelector('.notes-bloc') 

           if(!noteBloc.classList.contains('selected')){
            await noteBloc.click()
            const formDelay = noteContainer.querySelector('.form-delay')
          const noteControls = formDelay.querySelector('.note-controls')
         const inputDelay = formDelay.querySelector('.input-delay')

         
        // const e = new Event("onchange",  { 'bubbles': true });
         
        
         inputDelay.value = parseFloat(time*tempo).toFixed(2)

          
         // console.log(inputDelay.value)
            const okBtn = noteControls.querySelector('.ok')
            await okBtn.click()
            }

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
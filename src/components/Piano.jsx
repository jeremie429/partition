import React from 'react'

const Piano = ({        
            currentNote,    
            index,     
            incrementPos
}) => {

   async function handleSubmit(e) {
        e.preventDefault();
       // console.log(e.target.offsetParent)
      
        const pos = incrementPos()
        if(pos>24) return
       
     
            const divToTrigger = e.target.offsetParent.children[2].children[index].children[0]
            
          await  divToTrigger.click()

          const noteContainer = divToTrigger.querySelectorAll('.note-container')[pos]

         // console.log({noteContainer})

          
            const noteChoiceBloc = noteContainer.querySelector('.note-choice-bloc')
          const noteBloc = noteChoiceBloc.querySelector('.notes-bloc') 

         // console.log({noteBloc})
          if(!noteBloc.classList.contains('selected')){
            await noteBloc.click()
            const formDelay = noteContainer.querySelector('.form-delay')
          const noteControls = formDelay.querySelector('.note-controls')
            const okBtn = noteControls.querySelector('.ok')
            await okBtn.click()
            }
           
          
        
      }

    
  return (
   
    <button onClick={handleSubmit}>{currentNote}</button>
    
  )
}

export default Piano
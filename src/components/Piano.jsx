import React from 'react'

const Piano = ({        
            currentNote,    
            index,     
            incrementPos
}) => {

   async function handleSubmit(e) {
       // e.preventDefault();
       // console.log({index})
        const pos = incrementPos()
        
            const divToTrigger = e.target.offsetParent.children[1].children[index].children[0]
            
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
           
          
/*
          for(let i = 0;i<divToTrigger.children.length-1; i++){
            let div = divToTrigger.children[i].children[0].children[0]
           if( !div.classList.contains('selected')){
                    
               await div.click()
               console.log(div)
               // const divParent = divToTrigger.children[i].querySelector(".form-delay").querySelector(".note-controls").children[1]
              //  const divChildren = divParent

               //await divParent.click()

                
                break
           }
          }*/
        
        
      }
  return (
    <button onClick={handleSubmit}>{currentNote}</button>
  )
}

export default Piano
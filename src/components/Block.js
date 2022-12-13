import React, { useRef } from 'react'
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import {
  notesUt1Syntax,
  notesUt2Syntax,
  notesUt3Syntax,
  notesUt4Syntax,
  notesFaSyntax,
  notesSolSyntax,
} from '../tools/noteArr'

import CompleteLine from './CompleteLine'
import Piano from './Piano'

function Block({
  audioSrc,
  notesSrc,
  pupitreName,
  imgIcon,
  handleDelay,
  tempo,
  cancelVisibility,
  handleNoteClick,
  blockNum,
  partitionKey,
  diezeAlterations,
  bemolAlterations,
}) {
  const divRef = useRef()
  const arr = [18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0]

  let arrNotes

  switch (partitionKey) {
    case 'sol':
      arrNotes = notesSolSyntax
      break
    case 'fa':
      arrNotes = notesFaSyntax
      break
    case 'ut1':
      arrNotes = notesUt1Syntax
      break
    case 'ut2':
      arrNotes = notesUt2Syntax
      break
    case 'ut3':
      arrNotes = notesUt3Syntax
      break
    case 'ut4':
      arrNotes = notesUt4Syntax
      break
    default:
      break
  }
  /*
  useEffect(() => {
    

    console.log(arrNotes.current[3])
  }, [partitionKey])*/

  const notesRef = useRef()

  /* const pos = useRef(-1)
  //const wordsRef = useRef("");

  function incrementPos(decrement = false) {
    if (decrement) pos.current -= 1
    else pos.current += 1

    return pos.current
  }*/

  async function handleAddSilent(e) {
    e.preventDefault()

    const textArea = e.target.offsetParent.children[1].children[0]
    let currentValueInTextArea = textArea.value

    let time = parseFloat(prompt('please enter duration by step 0.5'))

    let textArrLength = currentValueInTextArea.split(';').length

    if (textArrLength >= 25) {
      alert(
        'You have passed max notes to insert in this block. Please go to the next area'
      )
      return
    }

    // let duration = parseFloat(time*tempo).toFixed(2)

    let valueToAdd
    if (currentValueInTextArea === '') {
      valueToAdd = '-,' + time
    } else {
      valueToAdd = ';-,' + time
    }

    textArea.value = currentValueInTextArea + valueToAdd
  }

  async function handleAdNotes(e) {
    let notesWithTimeArr = notesRef.current.value.split(';')

    // console.log(e.target.offsetParent.children[2])

    const divToTrigger = e.target.offsetParent.children[2]
    /* Array.from(divToTrigger.querySelectorAll('.complete-line')).forEach(
      (bloc) => {
        bloc.children.item(1).innerHTML = ''
      }
    )*/

    //await divRef.current.click()

    const maxLength =
      notesWithTimeArr.length > 25 ? 25 : notesWithTimeArr.length

    for (let i = 0; i < maxLength; i++) {
      const element = notesWithTimeArr[i]
      const elNoteWithPos = element.split(',')[0]
      const elTime = element.split(',')[1]
      const regex = /[0-9]/

      const isSilent = elNoteWithPos[0] === '-'

      //console.log({ isSilent })
      let duration = parseFloat(elTime) * tempo

      if (isSilent) {
        const divToClick = Array.from(
          await divToTrigger.querySelectorAll('.complete-line')
        )
          .reverse()[9]
          .children.item(1)
        //console.log({ divToClick })
        await divToClick.click()

        // const posOrder = incrementPos()

        let noteContainer = divToClick.children.item(i)
        // console.log({ noteContainer })
        let soupirToTriggered = noteContainer.children.item(0).children.item(1)

        await soupirToTriggered.click()

        const formDelay = await noteContainer.querySelector('.form-delay')
        const noteControls = await formDelay.querySelector('.note-controls')
        const inputDelay = await formDelay.querySelector('.input-delay')

        inputDelay.value = parseFloat(duration).toFixed(2)

        const okBtn = await noteControls.querySelector('.ok')
        await okBtn.click()

        // console.log({ noteContainer })
      } else {
        const elNote = elNoteWithPos.split(regex)[0]
        const notePos = parseInt(elNoteWithPos.match(regex)[0])

        const posInNoteArr = notesSrc.indexOf(elNote) + (notePos - 1) * 7

        const divToClick = Array.from(
          await divToTrigger.querySelectorAll('.complete-line')
        )
          .reverse()
          [posInNoteArr].children.item(1)

        if (divToClick.children.length === 0) await divToClick.click()
        // console.log({ divToClick })

        //const posOrder = incrementPos()

        //let childrenOfDivClicked = divToClick.children

        let noteContainer = divToClick.children.item(i)
        // console.log({ noteContainer })
        let noteToTriggered = noteContainer.children.item(0).children.item(0)

        await noteToTriggered.click()

        const formDelay = await noteContainer.querySelector('.form-delay')

        // console.log({ formDelay })
        const noteControls = await formDelay.querySelector('.note-controls')
        const inputDelay = await formDelay.querySelector('.input-delay')

        // const e = new Event("onchange",  { 'bubbles': true });

        inputDelay.value = parseFloat(duration).toFixed(2)

        const okBtn = await noteControls.querySelector('.ok')
        await okBtn.click()
      }
    }
  }

  return (
    <div className="block-container" id={uuidv4()}>
      <div className="piano-notes">
        {arr.map((i, pos) => {
          //currentNote = notesSrc[i];
          //currentAudioSrc = audioSrc[i];
          return (
            <Piano
              //blockNum={blockNum}
              currentAudioSrc={audioSrc[pos]}
              currentNote={notesSrc[pos]}
              key={uuidv4()}
              noteSyntax={arrNotes[pos]}
              // handleDelay={handleDelay}
              //tempo={tempo}
              // cancelVisibility={cancelVisibility}
              // handleNoteClick={handleNoteClick}
              //pupitreName={pupitreName}
              index={i}
              //pos={pos}
              tempo={tempo}
              // incrementPos={incrementPos}
            />
          )
        })}

        <button className="piano-touch" onClick={handleAddSilent}>
          -
        </button>
      </div>
      <div className="notes-area">
        <textarea
          className="notes-array"
          ref={notesRef}
          placeholder={
            'Add Notes for ' +
            pupitreName +
            ' as Example: (do1,1.5;re1,0.5;mi2,1;fa2,1)'
          }
        ></textarea>
        <button onClick={handleAdNotes}>Add Notes</button>
      </div>

      <div ref={divRef} className="div-line-container">
        <img src={imgIcon} className="img-icon" alt="key icon" />

        {arr.map((i) => {
          let num = i % 2
          // currentNote = notesSrc[i];
          // currentAudioSrc = audioSrc[i];
          let classType = num === 0 && i < 13 && i > 3 ? 'line' : 'band'
          return (
            <CompleteLine
              blockNum={blockNum}
              currentAudioSrc={audioSrc[i]}
              currentNote={notesSrc[i]}
              classType={classType}
              key={uuidv4()}
              handleDelay={handleDelay}
              tempo={tempo}
              cancelVisibility={cancelVisibility}
              handleNoteClick={handleNoteClick}
              pupitreName={pupitreName}
              bemolAlterations={bemolAlterations}
              diezeAlterations={diezeAlterations}

              //incrementPos={incrementPos}
            />
          )
        })}
      </div>
      <div className="pupitre-name"> {pupitreName}</div>
    </div>
  )
}

export default Block

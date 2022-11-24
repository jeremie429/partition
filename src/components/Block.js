import React, { useRef } from 'react'
import { v4 as uuidv4 } from 'uuid'

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
}) {
  const divRef = useRef()
  const arr = [17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0]

  const notesRef = useRef()

  const pos = useRef(-1)
  //const wordsRef = useRef("");

  function incrementPos(decrement = false) {
    if (decrement) pos.current -= 1
    else pos.current += 1

    return pos.current
  }

  async function handleAddSilent(e) {
    e.preventDefault()
    const pos = incrementPos()
    if (pos > 24) return

    const divToTrigger =
      e.target.offsetParent.children[2].children[9].children[0]

    await divToTrigger.click()

    const noteContainer = divToTrigger.querySelectorAll('.note-container')[pos]

    // console.log({noteContainer})

    const noteChoiceBloc = noteContainer.querySelector('.note-choice-bloc')
    const noteBloc = noteChoiceBloc.querySelector('.soupir')

    // console.log({noteBloc})
    if (!noteBloc.classList.contains('selected')) {
      await noteBloc.click()
      const formDelay = noteContainer.querySelector('.form-delay')

      const inputDelay = formDelay.querySelector('.input-delay')
      let time = parseFloat(prompt('please enter duration by step 0.5'))
      inputDelay.value = parseFloat(time * tempo).toFixed(2)
      const noteControls = formDelay.querySelector('.note-controls')
      const okBtn = noteControls.querySelector('.ok')
      await okBtn.click()
    }
  }

  async function handleAdNotes(e) {
    let notesWithTimeArr = notesRef.current.value.split(';')

    const divToTrigger = e.target.offsetParent.children[2]

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
          divToTrigger.querySelectorAll('.complete-line')
        )
          .reverse()[9]
          .children.item(0)
        // console.log({ divToClick })
        await divToClick.click()

        const posOrder = incrementPos()

        let noteContainer = divToClick.children.item(i)
        let soupirToTriggered = noteContainer.children.item(0).children.item(1)

        await soupirToTriggered.click()

        const formDelay = noteContainer.querySelector('.form-delay')
        const noteControls = formDelay.querySelector('.note-controls')
        const inputDelay = formDelay.querySelector('.input-delay')

        inputDelay.value = parseFloat(duration).toFixed(2)

        const okBtn = noteControls.querySelector('.ok')
        await okBtn.click()

        // console.log({ noteContainer })
      } else {
        const elNote = elNoteWithPos.split(regex)[0]
        const notePos = parseInt(elNoteWithPos.match(regex)[0])

        const posInNoteArr = notesSrc.indexOf(elNote) + (notePos - 1) * 7

        const divToClick = Array.from(
          divToTrigger.querySelectorAll('.complete-line')
        )
          .reverse()
          [posInNoteArr].children.item(0)
        //console.log({ divToClick })
        await divToClick.click()

        const posOrder = incrementPos()

        //let childrenOfDivClicked = divToClick.children

        let noteContainer = divToClick.children.item(i)
        let noteToTriggered = noteContainer.children.item(0).children.item(0)

        //console.log({ noteContainer })
        await noteToTriggered.click()

        const formDelay = noteContainer.querySelector('.form-delay')
        const noteControls = formDelay.querySelector('.note-controls')
        const inputDelay = formDelay.querySelector('.input-delay')

        // const e = new Event("onchange",  { 'bubbles': true });

        inputDelay.value = parseFloat(duration).toFixed(2)

        const okBtn = noteControls.querySelector('.ok')
        await okBtn.click()
      }

      /*
      console.log({
        element,
        elNote,
        elTime,
        notePos,
        notesSrc: notesSrc[posInNoteArr],
        posOrder,
        noteToTriggered,
        i,
        posInNoteArr,
      })*/
    }

    //let additionalBlock = notesWithTimeArr.length % 25 > 0 ? 1 : 0
    /*
    let lengthOfPupitre =
      Math.floor(notesWithTimeArr.length / 25) + additionalBlock*/
    // duration  -> ok
    // duration  -> ok
    // duration  -> ok
    // duration  -> ok
    // duration  -> ok
    // duration  -> ok
    // duration  -> ok
    // duration  -> ok

    /*

    sopranoNotes.push({
      duration: delay,
      note: currentAudioSrc,
      id,
      isSoupir,
      isLinked,
      positionInArr,
      noteTextDiv 
    })*/
    /*
    let composedArr

    switch (pupitre) {
      case 'Soprano':
        // console.log("soprano to delete");
        composedArr = sopranoNotes
        break
      case 'Alto':
        composedArr = altoNotes
        break
      case 'Tenor':
        composedArr = tenorNotes
        break
      case 'Bass':
        composedArr = bassNotes
        break

      default:
        break
    }*/
  }

  return (
    <div className="block-container">
      <div className="piano-notes">
        {arr.map((i, index) => {
          //currentNote = notesSrc[i];
          //currentAudioSrc = audioSrc[i];
          return (
            index < 17 && (
              <Piano
                //blockNum={blockNum}
                currentAudioSrc={audioSrc[index + 1]}
                currentNote={notesSrc[index + 1]}
                key={uuidv4()}
                // handleDelay={handleDelay}
                //tempo={tempo}
                // cancelVisibility={cancelVisibility}
                // handleNoteClick={handleNoteClick}
                //pupitreName={pupitreName}
                index={i}
                //pos={pos}
                tempo={tempo}
                incrementPos={incrementPos}
              />
            )
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
              incrementPos={incrementPos}
            />
          )
        })}
      </div>
      <div className="pupitre-name"> {pupitreName}</div>
    </div>
  )
}

export default Block

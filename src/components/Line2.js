import { useEffect, useState } from 'react'
import Note from './Note'

import { v4 as uuidv4 } from 'uuid'
function Line({
  note,
  audio,
  classType,
  isDieze,
  isBemol,
  handleDelay,
  tempo,
  cancelVisibility,
  handleNoteClick,
  pupitreName,
  blockNum,
  incrementPos,
}) {
  const [createNote, setCreateNote] = useState(false)
  const [elWidth, setElWidth] = useState(0)
  const [spaceUnit, setSpaceUnit] = useState(0)

  let id = uuidv4()

  useEffect(() => {
    setCreateNote(false)

    window.addEventListener('resize', (e) => {
      let el = document.getElementById(id)
      setElWidth(el.clientWidth)

      setSpaceUnit(el.clientWidth / 24)
      console.log(spaceUnit)
    })
    return () => {}
  }, [setCreateNote])

  function handleLineClick(e) {
    e.preventDefault()
    // if (createNote === false) {
    setCreateNote(true)
    //console.log(createNote);
    //}
  }
  return (
    <div className={classType} onClick={handleLineClick} id={id}>
      {createNote &&
        Array(25)
          .fill()
          .map((el, index) => {
            //console.log(index);
            return (
              <Note
                key={uuidv4()}
                currentNote={note}
                currentAudio={audio}
                handleNoteClick={handleNoteClick}
                handleDelay={handleDelay}
                pupitreName={pupitreName}
                tempo={tempo}
                cancelVisibility={cancelVisibility}
                isDieze={isDieze}
                isBemol={isBemol}
                positionInLine={index}
                blockNum={blockNum}
                incrementPos={incrementPos}
              />
            )
          })}
    </div>
  )
}

export default Line

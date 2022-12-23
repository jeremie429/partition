import React, { useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

function Note({
  currentNote,
  currentAudio,
  handleNoteClick,
  pupitreName,
  handleDelay,
  tempo,
  cancelVisibility,
  isDieze,
  isBemol,
  blockNum,
  positionInLine,
}) {
  let currentAudioDieze = currentAudio.split('')
  currentAudioDieze.splice(1, 0, '#')
  currentAudioDieze = currentAudioDieze.join('')
  let currentNoteDieze = currentNote + '#'

  let currentAudioBemol = currentAudio.split('')
  currentAudioBemol.splice(1, 0, 'b')
  currentAudioBemol = currentAudioBemol.join('')
  var uniCodeBemol = '\u266d'
  let currentNoteBemol = currentNote + uniCodeBemol

  const [visible, setVisible] = useState(false)
  const [blocVisible, setBlocVisible] = useState(false)
  const [vueDelayButton, setVueDelayButton] = useState(true)
  const [isSoupir, setIsSoupir] = useState(false)
  const [isBeccarre, setIsBeccarre] = useState(false)
  const [isLinked, setIsLinked] = useState(false)
  /*const [delay, setDelay] = useState(tempo);
  const delayRef = useRef(tempo);*/
  const [noteText, setNoteText] = useState(
    isDieze
      ? currentNoteDieze
      : isBemol && !isBeccarre
      ? currentNoteBemol
      : currentNote
  )

  const [noteAudio, setNoteAudio] = useState(
    isDieze
      ? currentAudioDieze
      : isBemol && !isBeccarre
      ? currentAudioBemol
      : currentAudio
  )

  let step = Math.round((tempo / 2) * 100) / 100
  let id = useRef(uuidv4())
  let noteTextId = useRef()
  let noteDelay = useRef()

  const [hideText, setHideText] = useState(true)

  function handleSubmit(e) {
    let noteTextDiv = noteTextId.current
    let duration = parseFloat(noteDelay.current.value)

    handleNoteClick(
      noteAudio,
      pupitreName,
      duration,
      visible,
      id.current,
      isSoupir,
      isBeccarre,
      positionInLine,
      blockNum,
      noteTextDiv,
      isLinked
    )

    setVueDelayButton(false)
    setHideText(false)
  }

  function handleCancel(e) {
    setVisible(false)
    cancelVisibility(id.current, pupitreName)
  }

  return (
    <div id={id.current} className="note-container">
      <div className="note-choice-bloc">
        <div
          className={blocVisible ? 'notes-bloc selected' : 'notes-bloc'}
          onClick={(e) => {
            e.preventDefault()
            if (!visible) setVisible(true)
            setBlocVisible(true)
            setIsSoupir(false)
            //else handleCancel()
          }}
        >
          <div className={blocVisible ? 'note-line' : ''}></div>
        </div>

        <div
          className={isSoupir ? 'soupir selected' : 'soupir'}
          onClick={(e) => {
            setIsSoupir(true)
            setBlocVisible(false)
            if (!visible) setVisible(true)
            //else handleCancel()
          }}
        ></div>
      </div>

      {visible && !isSoupir && (
        <input
          value={noteText}
          onChange={(e) => {
            setNoteText(e.target.value)
            e.target.style.width = e.target.value.length + 2 + 'ch'
          }}
          ref={noteTextId}
          className={hideText ? 'note-text up' : 'note-text'}
          type="text"
        />
      )}

      {visible && (
        <div className="form-delay">
          <input
            className="input-delay"
            type="number"
            ref={noteDelay}
            onChange={(e) => {
              // console.log("onChange triggered!");
              let value = parseFloat(e.target.value)
              //setDelay(value);

              if (!vueDelayButton) setVueDelayButton(true)
              handleDelay(id.current, value)

              setHideText(true)
            }}
            step={step}
          />

          <div
            className={
              vueDelayButton ? 'note-controls' : 'note-controls hidden'
            }
          >
            <input
              onClick={(e) => {
                handleCancel()
              }}
              className="btn cancel"
              value="X"
              type="button"
            />
            <input
              className="btn ok"
              onClick={handleSubmit}
              type="button"
              value="Ok"
            />
            {!isDieze && !isBemol && !isSoupir && (
              <input
                onClick={(e) => {
                  setNoteText(currentNoteDieze)
                  setNoteAudio(currentAudioDieze)
                }}
                className="btn dieze"
                value="#"
                type="button"
              />
            )}
            {!isBemol && !isDieze && !isSoupir && (
              <input
                onClick={(e) => {
                  setNoteText(currentNoteBemol)
                  setNoteAudio(currentAudioBemol)
                }}
                className="btn bemol"
                value="&#9837;"
                type="button"
              />
            )}

            {(isDieze || isBemol) && (
              <div
                className="becarre"
                onClick={(e) => {
                  if (!isBeccarre) {
                    setNoteAudio(currentAudio)
                    setNoteText(currentNote)
                    setIsBeccarre((prev) => !prev)
                  }
                }}
              >
                {'\u266E'}
              </div>
            )}
            <div
              className="infinite"
              onClick={(e) => {
                setIsLinked((prev) => !prev)
              }}
            >
              {'\u221E'}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Note

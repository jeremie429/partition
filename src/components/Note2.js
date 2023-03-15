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

  return <div id={id.current} className="note-container"></div>
}

export default Note

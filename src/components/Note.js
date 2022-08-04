import React, { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

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
}) {
  let currentAudioDieze = currentAudio.split("");
  currentAudioDieze.splice(1, 0, "#");
  currentAudioDieze = currentAudioDieze.join("");
  let currentNoteDieze = currentNote + "#";

  let currentAudioBemol = currentAudio.split("");
  currentAudioBemol.splice(1, 0, "b");
  currentAudioBemol = currentAudioBemol.join("");
  var uniCodeBemol = "\u266d";
  let currentNoteBemol = currentNote + uniCodeBemol;

  const [visible, setVisible] = useState(false);
  const [vueDelayButton, setVueDelayButton] = useState(true);
  const [delay, setDelay] = useState(tempo);
  const [noteText, setNoteText] = useState(
    isDieze ? currentNoteDieze : isBemol ? currentNoteBemol : currentNote
  );
  const [noteAudio, setNoteAudio] = useState(
    isDieze ? currentAudioDieze : isBemol ? currentAudioBemol : currentAudio
  );
  let step = Math.round((tempo / 2) * 100) / 100;
  let id = useRef(uuidv4());

  function handleSubmit(e) {
    e.preventDefault();

    handleNoteClick(noteAudio, pupitreName, delay, visible, id.current);
    //console.log({ delay });
    setVueDelayButton(false);
  }

  /*useEffect(() => {
    console.log({ visible });
  }, [visible]);*/

  function handleCancel(e) {
    setVisible(false);
    cancelVisibility(id.current, pupitreName);
  }

  return (
    <div
      className={visible ? "notes-bloc selected" : "notes-bloc"}
      onClick={(e) => {
        // console.log("parent div clicked");
        if (!visible) setVisible(true);
      }}
      onDoubleClick={handleCancel}
      id={id.current}
    >
      {visible && (
        <div className="form-delay">
          <input
            className="input-delay"
            type="number"
            value={delay}
            onChange={(e) => {
              let value = parseFloat(e.target.value);
              setDelay(value);
              //console.log({ delay });
              if (!vueDelayButton) setVueDelayButton(true);
              handleDelay(id.current, value);
            }}
            //min={0.3}
            // max={5.0}
            step={step}
          />
          {vueDelayButton && (
            <div className="note-controls">
              <input
                onClick={(e) => {
                  // console.log("cancel button clicked");
                  setVisible(false);
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
              {!isDieze && !isBemol && (
                <input
                  onClick={(e) => {
                    setNoteText(currentNoteDieze);
                    setNoteAudio(currentAudioDieze);
                  }}
                  className="btn dieze"
                  value="#"
                  type="button"
                />
              )}
              {!isBemol && !isDieze && (
                <input
                  onClick={(e) => {
                    setNoteText(currentNoteBemol);
                    setNoteAudio(currentAudioBemol);
                  }}
                  className="btn bemol"
                  value="&#9837;"
                  type="button"
                />
              )}
            </div>
          )}
        </div>
      )}
      {visible && (
        <div className="note-circle">
          <div className="note-line"></div>
        </div>
      )}
      {visible && (
        <input
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          className="note-text"
          type="text"
        />
      )}
    </div>
  );
}

export default Note;

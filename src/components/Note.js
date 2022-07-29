import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

function Note({
  currentNote,
  currentAudio,
  handleNoteClick,
  pupitreName,
  handleDelay,
  tempo,
  cancelVisibility,
}) {
  let count = 0;
  const [visible, setVisible] = useState(false);
  const [vueDelayButton, setVueDelayButton] = useState(true);
  const [delay, setDelay] = useState(tempo);
  let step = Math.round((tempo / 2) * 100) / 100;
  let id = useRef(uuidv4());

  function handleSubmit(e) {
    e.preventDefault();
    handleNoteClick(currentAudio, pupitreName, delay, visible, id.current);
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

  //console.log();

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
            <>
              <input
                className="submit-delay"
                onClick={handleSubmit}
                type="button"
                value="Ok"
              />
              <input
                onClick={(e) => {
                  // console.log("cancel button clicked");
                  setVisible(false);
                }}
                value="Cancel"
                type="button"
              />
            </>
          )}
        </div>
      )}
      {visible && (
        <div className="note-circle">
          <div className="note-line"></div>
        </div>
      )}
      {visible && <p className="note-text">{currentNote}</p>}
    </div>
  );
}

export default Note;

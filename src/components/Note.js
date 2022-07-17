import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

function Note({ currentNote, currentAudio, handleNoteClick, pupitreName }) {
  const [visible, setVisible] = useState(false);
  const [vueDelayButton, setVueDelayButton] = useState(true);
  const [delay, setDelay] = useState(0.5);
  let id = uuidv4();

  //console.log(visible);

  useEffect(() => {
    setVisible(false);

    return () => {};
  }, [setVisible]);

  function handleDelay(e) {
    let value = parseFloat(e.target.value);
    setDelay(value);
    setVueDelayButton(true);
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleNoteClick(currentAudio, pupitreName, delay, visible, id);
    //console.log({ delay });
    setVueDelayButton(false);
  }
  return (
    <div
      className={visible ? "notes-bloc selected" : "notes-bloc"}
      onClick={(e) => {
        e.preventDefault();

        setVisible(true);

        // handleNoteClick(currentAudio, pupitreName);
      }}
    >
      {visible && (
        <div className="form-delay">
          <input
            className="input-delay"
            type="number"
            value={delay}
            onChange={handleDelay}
            min={0.5}
            max={5.0}
            step={0.2}
          />
          {vueDelayButton && (
            <input
              className="submit-delay"
              onClick={handleSubmit}
              type="submit"
              value="Ok"
            />
          )}
        </div>
      )}
      <div className="note-circle">
        <div className="note-line"></div>
      </div>
    </div>
  );
}

export default Note;

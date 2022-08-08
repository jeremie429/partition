import { useEffect, useState } from "react";
import Note from "./Note";

import { v4 as uuidv4 } from "uuid";
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
}) {
  const [createNote, setCreateNote] = useState();

  useEffect(() => {
    setCreateNote(false);

    return () => {};
  }, [setCreateNote]);

  function handleLineClick(e) {
    e.preventDefault();
    if (createNote === false) {
      setCreateNote(true);
      //console.log(createNote);
    }
  }
  return (
    <div className={classType} onClick={handleLineClick}>
      {createNote &&
        Array(25)
          .fill()
          .map((el) => {
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
              />
            );
          })}
    </div>
  );
}

export default Line;

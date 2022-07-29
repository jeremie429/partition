import React, { useEffect, useRef, useState } from "react";
import Note from "./Note";
import { v4 as uuidv4 } from "uuid";
import Icon from "../tools/keysIcon";

function Block({
  audioSrc,
  notesSrc,
  pupitreName,
  handleNoteClick,
  imgIcon,
  handleDelay,
  tempo,
  cancelVisibility,
}) {
  const divRef = useRef();
  const arr = [17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0];

  // console.log({ imgIcon });
  //console.log({ solIcon });

  let currentNote;
  let currentAudioSrc;

  function Line({ note, audio, classType }) {
    const [createNote, setCreateNote] = useState();

    useEffect(() => {
      setCreateNote(false);

      return () => {};
    }, [setCreateNote]);

    function handleLineClick(e) {
      e.preventDefault();
      if (createNote == false) {
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
                />
              );
            })}
      </div>
    );
  }

  return (
    <>
      <div ref={divRef} className="div-line-container">
        <img src={imgIcon} className="img-icon" />
        {arr.map((i) => {
          let num = i % 2;
          currentNote = notesSrc[i];
          currentAudioSrc = audioSrc[i];
          let classType = num === 0 && i < 13 && i > 3 ? "line" : "band";
          return (
            <Line
              note={currentNote}
              audio={currentAudioSrc}
              classType={classType}
              key={uuidv4()}
            />
          );
        })}
      </div>
      <p className="pupitre-name"> {pupitreName}</p>
    </>
  );
}

export default Block;

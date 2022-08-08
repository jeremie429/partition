import React, { useRef } from "react";
import { v4 as uuidv4 } from "uuid";

import CompleteLine from "./CompleteLine";

function Block({
  audioSrc,
  notesSrc,
  pupitreName,
  imgIcon,
  handleDelay,
  tempo,
  cancelVisibility,
  handleNoteClick,
}) {
  const divRef = useRef();
  const arr = [17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0];

  // console.log({ imgIcon });
  //console.log({ solIcon });

  let currentNote;
  let currentAudioSrc;

  return (
    <>
      <div ref={divRef} className="div-line-container">
        <img src={imgIcon} className="img-icon" alt="key icon" />
        {arr.map((i) => {
          let num = i % 2;
          currentNote = notesSrc[i];
          currentAudioSrc = audioSrc[i];
          let classType = num === 0 && i < 13 && i > 3 ? "line" : "band";
          return (
            <CompleteLine
              currentAudioSrc={currentAudioSrc}
              currentNote={currentNote}
              classType={classType}
              key={uuidv4()}
              handleDelay={handleDelay}
              tempo={tempo}
              cancelVisibility={cancelVisibility}
              handleNoteClick={handleNoteClick}
              pupitreName={pupitreName}
            />
          );
        })}
      </div>
      <p className="pupitre-name"> {pupitreName}</p>
    </>
  );
}

export default Block;

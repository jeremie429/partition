import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import CompleteLine from "./CompleteLine";
import Piano from "./Piano";

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
  const divRef = useRef();
  const arr = [17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0];

  const pos = useRef(-1);

  function incrementPos() {
    pos.current += 1;

    return pos.current;
  }

  // console.log({ imgIcon });
  //console.log({ solIcon });

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
                // currentAudioSrc={audioSrc[index + 1]}
                currentNote={notesSrc[index + 1]}
                key={uuidv4()}
                // handleDelay={handleDelay}
                //tempo={tempo}
                // cancelVisibility={cancelVisibility}
                // handleNoteClick={handleNoteClick}
                //pupitreName={pupitreName}
                index={i}
                //pos={pos}
                incrementPos={incrementPos}
              />
            )
          );
        })}
      </div>
      <div ref={divRef} className="div-line-container">
        <img src={imgIcon} className="img-icon" alt="key icon" />
        {arr.map((i) => {
          let num = i % 2;
          // currentNote = notesSrc[i];
          // currentAudioSrc = audioSrc[i];
          let classType = num === 0 && i < 13 && i > 3 ? "line" : "band";
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
            />
          );
        })}
      </div>
      <div className="pupitre-name"> {pupitreName}</div>
    </div>
  );
}

export default Block;

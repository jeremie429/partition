import {useState} from 'react'
import Line from './Line';

 function CompleteLine({ currentNote, currentAudioSrc, classType, handleDelay,
    tempo,
    cancelVisibility,
    handleNoteClick, pupitreName, blockNum, diezeAlterations,
    bemolAlterations,}) {
    const [isDieze, setIsDieze] = useState(diezeAlterations.indexOf(currentNote) !== -1 ? true : false);
    const [isBemol, setIsBemol] = useState(bemolAlterations.indexOf(currentNote) !== -1 ? true : false);

    return (
      <div className="complete-line">
        <div className="line-note">
          {currentNote}
        </div>
        <Line
        blockNum = {blockNum}
          note={currentNote}
          audio={currentAudioSrc}
          classType={classType}
          isDieze={isDieze}
          isBemol={isBemol}
          handleDelay={handleDelay}
          tempo={tempo}
          cancelVisibility={cancelVisibility}
          handleNoteClick={handleNoteClick}
          pupitreName={pupitreName}
          
          
        />
        <div
          onClick={(e) => {
            setIsDieze((prev) => !prev);
          }}
          className={isDieze ? "dieze-line-selected" : "dieze-line"}
        >
          #
        </div>

        <div
          onClick={(e) => {
            setIsBemol((prev) => !prev);
          }}
          className={isBemol ? "bemol-line-selected" : "bemol-line"}
        >
          &#9837;
        </div>
      </div>
    );
  }

  export default CompleteLine;
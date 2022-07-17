import React from "react";
import { playSnd } from "./tools/noteFunc";
import { v4 as uuidv4 } from "uuid";
import {
  notesSolKey,
  notesFaKey,
  audioSolKey,
  audioFaKey,
} from "./tools/noteArr";
import { useEffect, useState } from "react";
import Block from "./components/Block";

function App() {
  /*const [altoNotes, setAltoNotes] = useState();
  const [sopranoNotes, setSopranoNotes] = useState();
  const [tenorNotes, setTenorNotes] = useState();
  const [bassNotes, setBassNotes] = useState();*/

  let altoNotes = [];
  let sopranoNotes = [];
  let tenorNotes = [];
  let bassNotes = [];
  let keyforAlto;
  let keyForTenor;

  const [notesArrForAlto, setNotesArrForAlto] = useState(notesSolKey);
  const [notesForTenor, setNotesForTenor] = useState(notesFaKey);
  let audioArrForAlto = audioSolKey;
  let audioArrForTenor = audioFaKey;

  const [numSopranoBlock, setNumSopranoBlock] = useState(1);
  const [numAltoBlock, setNumAltoBlock] = useState(1);
  const [numTenorBlock, setNumTenorBlock] = useState(1);
  const [numBassBlock, setNumBassBlock] = useState(1);

  /*const sopranoDiv = useRef();
  const altoDiv = useRef();
  const tenorDiv = useRef();
  const bassDiv = useRef();*/

  useEffect(() => {
    // const solBlock = document.getElementById("block");

    return () => {};
  }, []);

  keyforAlto = prompt(
    "Please enter your partition for Alto. Type sol or fa",
    "sol"
  );
  if (keyforAlto == "fa") {
    audioArrForAlto = audioFaKey;
  }

  keyForTenor = prompt(
    "Please enter your partition for Tenor. Type sol or fa",
    "fa"
  );

  if (keyForTenor == "sol") {
    console.log({ keyForTenor });
    audioArrForTenor = audioSolKey;
  }

  function handleNoteClick(currentAudioSrc, pupitreName, delay, visible, id) {
    // window.location.reload(false);
    switch (pupitreName) {
      case "Soprano":
        console.log({ visible });
        if (visible) {
          let index = sopranoNotes.length;
          sopranoNotes.push({
            note: currentAudioSrc,
            duration: delay,
            index,
            id,
          });
        } else {
          let noteToDelete = sopranoNotes.filter((obj) => obj.id == id);
          let indexToDelete = sopranoNotes.indexOf(noteToDelete);
          sopranoNotes.splice(indexToDelete, 1);
        }
        break;
      case "Alto":
        altoNotes.push({
          note: currentAudioSrc,
          duration: delay,
        });
        break;
      case "Tenor":
        tenorNotes.push({
          note: currentAudioSrc,
          duration: delay,
        });
        break;
      case "Bass":
        bassNotes.push({
          note: currentAudioSrc,
          duration: delay,
        });
        break;

      default:
        break;
    }
  }

  function handleAddBtn(e, pupitre) {
    //console.log(e);
    switch (e.target.id) {
      case "add-soprano":
        setNumSopranoBlock((current) => current + 1);
        console.log(numSopranoBlock);
        break;
      case "add-alto":
        setNumAltoBlock((current) => current + 1);
        break;
      case "add-tenor":
        setNumTenorBlock((current) => (current += 1));
        break;
      case "add-bass":
        setNumBassBlock((current) => current + 1);
        break;

      default:
        break;
    }
  }
  function handlePlayBtn(e) {
    switch (e.target.id) {
      case "soprano-btn":
        playSnd(sopranoNotes);
        break;
      case "alto-btn":
        playSnd(altoNotes);
        break;
      case "tenor-btn":
        playSnd(tenorNotes);
        break;
      case "bass-btn":
        playSnd(bassNotes);
        break;

      default:
        break;
    }
  }

  return (
    <div className="container">
      <div className="sol-key" id="block">
        <div className="controls">
          <button onClick={handlePlayBtn} id="soprano-btn">
            Play Soprano
          </button>
          <button onClick={handlePlayBtn} id="alto-btn">
            Play Alto
          </button>
          <button onClick={handlePlayBtn} id="tenor-btn">
            Play Tenor
          </button>
          <button onClick={handlePlayBtn} id="bass-btn">
            Play Bass
          </button>
          <button onClick={(e) => handleAddBtn(e, "soprano")} id="add-soprano">
            Add Soprano
          </button>
          <button onClick={(e) => handleAddBtn(e, "alto")} id="add-alto">
            Add Alto
          </button>
          <button onClick={(e) => handleAddBtn(e, "tenor")} id="add-tenor">
            Add Tenor
          </button>
          <button onClick={(e) => handleAddBtn(e, "bass")} id="add-bass">
            Add Bass
          </button>
        </div>

        <div id="soprano" className="pupitre">
          {Array(numSopranoBlock)
            .fill()
            .map(() => (
              <Block
                audioSrc={audioSolKey}
                notesSrc={notesSolKey}
                pupitreName="Soprano"
                handleNoteClick={handleNoteClick}
                key={uuidv4()}
              />
            ))}
        </div>
        <div id="alto" className="pupitre">
          {Array(numAltoBlock)
            .fill()
            .map(() => (
              <Block
                key={uuidv4()}
                audioSrc={audioArrForAlto}
                notesSrc={notesArrForAlto}
                pupitreName="Alto"
                handleNoteClick={handleNoteClick}
              />
            ))}
        </div>
        <div id="tenor" className="pupitre">
          {Array(numTenorBlock)
            .fill()
            .map(() => (
              <Block
                key={uuidv4()}
                audioSrc={audioArrForTenor}
                notesSrc={notesForTenor}
                pupitreName="Tenor"
                handleNoteClick={handleNoteClick}
              />
            ))}
        </div>
        <div id="bass" className="pupitre">
          {Array(numBassBlock)
            .fill()
            .map(() => (
              <Block
                key={uuidv4()}
                audioSrc={audioFaKey}
                notesSrc={notesFaKey}
                pupitreName="Bass"
                handleNoteClick={handleNoteClick}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;

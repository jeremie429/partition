import React, { useEffect, useRef, useState } from 'react'
import Block from '../components/Block';
import { audioFaKey, audioSolKey, notesFaKey, notesSolKey } from '../tools/noteArr';
import {solIcon, faIcon} from "../tools/keysIcon";
import { v4 as uuidv4 } from "uuid";
import { playSnd } from "../tools/noteFunc";
import { startRecording, stopRecording } from "../tools/recorderFunc";

import "../styles/partition.css"
const Partition = () => {
  
    let altoNotes = [];
    let sopranoNotes = [];
    let tenorNotes = [];
    let bassNotes = [];
  
    const [notesArrForAlto, setNotesArrForAlto] = useState(notesSolKey);
    const [notesForTenor, setNotesForTenor] = useState(notesFaKey);
    const [audioForAlto, setAudioForAlto] = useState(audioSolKey);
    const [audioForTenor, setAudioForTenor] = useState(audioFaKey);
    const [tempo, setTempo] = useState(90);
    const [keyForAlto, setKeyForAlto] = useState("sol");
    const [keyForTenor, setKeyForTenor] = useState("fa");
    let currentPitre;
  
    //let audioArrForAlto = audioSolKey;
    // let audioArrForTenor = audioFaKey;
  
    const [numSopranoBlock, setNumSopranoBlock] = useState(1);
    const [numAltoBlock, setNumAltoBlock] = useState(1);
    const [numTenorBlock, setNumTenorBlock] = useState(1);
    const [numBassBlock, setNumBassBlock] = useState(1);
  
    let titleref = useRef();

    useEffect(() => {
      document.title = "Partion Reader"
    }, [])
    
  
    function handleNoteClick(
      currentAudioSrc,
      pupitreName,
      delay,
      visible,
      id,
      isSoupir,
      isLinked
    ) {
      // window.location.reload(false);
  
      let noteInArray;
      switch (pupitreName) {
        case "Soprano":
          noteInArray = sopranoNotes.find((note) => note.id === id);
          if (noteInArray !== undefined) {
            console.log("note in array");
            return;
          }
          sopranoNotes.push({
            duration: delay,
            note: currentAudioSrc,
            id,
            isSoupir,
            isLinked,
          });
  
          break;
        case "Alto":
          noteInArray = altoNotes.find((note) => note.id === id);
          if (noteInArray !== undefined) return;
          altoNotes.push({
            duration: delay,
            note: currentAudioSrc,
            id,
            isSoupir,
            isLinked,
          });
          break;
        case "Tenor":
          noteInArray = tenorNotes.find((note) => note.id === id);
          if (noteInArray !== undefined) return;
          tenorNotes.push({
            duration: delay,
            note: currentAudioSrc,
            id,
            isSoupir,
            isLinked,
          });
          break;
        case "Bass":
          noteInArray = bassNotes.find((note) => note.id === id);
          if (noteInArray !== undefined) return;
          bassNotes.push({
            duration: delay,
            note: currentAudioSrc,
            id,
            isSoupir,
            isLinked,
          });
          break;
  
        default:
          break;
      }
    }
    function cancelVisibility(id, pupitreName) {
      switch (pupitreName) {
        case "Soprano":
          // console.log("soprano to delete");
          sopranoNotes = sopranoNotes.filter((note) => note.id !== id);
          break;
        case "Alto":
          altoNotes = altoNotes.filter((note) => note.id !== id);
          break;
        case "Tenor":
          tenorNotes = tenorNotes.filter((note) => note.id !== id);
          break;
        case "Bass":
          bassNotes = bassNotes.filter((note) => note.id !== id);
          break;
  
        default:
          break;
      }
    }
  
    function handleDelay(id, value) {
      let altoNote = altoNotes.find((obj) => obj.id === id);
      let sopranoNote = sopranoNotes.find((obj) => obj.id === id);
      let tenorNote = tenorNotes.find((obj) => obj.id === id);
      let bassNote = bassNotes.find((obj) => obj.id === id);
  
      if (altoNote !== undefined) {
        let index = altoNotes.indexOf(altoNote);
        altoNote.duration = value;
        altoNotes[index] = altoNote;
      }
  
      if (sopranoNote !== undefined) {
        let index = sopranoNotes.indexOf(sopranoNote);
        sopranoNote.duration = value;
        sopranoNotes[index] = sopranoNote;
      }
      if (tenorNote !== undefined) {
        let index = tenorNotes.indexOf(tenorNote);
        tenorNote.duration = value;
        tenorNotes[index] = tenorNote;
      }
      if (bassNote !== undefined) {
        let index = bassNotes.indexOf(bassNote);
        bassNote.duration = value;
        bassNotes[index] = bassNote;
      }
    }
  
    function handleAddBtn(e, pupitre) {
      //console.log(e);
      switch (e.target.id) {
        case "add-soprano":
          setNumSopranoBlock((current) => current + 1);
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
    function sleep(time) {
      return new Promise((resolve) => setTimeout(resolve, time));
    }
  
    async function triggerClass(notesArr) {
      for (let i = 0; i < notesArr.length; i++) {
        const element = notesArr[i];
        let elDiv = document.getElementById(element.id);
        if (!element.isSoupir) {
          elDiv = elDiv.children[1].children[0];
        } else {
          elDiv = elDiv.children[1].children[0];
        }
  
        elDiv.classList.toggle("playing");
        elDiv.children[0].classList.add("playing");
        await sleep(element.duration * 1000).then(() => {
          elDiv.classList.remove("playing");
          elDiv.children[0].classList.toggle("playing");
        });
      }
    }
    async function handlePlayBtn(e) {
      e.preventDefault();
      await startRecording();
      switch (e.target.id) {
        case "soprano-btn":
          currentPitre = "S";
          playSnd(sopranoNotes);
          triggerClass(sopranoNotes);
          break;
        case "alto-btn":
          currentPitre = "A";
          playSnd(altoNotes);
          triggerClass(altoNotes);
          break;
        case "tenor-btn":
          currentPitre = "T";
          playSnd(tenorNotes);
          triggerClass(tenorNotes);
          break;
        case "bass-btn":
          currentPitre = "B";
          playSnd(bassNotes);
          triggerClass(bassNotes);
          break;
  
        default:
          break;
      }
    }
  
    function handleSaveBtn() {
      stopRecording(currentPitre, titleref.current.value);
    }
  
    return (
      <div className="container">
        <div className="sol-key" id="block">
          <div className="controls top">
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
            <button onClick={handleSaveBtn}>Save Video</button>
          </div>
  
          <div className="controls">
            <input
              ref={titleref}
              className="input-title"
              placeholder="Enter title of song"
            />
            <div>
              <label className="white-label" htmlFor="tempo">
                Tempo
              </label>
              <input
                className="input-tempo"
                placeholder="Enter tempo"
                name="tempo"
                type="number"
                value={tempo}
                onChange={(e) => setTempo(e.target.value)}
              />
            </div>
            <div>
              <label className="white-label" htmlFor="keyalto">
                Key for Alto
              </label>
              <input
                className="input-altokey"
                placeholder="Write sol or fa"
                name="keyalto"
                value={keyForAlto}
                onChange={(e) => {
                  let key = e.target.value;
                  setKeyForAlto(key);
                  if (key === "fa") {
                    setAudioForAlto(audioFaKey);
                    setNotesArrForAlto(notesFaKey);
                  }
                }}
              />
            </div>
            <div>
              <label className="white-label" htmlFor="keytenor">
                Key for Tenor
              </label>
  
              <input
                className="input-tenorkey"
                name="keytenor"
                placeholder="Write sol or fa"
                value={keyForTenor}
                onChange={(e) => {
                  let key = e.target.value;
                  setKeyForTenor(key);
                  if (key === "sol") {
                    setAudioForTenor(audioSolKey);
                    setNotesForTenor(notesSolKey);
                  }
                }}
              />
            </div>
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
                  handleDelay={handleDelay}
                  key={uuidv4()}
                  imgIcon={solIcon}
                  tempo={Math.round((60 / tempo) * 100) / 100}
                  cancelVisibility={cancelVisibility}
                />
              ))}
          </div>
          <div id="alto" className="pupitre">
            {Array(numAltoBlock)
              .fill()
              .map(() => (
                <Block
                  key={uuidv4()}
                  audioSrc={audioForAlto}
                  notesSrc={notesArrForAlto}
                  pupitreName="Alto"
                  handleNoteClick={handleNoteClick}
                  imgIcon={keyForAlto === "sol" ? solIcon : faIcon}
                  handleDelay={handleDelay}
                  tempo={Math.round((60 / tempo) * 100) / 100}
                  cancelVisibility={cancelVisibility}
                />
              ))}
          </div>
          <div id="tenor" className="pupitre">
            {Array(numTenorBlock)
              .fill()
              .map(() => (
                <Block
                  key={uuidv4()}
                  audioSrc={audioForTenor}
                  notesSrc={notesForTenor}
                  pupitreName="Tenor"
                  handleNoteClick={handleNoteClick}
                  imgIcon={keyForTenor === "sol" ? solIcon : faIcon}
                  handleDelay={handleDelay}
                  tempo={Math.round((60 / tempo) * 100) / 100}
                  cancelVisibility={cancelVisibility}
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
                  imgIcon={faIcon}
                  handleDelay={handleDelay}
                  tempo={Math.round((60 / tempo) * 100) / 100}
                  cancelVisibility={cancelVisibility}
                />
              ))}
          </div>
        </div>
      </div>
    );
  }


export default Partition
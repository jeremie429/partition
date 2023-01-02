import React, { useEffect, useRef, useState } from 'react'
import Block from '../components/Block';
import { audioFaKey, audioSolKey, audioUt1, audioUt2,audioUt3, audioUt4, notesFaKey, notesFaSyntax, notesSolKey, notesSolSyntax, notesUt1, notesUt1Syntax, notesUt2, notesUt2Syntax, notesUt3,notesUt3Syntax,notesUt4, notesUt4Syntax } from '../tools/noteArr';
import {solIcon, faIcon, utIcon} from "../tools/keysIcon";
import { v4 as uuidv4 } from "uuid";
import { playChoir, playPianoNotes, playSnd } from "../tools/noteFunc";
import { startRecording, stopRecording } from "../tools/recorderFunc";

import "../styles/partition.scss"
import Piano from '../components/Piano';

import * as Tone from 'tone'
const Partition = () => {
  
    let altoNotes = [];
    let sopranoNotes = [];
    let tenorNotes = [];
    let bassNotes = [];
  
    const [notesForSoprano, setNotesForSoprano] = useState(notesSolKey)
    const [audioForSoprano, setAudioForSoprano] = useState(audioSolKey)
    const [notesArrForAlto, setNotesArrForAlto] = useState(notesSolKey);
    const [notesForTenor, setNotesForTenor] = useState(notesFaKey);
    const [audioForAlto, setAudioForAlto] = useState(audioSolKey);
    const [audioForTenor, setAudioForTenor] = useState(audioFaKey);
    const [tempo, setTempo] = useState(90);
    const [keyForSoprano, setKeyForSoprano] = useState("sol")
    const [keyForAlto, setKeyForAlto] = useState("sol");
    const [keyForTenor, setKeyForTenor] = useState("fa");

    const [sopranoNotesSyntax, setSopranoNotesSyntax] = useState(notesSolSyntax)

    const [altoNotesSyntax, setAltoNotesSyntax] = useState(notesSolSyntax)

    const [tenorNotesSyntax, setTenorNotesSyntax] = useState(notesFaSyntax)

    const [bassNotesSyntax, setBassNotesSyntax] = useState(notesFaSyntax)

    let currentPitre;

    const [iconForSoprano, setIconForSoprano] = useState(solIcon)

    const [iconForAlto, seticonForAlto] = useState(solIcon)

    const [iconForTenor, setIconForTenor] = useState(faIcon)
  
    //let audioArrForAlto = audioSolKey;
    // let audioArrForTenor = audioFaKey;
  
    const [numSopranoBlock, setNumSopranoBlock] = useState(1);
    const [numAltoBlock, setNumAltoBlock] = useState(1);
    const [numTenorBlock, setNumTenorBlock] = useState(1);
    const [numBassBlock, setNumBassBlock] = useState(1);

    const [diezeAlterations, setDiezeAlterations] = useState([])
    const [bemolAlterations, setBemolAlterations] = useState([])


    const sopranoWordsRef = useRef()
    const altoWordsRef = useRef()
    const tenorWordsRef = useRef()
    const bassWordsRef = useRef()

    const sopranoNotesRef = useRef()
    const altoNotesRef = useRef()
    const tenorNotesRef = useRef()
    const bassNotesRef = useRef()
    const pianoNotesRef = useRef()

    const arr = [19,18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
    

    
  
    let titleref = useRef();

    useEffect(() => {
      document.title = "Partion Reader.."
    
    // console.log("Has been refreshed...")
    }, [])

    function handleAdText(words,pupitre){

      let wordsArr = words.split("-");

      let composedArr

      switch (pupitre) {
        case "Soprano":
          // console.log("soprano to delete");
          composedArr = sopranoNotes
          break;
        case "Alto":
          composedArr = altoNotes
          break;
        case "Tenor":
          composedArr = tenorNotes
          break;
        case "Bass":
          composedArr = bassNotes
          break;
  
        default:
          break;
      }

      //console.log({composedArr})
      
    for (let index = 0; index < composedArr.length; index++) {
      if (index > wordsArr.length) break;
      
      const element = composedArr[index];
      if(element.noteTextDiv !== undefined)
      element.noteTextDiv.value = wordsArr[index];
      //console.log(element.noteTextDiv.value);
    }

    }

 
    
  
    function handleNoteClick(
      currentAudioSrc,
      pupitreName,
      delay,
      visible,
      id,
      isSoupir,
      isBecarre,
      positionInLine,
      blockNum,
      noteTextDiv,
      isLinked
    ) {
      // window.location.reload(false);
  
      let noteInArray;
      let positionInArr = positionInLine + (blockNum*25)
      switch (pupitreName) {
        case "Soprano":
          noteInArray = sopranoNotes.find((note) => note.id === id);
          if (noteInArray !== undefined) {

            noteInArray.note = currentAudioSrc
            noteInArray.duration = delay
            noteInArray.isBecarre = isBecarre
            noteInArray.isLinked = isLinked
            //console.log("note in array");
            //console.log({sopranoNotes})
            return;
          }
          sopranoNotes.push({
            duration: delay,
            note: currentAudioSrc,
            id,
            isSoupir,
            isBecarre,
            positionInArr,
            noteTextDiv,
            isLinked,
            toBeRemovedNext : false
 
          })

          sopranoNotes.sort((note1, note2) => note1.positionInArr - note2.positionInArr)

          //console.log(sopranoNotes)
  
          break;
        case "Alto":
          noteInArray = altoNotes.find((note) => note.id === id);
          if (noteInArray !== undefined){
            noteInArray.note = currentAudioSrc
            noteInArray.duration = delay
           
            noteInArray.isBecarre = isBecarre
            noteInArray.isLinked = isLinked
            
            return;
          } 
          altoNotes.push({
            duration: delay,
            note: currentAudioSrc,
            id,
            isSoupir,
            isBecarre,
            positionInArr,
            noteTextDiv,
            isLinked,
            toBeRemovedNext : false 
          })

          altoNotes.sort((note1, note2) => note1.positionInArr - note2.positionInArr)
          break;
        case "Tenor":
          noteInArray = tenorNotes.find((note) => note.id === id);
          if (noteInArray !== undefined){
            noteInArray.note = currentAudioSrc
            noteInArray.duration = delay
            noteInArray.isBecarre = isBecarre
            noteInArray.isLinked = isLinked
            return;
          } 
          tenorNotes.push({
            duration: delay,
            note: currentAudioSrc,
            id,
            isSoupir,
            isBecarre,
            positionInArr,
            noteTextDiv,
            isLinked,
            toBeRemovedNext : false 
          })

          tenorNotes.sort((note1, note2) => note1.positionInArr - note2.positionInArr)

          //console.log(tenorNotes)
          break;
        case "Bass":
          noteInArray = bassNotes.find((note) => note.id === id);
          if (noteInArray !== undefined){
            noteInArray.note = currentAudioSrc
            noteInArray.duration = delay
            noteInArray.isBecarre = isBecarre
            noteInArray.isLinked = isLinked
            return;
          } 
          bassNotes.push({
            duration: delay,
            note: currentAudioSrc,
            id,
            isSoupir,
            isBecarre,
            positionInArr,
            noteTextDiv,
            isLinked,
            toBeRemovedNext : false 
          })

          bassNotes.sort((note1, note2) => note1.positionInArr - note2.positionInArr)
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
    let lastTime = 0
    let duration
    let currentDiv
  async function triggerClass(notesArr) {
     // let link = document.createElement("a")
      let currentBlock
      let timeToReduce = 0

      let multiPlyTime = notesArr.length > 100 ? 960 : 975
 
      //let multiPlyTime = 975
     for (let i = 0; i < notesArr.length; i++) {
        const element = notesArr[i];
        let elDiv =  document.getElementById(element.id);
        
        let completeLine = elDiv.offsetParent
        let divLineContainer = completeLine.offsetParent

       let blocContainer = divLineContainer.offsetParent

       //console.log({blocContainer})

       timeToReduce = 0
        if(currentBlock !== blocContainer && i > 0){
          blocContainer.scrollIntoView({
            behavior:"smooth",
            block: 'center'
            
          })
          /*currentBlock = blocContainer

          let attr = blocContainer.getAttribute('id')
          link.href = "#" + attr
          link.click()*/

          //timeToReduce = 20
          
        }

        

       // currentDiv = elDiv
  
        elDiv.classList.add("playing");
         duration = element.duration*(multiPlyTime - timeToReduce)
      //  await animate(0,currentDiv,duration)
        //elDiv.children[0].classList.add("playing");
      
        await sleep(duration).then(() => {
          //elDiv.classList.remove("playing");
         // elDiv.children[0].classList.toggle("playing");
          elDiv.classList.remove("playing");
        });

      
      }
    }

   async function animate(timeStamp) {
      const deltaTime = timeStamp - lastTime;

      console.log({timeStamp, lastTime, duration: duration*60})
  
     
      //elDiv.children[0].classList.add("playing");
      lastTime = deltaTime
      if(lastTime > (duration *60) && lastTime > 0){
        currentDiv.classList.remove("playing");
        console.log({lastTime})
        //lastTime = 0
        //cancelAnimationFrame(animate)
        return true
      }
      
  
      requestAnimationFrame(animate);
    }


    async function handlePlayBtn(e) {
      e.preventDefault();
     if(window.outerWidth>1000)
       await startRecording();

      switch (e.target.id) {
        case "soprano-btn":
          currentPitre = "S";
          
          triggerClass(sopranoNotes);
          playSnd(sopranoNotes);
          break;
        case "alto-btn":
          currentPitre = "A";
          triggerClass(altoNotes);
          playSnd(altoNotes);
          
          break;
        case "tenor-btn":
          currentPitre = "T";
          triggerClass(tenorNotes);
          playSnd(tenorNotes);
          
          break;
        case "bass-btn":
          currentPitre = "B";
          triggerClass(bassNotes);
          playSnd(bassNotes);
          
          break;
  
        default:
          break;
      }
    }
  
    function handleSaveBtn() {
      stopRecording(currentPitre, titleref.current.value);
    }

    function handleSelectKey(e, pupitre){

      let keySelected = e.target.value
      let notes 
      let audios
      let icon
      let arrNotes
      switch (keySelected) {
        case 'sol':
          notes = notesSolKey
          audios = audioSolKey
          icon = solIcon
          arrNotes = notesSolSyntax
          break;
        case 'fa':
          notes = notesFaKey
          audios = audioFaKey
          icon = faIcon
          arrNotes = notesFaSyntax
          break;
        case 'ut1':
          notes = notesUt1
          audios = audioUt1
          icon = utIcon
          arrNotes = notesUt1Syntax
          break;
        case 'ut2':
          notes = notesUt2
          audios = audioUt2
          icon = utIcon
          arrNotes = notesUt2Syntax
          break;
        case 'ut3':
          notes = notesUt3
          audios = audioUt3
          icon = utIcon
          arrNotes = notesUt3Syntax
          break;
        case 'ut4':
          notes = notesUt4
          audios = audioUt4
          icon = utIcon

          arrNotes = notesUt4Syntax
          break;
      
        default:
          break;
      }


      if(pupitre === "soprano"){
        setKeyForSoprano(keySelected)
        setNotesForSoprano(notes)
        setAudioForSoprano(audios)
        setIconForSoprano(icon)
        setSopranoNotesSyntax(arrNotes)
      }else if(pupitre === "alto"){
        setKeyForAlto(keySelected)
        setNotesArrForAlto(notes)
        setAudioForAlto(audios)
        seticonForAlto(icon)
        setAltoNotesSyntax(arrNotes)
      }else if(pupitre === "tenor"){
        setKeyForTenor(keySelected)
        setNotesForTenor(notes)
        setAudioForTenor(audios)
        setIconForTenor(icon)
        setTenorNotesSyntax(arrNotes)
      }

     // console.log({keySelected, pupitre})

    }

    function handleKeyAlteration(e, key, bloc){
      let inArrIndex

     e.target.classList.toggle('key-selected')

      if(bloc=== 'dieze'){
        inArrIndex = diezeAlterations.indexOf(key)
       // console.log({inArrIndex})
        if(inArrIndex === -1){
          setDiezeAlterations(prevArr => [...prevArr, key])
          //console.log({diezeAlterations})
        }else{
          setDiezeAlterations(prevArr => prevArr.filter(el => el !== key))
        }


      }else{

        inArrIndex = bemolAlterations.indexOf(key)
        //console.log({inArrIndex})
        if(inArrIndex === -1){
          setBemolAlterations(prevArr => [...prevArr, key])
        }else{
          setBemolAlterations(prevArr => prevArr.filter(el => el !== key))
        }
      }
    }

    async function handlePlayChoir(e){
      
        e.preventDefault()

        
        playChoir(sopranoNotes, altoNotes,tenorNotes, bassNotes)
      }

  async function handleAdNotes(e, pupitre, arrNotes, setNumBloc, numBloc,ref) {

      

        let notesWithTimeArr = ref.current.value.trim().split(';')

        let mLength = Math.floor(notesWithTimeArr.length /25) + (notesWithTimeArr.length % 25 > 0 ? 1 : 0)
        

        if(mLength !== numBloc){

          setNumBloc(Math.floor(notesWithTimeArr.length /25) +1)
         return
        }
        
        const sectionDiv = document.getElementById(`${pupitre}-section`)

       // console.log({sectionDiv})

        const arrBlocsContainer = sectionDiv.querySelectorAll(".block-container")

        let currentBloc = 1

        let slicedArr 

        const diezeCode = "d"
        const bemolCode = "b"
        const becarreCode = "c"

        while(currentBloc <= mLength){

          slicedArr = notesWithTimeArr.slice((currentBloc -1)*25, currentBloc*25)
          let currenBlocContainer = arrBlocsContainer[currentBloc-1]
        //  console.log({currenBlocContainer})
          let completeLinesOfBloc = currenBlocContainer.querySelectorAll(".complete-line")
         

          for (let i = 0; i < slicedArr.length; i++) {
            const element = slicedArr[i]
            const elNoteWithPos = element.split(',')[0]
            const elTime = element.split(',')[1]
            const regex = /[0-9]/
      
            const isSilent = elNoteWithPos[0] === '-'
      
           
            let duration = parseFloat(elTime) * (Math.round((60 / tempo) * 100) / 100)
      
            if (isSilent) {
              const divToClick = Array.from(
                completeLinesOfBloc
              )
                .reverse()[9]
                .children.item(1)
           
              await divToClick.click()
              let noteContainer = divToClick.children.item(i)
              
              let soupirToTriggered = noteContainer.children.item(0).children.item(1)
      
              await soupirToTriggered.click()
      
              const formDelay =  noteContainer.querySelector('.form-delay')
              const noteControls =  formDelay.querySelector('.note-controls')
              const inputDelay =  formDelay.querySelector('.input-delay')
      
              inputDelay.value = parseFloat(duration).toFixed(2)
      
              const okBtn = noteControls.querySelector('.ok')
              await okBtn.click()
      
              
            } else {
              const elNote = elNoteWithPos.split(regex)[0]
              const notePos = parseInt(elNoteWithPos.match(regex)[0])

              const posInNoteArr = arrNotes.indexOf(elNote) + (notePos - 1) * 7
      
              const divToClick = Array.from(
                completeLinesOfBloc
              )
                .reverse()
                [posInNoteArr].children.item(1)
      
              if (divToClick.children.length === 0) await divToClick.click()
             
           
      
              let noteContainer = divToClick.children.item(i)
              //console.log({noteContainer})
            
              let noteToTriggered = noteContainer.children.item(0).children.item(0)
      
              await noteToTriggered.click()
      
              const formDelay =  noteContainer.querySelector('.form-delay')
      
             
              const noteControls =  formDelay.querySelector('.note-controls')
              const inputDelay =  formDelay.querySelector('.input-delay')
      
              
      
              inputDelay.value = parseFloat(duration).toFixed(2)
      
              const okBtn =  noteControls.querySelector('.ok')

              if(element.split(',').indexOf(diezeCode) !== -1)
              await noteControls.querySelector('.dieze').click()
              if(element.split(',').indexOf(bemolCode) !== -1)
              await  noteControls.querySelector('.bemol').click()
              if(element.split(',').indexOf(becarreCode) !== -1)
              await noteControls.querySelector('.becarre').click()
             
              await okBtn.click()
            }
          }

          currentBloc +=1
        }

       // console.log({sopranoNotes})
        
      }


      async function handleAddSilent(ref) {
        let time = parseFloat(prompt('please enter duration by step 0.5'))

        let currentValueInTextArea = ref.current.value
    
        let valueToAdd =""
        if (currentValueInTextArea === '') {
          valueToAdd = '-,' + time
        } else {
          valueToAdd = ';-,' + time
        }
    
        ref.current.value = currentValueInTextArea + valueToAdd
      }
      async function handlePlayPiano(e){

        e.preventDefault()

        let syntaxArr = pianoNotesRef.current.value.trim().split('|')
       // console.log({syntaxArr})

        let notesArrObj = []

        for (let i = 0; i < syntaxArr.length; i++) {
          const element = syntaxArr[i];

          let notesWithDurations = element.split(';')
          let notes = []
          let durations = []

          notesWithDurations.forEach(noteWithDuration => {
            let note = noteWithDuration.split(',')[0]
            let duration = parseFloat(noteWithDuration.split(',')[1])

            notes.push(note)
            durations.push(duration)
          })
          notesArrObj.push({notes, durations})
        }

      //  console.log(notesArrObj)

        playPianoNotes(notesArrObj)
      }

  
    return (
      <div className="partition-page">
    
          <div className="controls right">
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
          
            <button onClick={handlePlayPiano} >
              Play Piano
            </button>
           {/*  <div className="num-bloc-container">

              <label htmlFor="soprano-num">Soprano Num Block</label>
            <input type='number' min={1}  value={numSopranoBlock} step={5} onChange={(e) => {
              if(parseInt(e.target.value) > 0 )
               setNumSopranoBlock(parseInt(e.target.value))
               else 
               return
              }} name='soprano-num' />
            </div>
            <div className="num-bloc-container">

              <label htmlFor="alto-num">alto Num Block</label>
            <input type='number' min={1}  value={numAltoBlock} step={5} onChange={(e) => {
              if(parseInt(e.target.value) > 0 )
               setNumAltoBlock(parseInt(e.target.value))
               else 
               return
              }} name='alto-num' />
            </div>
            <div className="num-bloc-container">

              <label htmlFor="tenor-num">tenor Num Block</label>
            <input type='number' min={1}  value={numTenorBlock} step={5} onChange={(e) => {
              if(parseInt(e.target.value) > 0 )
               setNumTenorBlock(parseInt(e.target.value))
               else 
               return
              }} name='tenor-num' />
            </div>
            <div className="num-bloc-container">

              <label htmlFor="bass-num">bass Num Block</label>
            <input type='number' min={1}  value={numBassBlock} step={5} onChange={(e) => {
              if(parseInt(e.target.value) > 0 )
               setNumBassBlock(parseInt(e.target.value) )
               else 
               return
              }} name='bass-num' />
            </div> */}
            
              
            
           {/* <button onClick={handlePlayChoir}>Play Choir</button> */}
            { window.outerWidth > 1000 && <button className='save-btn' onClick={handleSaveBtn}>Save Video</button>}
          </div>


          <div className="controls left">
            <a href='#soprano-section'>
              Go To Soprano Blocks
            </a>
            <a href='#alto-section' >
            Go To Alto Blocks
            </a>
            <a href='#tenor-section'>
            Go To Tenor Blocks
            </a>
            <a href='#bass-section' >
            Go To Bass Blocks
            </a>
         
        

            
           
          </div>
  
          <div className="controls">

           <div className="blocs-controls">
           <div className='bloc-wrap'>
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
            <div className='bloc-wrap'>
              <label className="white-label" htmlFor="keysoprano">
                Key for Soprano
              </label>
              <select onChange={(e) => handleSelectKey(e, "soprano")} name="keysoprano" id="soprano-key" className='input-sopranokey'>
   
    <option value="sol">Sol</option>
    <option value="ut1">Ut 1 (Do on 1st line)</option>
    <option value="ut2">Ut 2 (Do on 2nd line)</option>
    <option value="ut3">Ut 3 (Do on 3rd line)</option>
    <option value="ut4">Ut 4 (Do on 4th line)</option>
</select>
            </div>
            <div className='bloc-wrap'>
              <label className="white-label" htmlFor="keyalto">
                Key for Alto
              </label>
              <select onChange={(e) => handleSelectKey(e, "alto")} name="keyalto" id="alto-key" className='input-altokey'>
   
    <option value="sol">Sol</option>
    <option value="fa">Fa</option>
    <option value="ut1">Ut 1 (Do on 1st line)</option>
    <option value="ut2">Ut 2 (Do on 2nd line)</option>
    <option value="ut3">Ut 3 (Do on 3rd line)</option>
    <option value="ut4">Ut 4 (Do on 4th line)</option>
</select>
            </div>
            <div className='bloc-wrap'>
              <label className="white-label" htmlFor="keytenor">
                Key for Tenor
              </label>
              <select onChange={(e) => handleSelectKey(e, "tenor")} name="keytenor" id="tenor-key" className='input-tenorkey'>
   
              <option value="fa">Fa</option>
              <option value="sol">Sol</option>
    
    <option value="ut1">Ut 1 (Do on 1st line)</option>
    <option value="ut2">Ut 2 (Do on 2nd line)</option>
    <option value="ut3">Ut 3 (Do on 3rd line)</option>
    <option value="ut4">Ut 4 (Do on 4th line)</option>
</select>
            </div>
           </div>
           <input
              ref={titleref}
              className="input-title"
              placeholder="Enter title of song"
            />
           
          </div>
  
            <div className="diezes-bemols">
              { bemolAlterations.length === 0 && <div className='sub-title'>Key Diezes</div>}
              { bemolAlterations.length === 0 && <div className="diezes">
                <div className="dieze-key" onClick={(e) => handleKeyAlteration(e,'fa', 'dieze')}>fa</div>
                <div className="dieze-key" onClick={(e) => handleKeyAlteration(e,'do', 'dieze')}>do</div>
                <div className="dieze-key" onClick={(e) => handleKeyAlteration(e,'sol', 'dieze')}>sol</div>
                <div className="dieze-key" onClick={(e) => handleKeyAlteration(e,'re', 'dieze')}>re</div>
                <div className="dieze-key" onClick={(e) => handleKeyAlteration(e,'la', 'dieze')}>la</div>
                <div className="dieze-key" onClick={(e) => handleKeyAlteration(e,'mi', 'dieze')}>mi</div>
                <div className="dieze-key" onClick={(e) => handleKeyAlteration(e,'si', 'dieze')}>si</div>
              </div>}
              {diezeAlterations.length === 0 && <div className='sub-title'>Key Bemols</div>}
              { diezeAlterations.length === 0 && <div className="bemols">
                <div className="bemol-key" onClick={(e) => handleKeyAlteration(e,'si', 'bemol')}>si</div>
                <div className="bemol-key" onClick={(e) => handleKeyAlteration(e,'mi', 'bemol')}>mi</div>
                <div className="bemol-key" onClick={(e) => handleKeyAlteration(e,'la', 'bemol')}>la</div>
                <div className="bemol-key" onClick={(e) => handleKeyAlteration(e,'re', 'bemol')}>re</div>
                <div className="bemol-key" onClick={(e) => handleKeyAlteration(e,'sol', 'bemol')}>sol</div>
                <div className="bemol-key" onClick={(e) => handleKeyAlteration(e,'do', 'bemol')}>do</div>
                <div className="bemol-key" onClick={(e) => handleKeyAlteration(e,'fa', 'bemol')}>fa</div>
                
              </div>}
            </div>
          
      <div id="soprano-section" className="pupitre">
            <div className='words'>
            <textarea  className='words-input' ref={sopranoWordsRef} placeholder='Add words for Soprano' ></textarea>
            <button onClick={(e) => handleAdText(sopranoWordsRef.current.value, 'Soprano')} >Add words</button>
            </div>

            <div className="piano-notes">
        {arr.map((i, pos) => {
          
          return (
            <Piano
            key={uuidv4()}
            
              currentAudioSrc={audioForSoprano[pos]}
              currentNote={notesForSoprano[pos]}
              
              noteSyntax={sopranoNotesSyntax[pos]}
              relTextArea = {sopranoNotesRef}
             
            />
          )
        })}

         <button className="piano-touch" onClick={(e) => handleAddSilent(sopranoNotesRef)}>
          -
        </button> 
      </div>
      <div className="notes-area">
        <textarea
          className="notes-array"
          ref={sopranoNotesRef}
          placeholder={'Add Notes for Soprano'}
        ></textarea>
        <button onClick={(e) => handleAdNotes(e, "soprano", notesForSoprano, setNumSopranoBlock, numSopranoBlock, sopranoNotesRef)}>Add Notes</button>
      </div>

      

            
            {Array(numSopranoBlock)
              .fill()
              .map((el, index) => (
                <Block
                blockNum = {index}
                  audioSrc={audioForSoprano}
                  notesSrc={notesForSoprano}
                  pupitreName="Soprano"
                  handleNoteClick={handleNoteClick}
                  handleDelay={handleDelay}
                  key={uuidv4()}
                  imgIcon={iconForSoprano}
                  tempo={Math.round((60 / tempo) * 100) / 100}
                  cancelVisibility={cancelVisibility}
                  handleAdText={handleAdText}
                  partitionKey = {keyForSoprano}
                  bemolAlterations={bemolAlterations}
                  diezeAlterations={diezeAlterations}
                />
              ))}
          </div>
          <div id="alto-section" className="pupitre">
          <div className='words'>
            <textarea  className='words-input' ref={altoWordsRef} placeholder='Add words for Alto' ></textarea>
            <button onClick={(e) => handleAdText(altoWordsRef.current.value, 'Alto')} >Add words</button>
            </div>
            <div className="piano-notes">
        {arr.map((i, pos) => {
          
          return (
            <Piano
            key={uuidv4()}
            
              currentAudioSrc={audioForAlto[pos]}
              currentNote={notesArrForAlto[pos]}
              
              noteSyntax={altoNotesSyntax[pos]}
              relTextArea = {altoNotesRef}
             
            />
          )
        })}

         <button className="piano-touch" onClick={(e) => handleAddSilent(altoNotesRef)}>
          -
        </button> 
      </div>
            <div className="notes-area">
        <textarea
          className="notes-array"
          ref={altoNotesRef}
          placeholder={'Add Notes for Alto'}
        ></textarea>
        <button onClick={(e) => handleAdNotes(e, "alto", notesArrForAlto, setNumAltoBlock, numAltoBlock, altoNotesRef)}>Add Notes</button>
      </div>

      
          
            {Array(numAltoBlock)
              .fill()
              .map((el, index) => (
                <Block
                blockNum = {index}
                  key={uuidv4()}
                  audioSrc={audioForAlto}
                  notesSrc={notesArrForAlto}
                  pupitreName="Alto"
                  handleNoteClick={handleNoteClick}
                  imgIcon={iconForAlto}
                  handleDelay={handleDelay}
                  tempo={Math.round((60 / tempo) * 100) / 100}
                  cancelVisibility={cancelVisibility}
                  partitionKey = {keyForAlto}
                  bemolAlterations={bemolAlterations}
                  diezeAlterations={diezeAlterations}
                />
              ))}
          </div>
          <div id="tenor-section" className="pupitre">
          <div className='words'>
            <textarea  className='words-input' ref={tenorWordsRef} placeholder='Add words for Tenor' ></textarea>
            <button onClick={(e) => handleAdText(tenorWordsRef.current.value, 'Tenor')} >Add words</button>
            </div>

            <div className="piano-notes">
        {arr.map((i, pos) => {
          
          return (
            <Piano
            key={uuidv4()}
            
              currentAudioSrc={audioForTenor[pos]}
              currentNote={notesForTenor[pos]}
              
              noteSyntax={tenorNotesSyntax[pos]}
              relTextArea = {tenorNotesRef}
             
            />
          )
        })}

         <button className="piano-touch" onClick={(e) => handleAddSilent(tenorNotesRef)}>
          -
        </button> 
      </div>
         

            <div className="notes-area">
        <textarea
          className="notes-array"
          ref={tenorNotesRef}
          placeholder={'Add Notes for Tenor'}
        ></textarea>
        <button onClick={(e) => handleAdNotes(e, "tenor", notesForTenor, setNumTenorBlock, numTenorBlock, tenorNotesRef)}>Add Notes</button>
      </div>

      
            {Array(numTenorBlock)
              .fill()
              .map((el, index) => (
                <Block
                blockNum = {index}
                  key={uuidv4()}
                  audioSrc={audioForTenor}
                  notesSrc={notesForTenor}
                  pupitreName="Tenor"
                  handleNoteClick={handleNoteClick}
                  imgIcon={iconForTenor}
                  handleDelay={handleDelay}
                  tempo={Math.round((60 / tempo) * 100) / 100}
                  cancelVisibility={cancelVisibility}
                  partitionKey = {keyForTenor}
                  bemolAlterations={bemolAlterations}
                  diezeAlterations={diezeAlterations}
                />
              ))}
          </div>
          <div id="bass-section" className="pupitre">
          <div className='words'>
            <textarea  className='words-input' ref={bassWordsRef} placeholder='Add words for Bass' ></textarea>
            <button onClick={(e) => handleAdText(bassWordsRef.current.value, 'Bass')} >Add words</button>
            </div>

            <div className="piano-notes">
        {arr.map((i, pos) => {
          
          return (
            <Piano
            key={uuidv4()}
            
              currentAudioSrc={audioFaKey[pos]}
              currentNote={notesFaKey[pos]}
              
              noteSyntax={bassNotesSyntax[pos]}
              relTextArea = {bassNotesRef}
             
            />
          )
        })}

         <button className="piano-touch" onClick={(e) => handleAddSilent(bassNotesRef)}>
          -
        </button> 
      </div>
     
            <div className="notes-area">
        <textarea
          className="notes-array"
          ref={bassNotesRef}
          placeholder={'Add Notes for Bass'}
        ></textarea>
        <button onClick={(e) => handleAdNotes(e, "bass", notesFaKey, setNumBassBlock, numBassBlock, bassNotesRef)}>Add Notes</button>
      </div>

      
            {Array(numBassBlock)
              .fill()
              .map((el, index) => (
                <Block
                blockNum = {index}
                  key={uuidv4()}
                  audioSrc={audioFaKey}
                  notesSrc={notesFaKey}
                  pupitreName="Bass"
                  handleNoteClick={handleNoteClick}
                  imgIcon={faIcon}
                  handleDelay={handleDelay}
                  tempo={Math.round((60 / tempo) * 100) / 100}
                  cancelVisibility={cancelVisibility}
                  partitionKey = {"fa"}
                  bemolAlterations={bemolAlterations}
                  diezeAlterations={diezeAlterations}
                />
              ))}
          </div>

          <div className="notes-area" id='piano-area'>
        <textarea
          className="notes-array"
          
          ref={pianoNotesRef}
          placeholder={'Add Notes for Piano'}
        ></textarea>
        
      </div>
       
      </div>
    );
  }


export default Partition
import React, { useEffect, useRef, useState } from 'react'
import { audioFaKey, audioSolKey, audioUt1, audioUt2,audioUt3, audioUt4, notesFaKey, notesFaSyntax, notesSolKey, notesSolSyntax, notesUt1, notesUt1Syntax, notesUt2, notesUt2Syntax, notesUt3,notesUt3Syntax,notesUt4, notesUt4Syntax } from '../tools/noteArr';
import {solIcon, faIcon, utIcon,poweredIcon} from "../tools/keysIcon";
import { v4 as uuidv4 } from "uuid";
import counter, { playOneAudio, playPianoNotes, playSnd } from "../tools/noteFunc";
import notes from './Partition/musicNotes';
import "../styles/partition.scss"
import Piano from '../components/Piano';
import CompleteLine2 from '../components/CompleteLine2';
import { stopRecording } from '../tools/recorderFunc';
import * as Tone from 'tone'


const Partition = () => {
  
  /*
    let altoNotes = [];
    let sopranoNotes = [];
    let tenorNotes = [];
    let bassNotes = [];
    */
  
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

    const bassNotesSyntax= notesFaSyntax

    let currentPitre;

    const [iconForSoprano, setIconForSoprano] = useState(solIcon)

    const [iconForAlto, seticonForAlto] = useState(solIcon)

    const [iconForTenor, setIconForTenor] = useState(faIcon)
  
    //let audioArrForAlto = audioSolKey;
    // let audioArrForTenor = audioFaKey;
  /*
    const [numSopranoBlock, setNumSopranoBlock] = useState(1);
    const [numAltoBlock, setNumAltoBlock] = useState(1);
    const [numTenorBlock, setNumTenorBlock] = useState(1);
    const [numBassBlock, setNumBassBlock] = useState(1);
    */

    const [playTempo, setPlayTempo] = useState(false)

    const [diezeAlterations, setDiezeAlterations] = useState([])
    const [bemolAlterations, setBemolAlterations] = useState([])

    const [timePerTempo, setTimePerTempo] = useState(4)


    const sopranoWordsRef = useRef()
    const altoWordsRef = useRef()
    const tenorWordsRef = useRef()
    const bassWordsRef = useRef()

    const sopranoNotesRef = useRef()
    const altoNotesRef = useRef()
    const tenorNotesRef = useRef()
    const bassNotesRef = useRef()
    const pianoNotesRef = useRef()
    const floatingTime = useRef()
    const floatingPadRef = useRef()
    const titleName = useRef()
    const titleDescription = useRef()

    const arr = [19,18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0]

    let sopranoDivToTrigger = []
    let altoDivToTrigger = []
    let tenorDivToTrigger = []
    let bassDivToTrigger = []

   // var uniCodeBemol = '\u266d'

    const [namePupitre1, setNamePupitre1] = useState("Soprano")
    const [namePupitre2, setNamePupitre2] = useState("Alto")
    const [namePupitre3, setNamePupitre3] = useState("Tenor")
    const [namePupitre4, setNamePupitre4] = useState("Basse")

    const [pupitreRef, setPupitreRef] = useState(pianoNotesRef)
    const [pupitreSelected, setPupitreSelected] = useState("piano")
    

    
  
    let titleref = useRef();
    let quaterRef = useRef();
    let halfRef = useRef();
    let oneRef = useRef();
    let oneHalfRef = useRef();
    let twoRef = useRef();
    let twoHalfRef = useRef();
    let threeRef = useRef();
    let threeHalfRef = useRef();
    let fourRef = useRef();

    let threequartRef = useRef()


    useEffect(() => {
      document.title = "Partion Reader.."

      document.addEventListener('keypress', (e) => {
        let key = e.key

        switch (key) {
          case '5':
            halfRef.current.click()
            break;
          case '1':
            oneRef.current.click()
            break;

          case '6':
            oneHalfRef.current.click()
            break;

          case '2':
            twoRef.current.click()
            break;
          case '7':
            twoHalfRef.current.click()
            break;

          case '3':
            threeRef.current.click()
            break;

          case '8':
            threeHalfRef.current.click()
            break;
          case '4':
            fourRef.current.click()
            break;
          case '.':
            quaterRef.current.click()
            break;
          case '9':
            Tone.Transport.stop()
            stopRecording("soprano", "cancel");
            clearTimeout(counter)

          break;

          case '0':
            threequartRef.current.click()
            break;
          default:
            break;
        }
      })
     
    
    // console.log("Has been refreshed...")
    }, [])
/*
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
*/



 
    
  /*
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

        //console.log({id})
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
    */
    /*
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
    }*/
  /*
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
  */
  
/*
    function sleep(time) {
      return new Promise((resolve) => setTimeout(resolve, time));
    }
   // let lastTime = 0
    let duration

    */
   // let currentDiv
   /*
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
*/
  


    async function handlePlayBtn(e) {
      e.preventDefault();
    // if(window.outerWidth>1000)
     //  await startRecording();
   
  
     let othersSounds = []
          let tenorArr = []
          let altoArr = []
          let bassArr = []
          let sopranoArr = []
          let pianoArrNotes = []

          if(pianoNotesRef.current.value !== "")
            pianoArrNotes = await handlePlayPiano(e, false)

      switch (e.target.id) {

        
        case "soprano-btn":
          currentPitre = "S";

         // let noteDuration = (Math.round((60 / tempo) * 100) / 100)
           tenorArr = getNotesDirectly(tenorNotesRef, tenorNotesSyntax,audioForTenor)
           altoArr = getNotesDirectly(altoNotesRef, altoNotesSyntax,audioForAlto)
           bassArr = getNotesDirectly(bassNotesRef, bassNotesSyntax,audioFaKey)
           sopranoArr = getNotesDirectly(sopranoNotesRef, sopranoNotesSyntax,audioForSoprano)
          othersSounds.push(tenorArr)
          othersSounds.push(altoArr)
          othersSounds.push(bassArr)
          await playSnd(sopranoArr, currentPitre, titleref.current.value, othersSounds, sopranoDivToTrigger, floatingPadRef, pianoArrNotes);
          
          //triggerClass(sopranoNotes);
          break;
        case "alto-btn":
          currentPitre = "A";
           tenorArr = getNotesDirectly(tenorNotesRef, tenorNotesSyntax,audioForTenor)
           sopranoArr = getNotesDirectly(sopranoNotesRef, sopranoNotesSyntax,audioForSoprano)
           bassArr = getNotesDirectly(bassNotesRef, bassNotesSyntax,audioFaKey)
           altoArr = getNotesDirectly(altoNotesRef, altoNotesSyntax,audioForAlto)
          othersSounds.push(tenorArr)
          othersSounds.push(sopranoArr)
          othersSounds.push(bassArr)
          await playSnd(altoArr, currentPitre, titleref.current.value, othersSounds, altoDivToTrigger, floatingPadRef, pianoArrNotes);
         
         // await playSnd(altoNotes, noteDuration, timePerTempo, currentPitre, titleref.current.value, playTempo);
         // triggerClass(altoNotes);
          
          break;
        case "tenor-btn":
          currentPitre = "T";

          altoArr = getNotesDirectly(altoNotesRef, altoNotesSyntax,audioForAlto)
           sopranoArr = getNotesDirectly(sopranoNotesRef, sopranoNotesSyntax,audioForSoprano)
           bassArr = getNotesDirectly(bassNotesRef, bassNotesSyntax,audioFaKey)
            tenorArr = getNotesDirectly(tenorNotesRef, tenorNotesSyntax,audioForTenor)
          othersSounds.push(altoArr)
          othersSounds.push(sopranoArr)
          othersSounds.push(bassArr)
          await playSnd(tenorArr, currentPitre, titleref.current.value, othersSounds, tenorDivToTrigger, floatingPadRef, pianoArrNotes);

         
          //await playSnd(tenorNotes, noteDuration, timePerTempo, currentPitre, titleref.current.value, playTempo);
          //triggerClass(tenorNotes);
          
          break;
        case "bass-btn":
          currentPitre = "B";

          altoArr = getNotesDirectly(altoNotesRef, altoNotesSyntax,audioForAlto)
           sopranoArr = getNotesDirectly(sopranoNotesRef, sopranoNotesSyntax,audioForSoprano)
           tenorArr = getNotesDirectly(tenorNotesRef, tenorNotesSyntax,audioForTenor)
           bassArr = getNotesDirectly(bassNotesRef, bassNotesSyntax,audioFaKey)
          othersSounds.push(altoArr)
          othersSounds.push(sopranoArr)
          othersSounds.push(tenorArr)
          await playSnd(bassArr, currentPitre, titleref.current.value, othersSounds, bassDivToTrigger, floatingPadRef, pianoArrNotes);
          
         // await playSnd(bassNotes, noteDuration, timePerTempo, currentPitre, titleref.current.value, playTempo);
          //triggerClass(bassNotes);
          
          break;
  
        default:
          break;
      }
       
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

    const lengthArrObj = [

      {
        type : "Largo",
        tempo : 40
      },
      {
        type : "Lento",
        tempo : 52
      },
      {
        type : "Adagio",
        tempo : 60
      },
      {
        type : "Andante",
        tempo : 76
      },
      {
        type : "Moderato",
        tempo : 88
      },
      {
        type : "Allegretto",
        tempo : 100
      },
      {
        type : "Allegro",
        tempo : 112
      },
      {
        type : "Vivace",
        tempo : 120
      },
      {
        type : "Presto",
        tempo : 140
      },
      {
        type : "Prestissimo",
        tempo : 150
      },
    ]

    /*

    Largo	Large	40 - 60
Lento	Lent	52 - 68
Adagio	À l'aise	60 - 80
Andante	Allant	76 - 100
Moderato	Modéré	88 - 112
Allegretto	légèrement allègre	100 - 128
Allegro	allègre (joyeux)	112 - 160
Vivace	Vif	120 - 140
Presto	Pressé, rapide	140 - 200
Prestissimo	Très rapide	140 - 200


    */

     function getNotesDirectly(syntaxRef, keySyntaxArr, audioArr){

      if(syntaxRef.current.value === "") return []
      let notesWithTimeArr = syntaxRef.current.value.trim().split(';')

        let time = 0


        let chord = []

        let temp = tempo

        for (let i = 0; i < notesWithTimeArr.length; i++) {
            const element = notesWithTimeArr[i]
            let noteSyntax = element.split(',')[0].trim()
            
            let elTime = parseFloat(element.split(',')[1].trim())
            let keyAlteration = element.split(',')[2] !== undefined && element.split(',')[2].trim()
           // keyAlteration !== false && console.log({keyAlteration})
         

            let obj = {}
           // console.log(element.split(',').indexOf('tr'))
              if(element.split(',').indexOf('tr') !== -1)
                elTime = (elTime*2)/3
            for (let j = 0; j < lengthArrObj.length; j++) {
              const object = lengthArrObj[j];
             // console.log(object)
             // console.log(element.split(',').indexOf(object.type))
              if(element.split(',').indexOf(object.type) !== -1){

                   temp = object.tempo
                  // console.log({temp})
              break;
              }
             
            }

            if(element.split(',').indexOf('fine') !== -1)
               temp = tempo
              
             let duration =elTime * (Math.round((60 / temp) * 100) / 100)

             //console.log({duration})

            const isSilent = noteSyntax=== '-'

            if(isSilent){
              //obj.time = Tone.Time(time).toBarsBeatsSixteenths()
              //obj.time = time
              obj.note = null
             // obj.duration = Tone.Time(duration).toNotation()  
              //obj.duration = duration

            }else{
              noteSyntax = noteSyntax.split('')
            noteSyntax.pop()
            noteSyntax = noteSyntax.join('')

              let index = keySyntaxArr.indexOf(element.split(',')[0])
              let currentAudio = audioArr[index]
            //  console.log({currentAudio})
              if((keyAlteration !== false && keyAlteration === "d") || (diezeAlterations.indexOf(noteSyntax) !== -1 && keyAlteration !== "c")){

             currentAudio = currentAudio.split('')
            currentAudio.splice(1, 0, '#')
            currentAudio = currentAudio.join('')
           // console.log({currentAudio})
              }else if((keyAlteration !== false && keyAlteration === "b") || (bemolAlterations.indexOf(noteSyntax) !== -1 && keyAlteration !== "c")){
             currentAudio = currentAudio.split('')
            currentAudio.splice(1, 0, 'b')
            currentAudio = currentAudio.join('')
              } 

              obj.note = currentAudio


            }

            obj.time = time

            obj.duration = duration

            //obj.durNotConverted = duration    
           chord.push(obj)
           time += duration
      
           
          }

          //console.log({chord})

          return chord

    }

 async function handleSaveWithNotes(){
  let title = titleName.current.value
  let fileToSave = title + parseInt(Math.random()*1000) + '.txt'

  let content = title.trim() + ' - '+ "\n\r"
 

  let tenorArr = getNotesDirectly(tenorNotesRef, tenorNotesSyntax,audioForTenor)
  let sopranoArr = getNotesDirectly(sopranoNotesRef, sopranoNotesSyntax,audioForSoprano)
  let bassArr = getNotesDirectly(bassNotesRef, bassNotesSyntax,audioFaKey)
  let altoArr = getNotesDirectly(altoNotesRef, altoNotesSyntax,audioForAlto)

  console.log({tenorArr})
  console.log({sopranoArr})
  console.log({bassArr})
  console.log({altoArr})

  content += "BEGIN SOPRANO --------------------------------------------------------------------------\n\r"
  
  content += sopranoWordsRef.current.value.split('-').join(" ") + '\n\n\r'
  content += sopranoNotesRef.current.value + '\n\n\r'
  content += "END SOPRANO --------------------------------------------------------------------------\n\n\r"

 }
async function handleSave() {
  
  let title = titleName.current.value
  let desc = titleDescription.current.value
  let diezesAlt = diezeAlterations.join(',')
  let bemolsAlt = bemolAlterations.join(',')

  let fileToSave = title + parseInt(Math.random()*1000) + '.txt'

  let content = title.trim() + ' - ' + desc.trim() + ' - '+ "\n\r"
  content += "Tempo : " + tempo +"\n\r"
  content += "Diezes : "+ diezesAlt + "\n\r"
  content += "Bemols : "+ bemolsAlt + "\n\n\r"

  content += "BEGIN SOPRANO --------------------------------------------------------------------------\n\r"
  
  content += sopranoWordsRef.current.value + '\n\n\r'
  content += sopranoNotesRef.current.value + '\n\n\r'
  content += "END SOPRANO --------------------------------------------------------------------------\n\n\r"

  content += "BEGIN ALTO --------------------------------------------------------------------------\n\r"
  
  content += altoWordsRef.current.value + '\n\n\r'
  content += altoNotesRef.current.value + '\n\n\r'
  content += "END ALTO --------------------------------------------------------------------------\n\n\r"

  content += "BEGIN TENOR --------------------------------------------------------------------------"+"\n\r"
  
  content += tenorWordsRef.current.value + '\n\n'
  content += tenorNotesRef.current.value + '\n\n'
  content += "END TENOR --------------------------------------------------------------------------\n\n"

  content += "BEGIN BASS --------------------------------------------------------------------------\n\r"
  
  content += bassWordsRef.current.value + '\n\n'
  content += bassNotesRef.current.value + '\n\n'
  content += "END BASS --------------------------------------------------------------------------\n\n"
  
var myFile = new Blob([content], {type: 'text/plain',endings: 'native'});

window.URL = window.URL || window.webkitURL;
var dlBtn = document.createElement('a');
dlBtn.style.display = "none"

dlBtn.setAttribute("href", window.URL.createObjectURL(myFile));
dlBtn.setAttribute("download", fileToSave);
dlBtn.click()


}
function addNotesSymbol(arrNotesSyntax, pupitre, arrDiv){


          if(arrNotesSyntax.current.value === "") return

          if(arrDiv.length > 0)
          arrDiv = []
      let notesWithTimeArr = arrNotesSyntax.current.value.trim().split(';')

    let divBloc = document.getElementById(pupitre)
    let lines = divBloc.querySelectorAll('.line2')
    lines.forEach(line => {
      line.innerHTML = ""
    })
   for (let i = 0; i < notesWithTimeArr.length; i++) {
    const element = notesWithTimeArr[i];

    let noteSyntax = element.split(',')[0]
            
    const elTime = element.split(',')[1].trim()

    let keyAlteration = element.split(',')[2] !== undefined && element.split(',')[2].trim()

    let note = ''

    let alteration = ''
    let noteSpell = noteSyntax.split('')
            noteSpell.pop()
            noteSpell = noteSpell.join('')

             // let index = keySyntaxArr.indexOf(element.split(',')[0])
             // let currentAudio = audioArr[index]
            //  console.log({currentAudio})
            //console.log(diezeAlterations.indexOf(noteSpell) )
              if((keyAlteration !== false && keyAlteration === "d") || (diezeAlterations.indexOf(noteSpell) !== -1 && keyAlteration !== "c")){

            alteration = notes.dieze
              }else if((keyAlteration !== false && keyAlteration === "b") || (bemolAlterations.indexOf(noteSpell) !== -1 && keyAlteration !== "c")){
             alteration = notes.bemol
             //console.log(alteration)
              }

    

    switch (elTime) {
      case "0.13" :
      case "0.12":
          if(noteSyntax !== '-')
        note = notes.fortieth
        else
        note = notes.sixteenNoteRest
        break;
      case "0.25":
        if(noteSyntax !== '-')
        note = notes.sixteenth
        else
        note = notes.sixteenNoteRest
        break;
        case "0.37":
        if(noteSyntax !== '-')
        note = notes.sixteenth + "."
        else
        note = notes.sixteenNoteRest
        break;
      case "0.5":
        if(noteSyntax !== '-')
        note = notes.eighth
        else
        note = notes.eighthNoteRest
        break;
      case "0.75":
        if(noteSyntax !== '-')
        note = notes.eighth + '.'
        else
        note = notes.eighthNoteRest + '.'
        break;
      case "1":
        case "1.25":
        if(noteSyntax !== '-')
        note = notes.quarter
        else
        note = notes.quarterNoteRest
     
        break;
      case "1.5":
        case '1.75':
         if(noteSyntax !== '-')
        note = notes.quarter + "."
        else
        note = notes.quarterNoteRest + "."
        break;
      case "2":
        case "2.25":
          case "2.5":
            case "2.75":
        if(noteSyntax !== '-')
        note = notes.half 
        else
        note = notes.halfNoteRest
        break;
      case "3":
        case "3.25":
          case "3.5":
            case "3.75":
        if(noteSyntax !== '-')
        note = notes.half + "."
        else
        note = notes.halfNoteRest + "."
        break;
      case "4":
        case "4.25":
          case "4.5":
            case "4.75":
              case "5":
        case "5.25":
          case "5.5":
            case "5.75":
        if(noteSyntax !== '-')
        note = notes.whole 
        else
        note = notes.wholeNoteRest
        break;
      case "6":
         case "6.25":
          case "6.5":
            case "6.75":
        if(noteSyntax !== '-')
        note = notes.whole + "."
        else
        note = notes.wholeNoteRest + "."
        break;
    
      default:
        if(noteSyntax !== '-')
        note = notes.whole
        else
        note = notes.wholeNoteRest 
        break;
       
    }

    let span = document.createElement('span')
    span.style.position = 'absolute'
    span.style.left = (i * 40) + 'px'
    span.style.bottom = -20 +'px'  
    span.style.fontFamily = 'Noto Music'
    span.style.fontSize = 40 + "px"
    span.style.outline= 'none'
    span.style.margin = 0
    span.style.padding = 0
    span.style.border = 'none'
    span.setAttribute('id', (pupitre + i) )
    span.classList.add('music-note')
    
    span.innerText = note

    let currentLine

    if(alteration !== ""){
      let spanAlt = document.createElement('span')
      spanAlt.classList.add('spanAlt')
      spanAlt.innerText = alteration
      span.appendChild(spanAlt)
    }

    if(noteSyntax !== '-'){
    let elId = noteSyntax + pupitre
     currentLine = document.getElementById(elId)
    if(currentLine.classList.contains('tiret')){
      let tiret = document.createElement('span')
      tiret.classList.add('linethrow')
      span.appendChild(tiret)
    }

    
    currentLine.appendChild(span)   
    }else {
      currentLine = lines[10]
      if(note === notes.halfNoteRest){
        span.style.bottom = 10 + 'px'
      }
      
      else
      span.style.bottom = 0 
      currentLine.appendChild(span)
    }

    arrDiv.push(span)

    //console.log({spanLeft : span.offsetLeft})
   // console.log({parentWidth : currentLine.parentElement.clientWidth})


    if(i === notesWithTimeArr.length -1){
      lines.forEach(line => {
      line.style.width = (i * 40) +40 + 'px'
      //console.log(line)
    })
    }
   }

}

function addTextToSymbols(arrSymbols, textArr){

  if(arrSymbols.length === 0) return

  //console.log({textArr})

  let wordsArr = textArr.split("-");

  for (let i = 0; i < arrSymbols.length; i++) {
    let span = arrSymbols[i];

    span = document.getElementById(span.getAttribute('id'))

    

    let hTag = span.querySelector('h3')

    

    if(hTag !== null)
    span.removeChild(hTag)

    hTag = document.createElement('h3')

    
    hTag.classList.add('hText')
    hTag.innerText = wordsArr[i]

    span.appendChild(hTag)
   // console.log(span)
    
  }
}

      function getAudioAndNoteForPiano(arrAudios, arrNotes, pos){

        let currentAudioSrc = arrAudios[pos]
          let currentNote = arrNotes[pos]

          if(diezeAlterations.indexOf(currentNote) !== -1){

            let currentAudio = currentAudioSrc.split('')
            currentAudio.splice(1, 0, '#')

            currentAudioSrc = currentAudio.join('')
            currentNote += "#"
          }else if(bemolAlterations.indexOf(currentNote) !== -1){
            let currentAudio = currentAudioSrc.split('')
            currentAudio.splice(1, 0, 'b')
            currentAudioSrc = currentAudio.join('')
            var uniCodeBemol = '\u266d'
            currentNote += uniCodeBemol
          }

          return [currentAudioSrc, currentNote]
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
      async function handlePlayPiano(e, playDirectly=true){

        //e.preventDefault()

         

        let syntaxArr = pianoNotesRef.current.value.trim().split('|')
       // console.log({syntaxArr})

        let notesArrObj = []

        for (let i = 0; i < syntaxArr.length; i++) {
          const element = syntaxArr[i];

          let notesWithDurations = element.split(';')
          let notes = []
          let durations = []

          notesWithDurations.forEach(noteWithDuration => {
            let note = noteWithDuration.trim().split(',')[0]
            let duration = parseFloat(noteWithDuration.trim().split(',')[1])

            if(note === '-') note = null

            notes.push(note)
            durations.push(duration)
          })
          notesArrObj.push({notes, durations})
        }

      //  console.log(notesArrObj)
        if(playDirectly)
          playPianoNotes(notesArrObj, floatingPadRef)

          return notesArrObj
      }

      let pianoNotes = []
      let sopranoFloatArr = []
      let altoFloatArr = []
      let tenorFloatArr = []
      let bassFloatArr = []

      function handleFloatPadChange(e, audio, id, note, pos){
         
     
        let checkBox = document.getElementById(id)
        let elementToAdd = audio 

        playOneAudio(audio)

        let arr = []

          switch (pupitreSelected) {
          case 'piano':
            arr = pianoNotes
            break;
           case 'soprano':
             arr = sopranoFloatArr
             elementToAdd = sopranoNotesSyntax[pos]
            break;

             case 'alto':
             arr = altoFloatArr
             elementToAdd = altoNotesSyntax[pos]
            break;

             case 'tenor':
             arr = tenorFloatArr
             elementToAdd = tenorNotesSyntax[pos]
            break;

             case 'bass':
             arr = bassFloatArr
             elementToAdd = bassNotesSyntax[pos]
            break;
        default:
          break;
         
        }

        if(checkBox.checked === true)
        arr.push(elementToAdd)
        else {
          arr.splice(pianoNotes.indexOf(elementToAdd), 1)
        }
        

        //console.log(pianoNotes)
        

      }

      function handleFloatingAddNotes(e, pupitreSelect){

        e.preventDefault()

          let currentValueInTextArea 

         

        let arr = []
        let ref

         switch (pupitreSelected) {
          case 'piano':
            arr = pianoNotes
            ref = pianoNotesRef
            currentValueInTextArea =pianoNotesRef.current.value
            break;
           case 'soprano':
             arr = sopranoFloatArr
             ref = sopranoNotesRef
             currentValueInTextArea =sopranoNotesRef.current.value
            break;

             case 'alto':
             arr = altoFloatArr
             ref = altoNotesRef
             currentValueInTextArea =altoNotesRef.current.value
            break;

             case 'tenor':
             arr = tenorFloatArr
             ref = tenorNotesRef
             currentValueInTextArea =tenorNotesRef.current.value
            break;

             case 'bass':
             arr = bassFloatArr
             ref = bassNotesRef
             currentValueInTextArea =bassNotesRef.current.value
            break;
        default:
          break;
         
        }

        if(arr.length === 0) return

         //console.log({currentValueInTextArea})
          //console.log({pupitreSelected})
          let duration = pupitreSelected === 'piano' ? parseFloat(parseFloat(floatingTime.current.value)*Math.round((60 / tempo) * 100) / 100).toFixed(2) : floatingTime.current.value

         // console.log(duration)

          let seperSign = ";"
          if(pupitreSelected === 'piano'){
            let endSyntax = prompt("Please enter the end syntax. 1 for | and 2 for ;")
            if(endSyntax === "1")
               seperSign = "|" + "\n"
          }
          

        let valueToAdd =currentValueInTextArea === "" ? "" : seperSign

       // console.log(arr)
        

        for (let i = 0; i < arr.length; i++) {            
                valueToAdd += arr[i] + "," + duration
                if(i< arr.length-1)
                valueToAdd += ";"
                         
        }
     
        ref.current.value = currentValueInTextArea + valueToAdd
        ref.current.scrollTop= ref.current.scrollHeight
        

        //let container1 = document.getElementsByClassName("sol-section")

       let checkboxes =  document.querySelectorAll('input[type="checkbox"]:checked')

       //console.log(checkboxes)

       checkboxes.forEach(checkbox => checkbox.checked = false)

        arr.splice(0, arr.length)
      }


      function handleFloatingPupitreSelection(pupitreSelect){

        setPupitreSelected(pupitreSelect)
        switch (pupitreSelect) {
          case "soprano":
            setPupitreRef(sopranoNotesRef)
            break;
          case "alto":
            setPupitreRef(altoNotesRef)
            break;
          case "tenor":
            setPupitreRef(tenorNotesRef)
            break;
          case "bass":
            setPupitreRef(bassNotesRef)
            break;
           case "piano":
            setPupitreRef(pianoNotesRef)
            break;
            
        
          default:
            break;
        }
      }




function handleFloatVisibility(){
        if(floatingPadRef.current.style.visibility === "visible")
            floatingPadRef.current.style.visibility = "hidden"
        else 
        floatingPadRef.current.style.visibility = "visible"
  }

  function addFloatAlteration(audioAlt, syntaxAlt){

      if(pupitreSelected === 'piano'){
              let arr = pupitreRef.current.value.split("|")
              let lastNotes = arr.pop()
              let lastNotesArr = lastNotes.split(';')
              let indexToAlterate = parseInt(prompt("Wich index of note do you want to alterate? ", 1))
              let noteToAlterateWithTime = lastNotesArr[indexToAlterate-1]

              let noteToAlterate = noteToAlterateWithTime.split(',')[0]
              let newNote = noteToAlterate.split('').join(audioAlt) + ',' + noteToAlterateWithTime.split(',')[1]
              if(audioAlt === "c"){
                let noteToAlterateArr = noteToAlterate.split('')
                noteToAlterateArr.splice(1, 1)
                newNote = noteToAlterateArr.join('') + ',' + noteToAlterateWithTime.split(',')[1]
              }

              lastNotesArr.splice(indexToAlterate -1, 1, newNote)

              arr.push(lastNotesArr.join(';'))

              pupitreRef.current.value = arr.join('|')
          }else{
              pupitreRef.current.value += syntaxAlt
          }
  }

  function setFloatTime(){

    if(pupitreSelected !== 'piano') return

     let arr = pupitreRef.current.value.split("|")
              let lastNotes = arr.pop()
              let lastNotesArr = lastNotes.split(';')
              let indexNoteToSet = parseInt(prompt("wich index of note do you want to set? ", 1))
              let timeToSet = parseFloat(prompt("wich time do you want to set? ", 1))
              let noteToAlterateWithTime = lastNotesArr[indexNoteToSet-1]

             let convertedTime =  parseFloat(timeToSet*Math.round((60 / tempo) * 100) / 100).toFixed(2)

              let noteToAlterateWithTimeArr = noteToAlterateWithTime.split(',')
              noteToAlterateWithTimeArr.splice(1, 1, convertedTime)
              //let timeToAlterate = noteToAlterateWithTimeArr[1]
              let newNote = noteToAlterateWithTimeArr.join(',') 

              lastNotesArr.splice(indexNoteToSet -1, 1, newNote)

              arr.push(lastNotesArr.join(';'))

              pupitreRef.current.value = arr.join('|')

    
  }
  
    return (
      <div className="partition-page">
        <img src={poweredIcon} alt="powered-logo" id='powered-logo' />
        <div className="presentation">
          
          <div className="title-name">
            <input ref={titleName} type="text" name="title" id="title-input" />
          </div>
          <div className="description">
            <input ref={titleDescription} type="text" name="description" id="description-input" />
          </div>
        </div>
    
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

            <button onClick={handleSave} >
              Save All
            </button>
            <button onClick={handleSaveWithNotes} >
              Save With notes
            </button>
            
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
              <label className="white-label" htmlFor="tempotime">
                Time per tempo
              </label>
              <input
                className="input-tempo"
                placeholder="Enter Time per tempo"
                name="tempotime"
                type="number"
                value={timePerTempo}
                onChange={(e) => setTimePerTempo(e.target.value)}
              />
              <input type="checkbox" name="play-tempo" id="playTempo" value={playTempo} onChange={() => setPlayTempo((prev) => !prev)} />
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
            <button onClick={(e) => addTextToSymbols(sopranoDivToTrigger, sopranoWordsRef.current.value)} >Add words</button>
            </div>

            <div className="piano-notes">
        {arr.map((i, pos) => {

let currentAudioSrc = getAudioAndNoteForPiano(audioForSoprano, notesForSoprano,pos)[0]
let currentNote = getAudioAndNoteForPiano(audioForSoprano, notesForSoprano,pos)[1]
          
          return (
            <Piano
            key={uuidv4()}
            
              currentAudioSrc={currentAudioSrc}
              currentNote={currentNote}
              
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
        <button onClick={(e) => addNotesSymbol(sopranoNotesRef, 'soprano', sopranoDivToTrigger)}>Add Notes</button>
      </div>

              <div id="soprano">
                <input type='text' value={namePupitre1} onChange={(e) =>  setNamePupitre1(e.target.value) } /> 
                 <img src={iconForSoprano} className="img-icon" alt="key icon" />
                  <CompleteLine2 keys={keyForSoprano} pupitre={"soprano"} />
              </div>

            
              
          </div>
          <div id="alto-section" className="pupitre">
          <div className='words'>
            <textarea  className='words-input' ref={altoWordsRef} placeholder='Add words for Alto' ></textarea>
            <button onClick={(e) => addTextToSymbols(altoDivToTrigger, altoWordsRef.current.value)} >Add words</button>
            </div>
            <div className="piano-notes">
        {arr.map((i, pos) => {

let currentAudioSrc = getAudioAndNoteForPiano(audioForAlto, notesArrForAlto,pos)[0]
let currentNote = getAudioAndNoteForPiano(audioForAlto, notesArrForAlto,pos)[1]
          
          return (
            <Piano
            key={uuidv4()}
            
              currentAudioSrc={currentAudioSrc}
              currentNote={currentNote}
              
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
        <button onClick={(e) => addNotesSymbol(altoNotesRef, 'alto', altoDivToTrigger)}>Add Notes</button>
      </div>

      
          
            <div id="alto">
              <input type='text' value={namePupitre2} onChange={(e) =>  setNamePupitre2(e.target.value) } /> 
               <img src={iconForAlto} className="img-icon" alt="key icon" />
                  <CompleteLine2 keys={keyForAlto} pupitre={"alto"} />
              </div>
          </div>
          <div id="tenor-section" className="pupitre">
          <div className='words'>
            <textarea  className='words-input' ref={tenorWordsRef} placeholder='Add words for Tenor' ></textarea>
            <button onClick={(e) => addTextToSymbols(tenorDivToTrigger, tenorWordsRef.current.value)} >Add words</button>
            </div>

            <div className="piano-notes">
        {arr.map((i, pos) => {

let currentAudioSrc = getAudioAndNoteForPiano(audioForTenor, notesForTenor,pos)[0]
let currentNote = getAudioAndNoteForPiano(audioForTenor, notesForTenor,pos)[1]
          
          return (
            <Piano
            key={uuidv4()}
            
              currentAudioSrc={currentAudioSrc}
              currentNote={currentNote}
              
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
         <button onClick={(e) => addNotesSymbol(tenorNotesRef, 'tenor', tenorDivToTrigger)}>Add Notes</button>
      </div>

      
            <div id="tenor">
              <input type='text' value={namePupitre3} onChange={(e) =>  setNamePupitre3(e.target.value) } /> 
               <img src={iconForTenor} className="img-icon" alt="key icon" />
                  <CompleteLine2 keys={keyForTenor} pupitre={"tenor"} />
              </div>
          </div>
          <div id="bass-section" className="pupitre">
          <div className='words'>
            <textarea  className='words-input' ref={bassWordsRef} placeholder='Add words for Bass' ></textarea>
            <button onClick={(e) => addTextToSymbols(bassDivToTrigger, bassWordsRef.current.value)} >Add words</button>
            </div>

            <div className="piano-notes">
        {arr.map((i, pos) => {

          let currentAudioSrc = getAudioAndNoteForPiano(audioFaKey, notesFaKey,pos)[0]
          let currentNote = getAudioAndNoteForPiano(audioFaKey, notesFaKey,pos)[1]

          
          return (
            <Piano
            key={uuidv4()}
            
              currentAudioSrc={currentAudioSrc}
              currentNote={currentNote}
              
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
         <button onClick={(e) => addNotesSymbol(bassNotesRef, 'bass', bassDivToTrigger)}>Add Notes</button>
      </div>

      
            <div id="bass">
              <input type='text' value={namePupitre4} onChange={(e) =>  setNamePupitre4(e.target.value) } /> 
              <img src={faIcon} className="img-icon" alt="key icon" />
                  <CompleteLine2 keys={"fa"} pupitre={"bass"} />
              </div>
          </div>
<input className='check-float-visibility' type="checkbox" onChange={handleFloatVisibility} />
          <div className="notes-area" id='piano-area'>
            <div className="sol-keys">
              <h3>Treble clef staff</h3>

              <div className="piano-notes">
        {arr.map((i, pos) => {

            let currentAudioSrc = getAudioAndNoteForPiano(audioForSoprano, notesForSoprano,pos)[0]
            let currentNote = getAudioAndNoteForPiano(audioForSoprano, notesForSoprano,pos)[1]
          
          return (
            <Piano
            key={uuidv4()}
            
              currentAudioSrc={currentAudioSrc}
              currentNote={currentNote}
              tempo={Math.round((60 / tempo) * 100) / 100}
              noteSyntax={sopranoNotesSyntax[pos]}
              relTextArea = {pianoNotesRef}
              isPiano = {true}
             
            />
          )
        })}

         <button className="piano-touch pipe" onClick={(e) => {pianoNotesRef.current.value += "|"}}>
          |
        </button> 
      </div>
            </div>
            <div className="fa-keys">
        
              <h3>Bass clef staff</h3>
              <div className="piano-notes">
        {arr.map((i, pos) => {

            let currentAudioSrc = audioFaKey[pos]
            let currentNote = notesFaKey[pos]

            if(diezeAlterations.indexOf(currentNote) !== -1){

              let currentAudio = currentAudioSrc.split('')
              currentAudio.splice(1, 0, '#')

              currentAudioSrc = currentAudio.join('')
              currentNote += "#"
            }else if(bemolAlterations.indexOf(currentNote) !== -1){
              let currentAudio = currentAudioSrc.split('')
              currentAudio.splice(1, 0, 'b')
              currentAudioSrc = currentAudio.join('')
              var uniCodeBemol = '\u266d'
              currentNote += uniCodeBemol
            }
          
          return (
            <Piano
            key={uuidv4()}
            
              currentAudioSrc={currentAudioSrc}
              currentNote={currentNote}
              tempo={Math.round((60 / tempo) * 100) / 100}
              noteSyntax={bassNotesSyntax[pos]}
              relTextArea = {pianoNotesRef}
              isPiano = {true}
             
            />
          )
        })}

         <button className="piano-touch pipe" onClick={(e) => {pianoNotesRef.current.value += "|"}}>
          |
        </button> 
      </div>
            </div>
        <textarea
          className="notes-array piano-text"
          
          ref={pianoNotesRef}
          placeholder={'Add Notes for Piano'}
        ></textarea>
        
      </div>

      

      
    <form className="floting_pad"  ref={floatingPadRef}  onSubmit={(e) => handleFloatingAddNotes(e, pupitreSelected)} >
      <input className='check-float-visibility' type="checkbox" onChange={handleFloatVisibility} />
     
      
      <div className="submit-section" >
        <select value={pupitreSelected} name="pupitre" id="" onChange={(e) => handleFloatingPupitreSelection(e.target.value)}>
          <option value="piano">Piano</option>
          <option value="soprano">Soprano</option>
          <option value="alto">Alto</option>
          <option value="tenor">Tenor</option>
          <option value="bass">Bass</option>

        </select>
      <input type="number" min={0} step={0.25} ref={floatingTime} />
      

      </div>
       <input type="submit" value="Add Notes" hidden/>
       <div className="timepad">
        <button ref={quaterRef}  onClick={(e) => floatingTime.current.value = 0.25}>0.25</button>
        <button ref={halfRef}  onClick={(e) => floatingTime.current.value = 0.5}>0.5</button>
        <button ref={threequartRef}  onClick={(e) => floatingTime.current.value = 0.75}>0.75</button>
        <button ref={oneRef}   onClick={(e) => floatingTime.current.value = 1}>1</button>
        <button ref={oneHalfRef}  onClick={(e) => floatingTime.current.value = 1.5}>1.5</button>
        <button ref={twoRef}   onClick={(e) => floatingTime.current.value = 2}>2</button>
        <button ref={twoHalfRef}   onClick={(e) => floatingTime.current.value = 2.5}>2.5</button>
        <button ref={threeRef}    onClick={(e) => floatingTime.current.value = 3}>3</button>
        <button ref={threeHalfRef}  onClick={(e) => floatingTime.current.value = 3.5}>3.5</button>
        <button ref={fourRef}  onClick={(e) => floatingTime.current.value = 4}>4</button>
        
      </div>

      <div className="alterations_float">
        <div onClick={() => addFloatAlteration('#', ",d")} className="alteration dieze">#</div>
        <div onClick={() => addFloatAlteration('b', ",b")} className="alteration bemol">{notes.bemol}</div>
        <div onClick={() => addFloatAlteration('c', ",c")} className="alteration becarre">{notes.c}</div>
        <div onClick={() => addFloatAlteration('tr', ",tr")} className="alteration ">T</div>

      </div>

      <div className="sol-section">
         {arr.map((i, pos) => {

            let currentAudioSrc = getAudioAndNoteForPiano(audioForSoprano, notesForSoprano,pos)[0]
            let currentNote = getAudioAndNoteForPiano(audioForSoprano, notesForSoprano,pos)[1]
            let id = uuidv4()
          
          return (

            <div className="check" key={currentAudioSrc + pos}>
              <label htmlFor={currentNote}>{currentNote}</label>
              <input id={id} type="checkbox" name={currentAudioSrc} onChange={(e) => handleFloatPadChange(e,currentAudioSrc, id, currentNote, pos)} />
              <button  onClick={(e) => handleFloatPadChange(e, currentAudioSrc, id, currentNote, pos)} >+</button>
            </div>
            
          )
        })}
      </div>

       <div className="fa-section">
         {arr.map((i, pos) => {

            let currentAudioSrc = getAudioAndNoteForPiano(audioFaKey, notesFaKey,pos)[0]
            let currentNote = getAudioAndNoteForPiano(audioFaKey, notesFaKey,pos)[1]
            let id = uuidv4();
          
          return (

            <div className="check" key={currentAudioSrc + pos}>
              <label htmlFor={currentNote}>{currentNote}</label>
              <input id={id} type="checkbox" name={currentAudioSrc} onChange={(e) => handleFloatPadChange(e, currentAudioSrc, id, currentNote, pos)} />
              <button onClick={(e) => handleFloatPadChange(e, currentAudioSrc, id, currentNote, pos)}>+</button>
            </div>
            
          )
        })}
      </div>

     
      
        
    </form>

    
       
      </div>
    );

  }


export default Partition
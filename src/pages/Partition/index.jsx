
import React,  { useEffect } from 'react'
import './index.scss'
import notes from "./musicNotes"
function Partition2() {

   const {quarter, half, whole, sixteenth, eighth, quarterNoteRest,halfNoteRest, wholeNoteRest, sixteenNoteRest, eighthNoteRest } = notes
   const lineIds = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eigth', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty', 'twentyone', 'twentytwo']

   function addNotesSymbol(){
    let notes  = [{note:quarter, line: lineIds[0]}, {note:half, line: lineIds[1]}, {note:whole, line: lineIds[2]}, {note:sixteenth, line: lineIds[3]}, {note:eighth, line: lineIds[4]},{note:quarter, line: lineIds[5]}, {note:half, line: lineIds[6]}, {note:whole, line: lineIds[7]}, {note:sixteenth, line: lineIds[8]}, {note:eighth, line: lineIds[9]}, {note:quarter, line: lineIds[10]}, {note:half, line: lineIds[11]}, {note:whole, line: lineIds[12]}, {note:sixteenth, line: lineIds[13]}, {note:eighth, line: lineIds[14]}, {note:half, line: lineIds[15]}, {note:whole, line: lineIds[16]}, {note:sixteenth, line: lineIds[17]}, {note:eighth, line: lineIds[18]}]

   for (let i = 0; i < notes.length; i++) {
    const element = notes[i];
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
    

    span.classList.add('music-note')

    span.innerText = element.note
    let currentLine = document.getElementById(element.line)
    currentLine.appendChild(span)   
   }

}

useEffect(() => {
  addNotesSymbol()
}, [])

  return (
    <div className="music-bloc">
        <div className="lines">
            <div id={lineIds[21]}className="line up"></div>
            <div id={lineIds[20]} className="line up"></div>
            <div id={lineIds[19]} className="line up"></div>
            <div id={lineIds[18]} className="line up"></div>
            <div id={lineIds[17]} className="line up"></div>
            <div id={lineIds[16]}className="line up"></div>
            <div id={lineIds[15]} className="line up"></div>
            <div id={lineIds[14]} className="line stroke"></div>
            <div id={lineIds[13]} className="line"></div>
            <div id={lineIds[12]} className="line stroke"></div>
            <div id={lineIds[11]}className="line"></div>
            <div id={lineIds[10]} className="line stroke"></div>
            <div id={lineIds[9]} className="line"></div>
            <div id={lineIds[8]} className="line stroke"></div>
            <div id={lineIds[7]} className="line"></div>
            <div id={lineIds[6]}className="line stroke"></div>
            <div id={lineIds[5]}className="line down"></div>
            <div id={lineIds[4]} className="line down"></div>
            <div id={lineIds[3]} className="line down"></div>
            <div id={lineIds[2]} className="line down"></div>
            <div id={lineIds[1]} className="line down"></div>
            <div id={lineIds[0]}className="line down"></div>
        </div>

    </div>
  )
}

export default Partition2
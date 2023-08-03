import React, { useEffect, useRef, useState } from 'react'
import WaveSurfer from 'wavesurfer.js'

import song from '../../src/assets/choeurs/kyrie.mp3'
import gloria from '../../src/assets/choeurs/20230730-174050.mp3'

const Choirs = () => {

    const relativePath = './assets/choeurs'
    const absolutePath = "C:/Users/PBHEV/Desktop/partition/src/assets/choeurs"
    const [fileLink, setFileLink] = useState('')
    const fileRef = useRef()

    let wavesurfer = null
    let mAudio = null

useEffect(() => {
  wavesurfer = WaveSurfer.create({
  container: '#waveform',
  waveColor: '#4F4A85',
  progressColor: '#383351',  
  barWidth: 4,
 
}) 


wavesurfer.on('ready', function() {
  wavesurfer.play();
});


if(fileLink !== ""){
 mAudio = new Audio()


 

mAudio.src = URL.createObjectURL(fileLink);

wavesurfer.load(mAudio)

mAudio.load()

mAudio.play()

console.log(fileLink)

    
}



  return () => {
    wavesurfer = null
  }
}, [fileLink])


    function handleFileSelected(){

        

        let file = fileRef.current.value.split('\\')[2]

       // import myfile from `../../src/assets/choeurs/${file}`

       

        const path = 'choeurs/'  + file
        setFileLink(path)
         /*wavesurfer.load( path ) */
         console.log(path)
    }
  return (
    <div>

        <input ref={fileRef} onChange={handleFileSelected} type="file" name="audio-file" id="" />

        <div id="waveform"></div>
        
    </div>
  )
}

export default Choirs
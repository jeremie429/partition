import * as Tone from 'tone'
import { AMSynth } from 'tone'
import { startRecording, stopRecording } from './recorderFunc'

const synth2 = new Tone.Synth().toDestination();
const amSynth = new Tone.AMSynth().toDestination()
const amSynth2 = new Tone.AMSynth({ volume: -5 }).toDestination()

const polysynthPiano = new Tone.PolySynth({
  volume: -20,
}).toDestination()

//const amOsc = new Tone.AMOscillator(30, 'sine', 'square').toDestination()

const polysynth = new Tone.PolySynth(Tone.AMSynth).toDestination()
//Tone.Transport.bpm = 110

const MAX_BUFFERS = 7

let _playingBuffers = []

export async function playOneAudio(audio) {
  await Tone.start()
  try {
    amSynth.triggerAttackRelease(audio, '8n')
  } catch (error) {
    console.log(error)
  }
}

let counter
export async function playSnd(
  arrObj,
  pupitre,
  cTitle,
  otherSounds,
  arrDiv,
  floatingPadRef,
  pianoArrNotes
) {
  // console.log({ arrObj })
  if (arrObj.length === 0) return

  let lineBloc = arrDiv[0].parentNode.parentElement
  let maxWidth = arrDiv[0].parentNode.parentElement.clientWidth
  let nextWidth = maxWidth

  let lines = arrDiv[0].parentElement

  //console.log(pianoArrNotes)

  lineBloc.scrollLeft = 0

  if (window.outerWidth > 1000) await startRecording()
  /*
  if (otherSounds.length <= 1)
    polysynth.set({
      volume: -16,
    })*/

  setTimeout(async () => {
    let mainChords = []

    await Tone.start()

    let totalDuration = 0

    for (let i = 0; i < arrObj.length; i++) {
      const element = arrObj[i]
      //console.log(element.durNotConverted)
      let dur = Tone.Time(element.duration).toMilliseconds()

      // console.log({ dur })
      totalDuration += dur
    }

    totalDuration = Math.round(totalDuration)

    let index = 0
    let prevDiv

    for (let i = 0; i < otherSounds.length; i++) {
      const arr = otherSounds[i]

      if (arr.length > 0) {
        arr.forEach((obj) => {
          obj.second = true
          arrObj.push(obj)
        })
      }
    }

    if (pianoArrNotes.length > 0)
      await playPianoNotes(pianoArrNotes, floatingPadRef, false)

    const mainMelodyPart = new Tone.Part(function (time, note) {
      //console.log(time)
      if (!note.second) {
        //console.log(note.duration)
        synth2.triggerAttackRelease(note.note, note.duration, time)
        if (
          otherSounds[0].length === 0 &&
          otherSounds[1].length === 0 &&
          otherSounds[2].length === 0
        ) {
          //console.log('here...')
          amSynth2.triggerAttackRelease(note.note, note.duration, time)
        }

        Tone.Draw.schedule(function () {
          // let prevDiv = arrDiv[index]
          prevDiv !== undefined && prevDiv.classList.remove('playing')

          prevDiv = arrDiv[index]

          // console.log(prevDiv.offsetLeft)

          if (prevDiv.offsetLeft > nextWidth - 200) {
            lineBloc.scrollLeft = prevDiv.offsetLeft - 100
            nextWidth += maxWidth - 200

            //console.log({ nextWidth })
          }

          //let parentDiv = prevDiv.parentElement
          // console.log(parentDiv)
          prevDiv.classList.toggle('playing')
          if (index === arrDiv.length - 1) {
            setTimeout(() => {
              arrDiv[arrDiv.length - 1].classList.toggle('playing')
            }, Tone.Time(note.duration).toMilliseconds())
          }
          index++
        }, time)
      } else {
        polysynth.triggerAttackRelease(note.note, note.duration, time)
      }
    }, arrObj).start(0)

    let firstArr = otherSounds[0]
    let secondArr = otherSounds[1]
    let thirdArr = otherSounds[2]
    let part1
    let part2
    let part3

    Tone.Transport.start()

    if (window.outerWidth > 1000) {
      counter = setTimeout(() => {
        if (part1 !== undefined) part1.stop()
        if (part2 !== undefined) part2.stop()
        if (part3 !== undefined) part3.stop()

        mainMelodyPart.stop()
        Tone.Transport.stop()

        let title = prompt('Please enter title', cTitle)

        stopRecording(pupitre, title)
      }, totalDuration + 5000)
    }
  }, 3000)
}

export default counter

export async function playChoir(sopranoArr, altoArr, tenorArr, bassArr) {
  await Tone.start()

  // console.log({ sopranoArr, altoArr, tenorArr, bassArr })

  playSnd(sopranoArr)
  playSnd(altoArr)
  playSnd(tenorArr)
  playSnd(bassArr)

  //const polysynth = new Tone.PolySynth(Tone.AMSynth).toDestination()

  /* const sopranoSynth = new Tone.AMSynth().toDestination()
  const altoSynth = new Tone.AMSynth().toDestination()
  const tenorSynth = new Tone.AMSynth().toDestination()
  const bassSynth = new Tone.AMSynth().toDestination()

  let greatestLength = Math.max(
    sopranoArr.length,
    altoArr.length,
    tenorArr.length,
    bassArr.length
  )
  //let mainChords = []
  let now = Tone.now()
  let sopranoTime = now
  let altoTime = now
  let tenorTime = now
  let bassTime = now

  let sopranoObj
  let altoObj
  let bassObj
  let tenorObj

  for (let i = 0; i < greatestLength; i++) {
    if (i < sopranoArr.length) {
      sopranoObj = sopranoArr[i]
      sopranoSynth.triggerAttackRelease(
        sopranoObj.note,
        sopranoObj.duration,
        sopranoTime
      )

      sopranoTime += sopranoObj.duration
    }
    if (i < altoArr.length) {
      altoObj = altoArr[i]
      altoSynth.triggerAttackRelease(altoObj.note, altoObj.duration, altoTime)

      altoTime += altoObj.duration
    }
    if (i < tenorArr.length) {
      tenorObj = tenorArr[i]
      tenorSynth.triggerAttackRelease(
        tenorObj.note,
        tenorObj.duration,
        tenorTime
      )

      tenorTime += tenorObj.duration
    }
    if (i < bassArr.length) {
      bassObj = bassArr[i]
      bassSynth.triggerAttackRelease(bassObj.note, bassObj.duration, bassTime)

      bassTime += bassObj.duration
    }
  }*/
}

export async function playPianoNotes(
  notesArrObj,
  floatingPadRef,
  record = true
) {
  Tone.Transport.start()

  //polysynth.maxPolyphony = 4

  if (record) await startRecording()

  let time = record ? 3000 : 0

  setTimeout(() => {
    if (notesArrObj.length === 0) return

    let totalDuration = 0
    let delay = Tone.now()

    for (let i = 0; i < notesArrObj.length; i++) {
      const element = notesArrObj[i]

      let notes = element.notes
      let durations = element.durations
      let durationToAdd = Math.min(durations) || durations[0]

      let maxDuration = Math.max(durations) || durations[0]

      totalDuration += maxDuration

      if (notes[0] !== '-')
        polysynthPiano.triggerAttackRelease(notes, durations, delay)

      delay += durationToAdd
    }

    if (window.outerWidth > 1000) {
      setTimeout(async () => {
        Tone.Transport.stop()

        if (record) {
          let title = prompt('Please enter title')
          await stopRecording('Piano', title)
        }
      }, totalDuration * 1020)
    }
  }, time)
}

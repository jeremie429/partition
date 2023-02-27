import * as Tone from 'tone'
import { startRecording, stopRecording } from './recorderFunc'

//Tone.AMSynth
const synth = new Tone.Synth().toDestination()
const synth2 = new Tone.Synth().toDestination()
const amSynth = new Tone.AMSynth().toDestination()
const polysynth = new Tone.PolySynth().toDestination()
const pluckysynth = new Tone.PluckSynth().toDestination()
// decay: 0.5, sustain: 0.1
/*polysynth.set({
  harmonicity: 10,
  envelope: {
    attack: 0.001,
    decay: 0.5,
    sustain: 0.2,
    // release: 1,
  },
})*/
//polysynth.volume.value = -20
//const newSynth = new Tone.Synth().toDestination()
//Tone.Transport.bpm.value = 150

//console.log('Tone Bpm Value', Tone.Transport.bpm)

export async function playOneAudio(audio) {
  await Tone.start()
  try {
    amSynth.triggerAttackRelease(audio, '8n')
  } catch (error) {
    console.log(error)
  }
}
export async function playSnd(
  arrObj,
  noteDuration,
  timePerTempo = 4,
  firstLetterPup,
  cTitle,
  playTempo
) {
  // console.log({ arrObj })

  // Tone.Transport.bpm.value = tempo

  //await Tone.start()

  let tempDuration = timePerTempo * noteDuration

  //console.log({ tempDuration, noteDuration })

  if (arrObj.length === 0) return

  if (window.outerWidth > 1000) await startRecording()

  /*let sequence = new Tone.Sequence(
    (time, note) => {
      synth.triggerAttackRelease(note)

      console.log({ time })
    },
    ['C4'],
    '4n'
  )

  sequence.start()*/

  let totalDuration = 0

  let delay = arrObj.length > 100 ? Tone.now() + 0.5 : Tone.now()

  /* const seq = new Tone.Sequence(
    (time, note) => {
      synth.triggerAttackRelease(note, 0.1, time)

      console.log({ time })
      // subdivisions are given as subarrays
      //, ['E4', 'D4', 'E4'], 'G4', ['A4', 'G4']
    },
    ['C4', ['E4', 'D4', 'E4'], 'G4', ['A4', 'G4']]
  ).start(delay)*/

  let startTime = Math.round(delay)

  let bit = null

  //console.log({ startTime })
  if (playTempo) {
    const vol = new Tone.Volume(-6).toDestination()
    synth2.connect(vol)

    bit = new Tone.Loop((time) => {
      //console.log(time)
      synth2.triggerAttackRelease('C1', 0.05)
    }, tempDuration).start()

    Tone.Transport.start()
  }

  for (let i = 0; i < arrObj.length; i++) {
    const element = arrObj[i]

    let durationToAdd = element.duration

    totalDuration += durationToAdd

    if (element.isSoupir) {
      delay += durationToAdd
    } else {
      if (element.isLinked) {
        let nextToPlay = arrObj[i + 1]

        if (nextToPlay.note === element.note) {
          durationToAdd += nextToPlay.duration
          i += 1
        }
      }
      let duration = durationToAdd
      let note = element.note
      synth.triggerAttackRelease(note, duration, delay)
      amSynth.triggerAttackRelease(note, duration, delay)

      delay += durationToAdd
    }
  }

  if (window.outerWidth > 1000) {
    setTimeout(() => {
      // console.log({ cTitle })

      Tone.Transport.stop()

      if (bit !== null) bit.dispose()

      //seq.stop()
      let title = prompt('Please enter title', cTitle)

      stopRecording(firstLetterPup, title)
    }, totalDuration * 1100)
  }
}

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

export async function playPianoNotes(notesArrObj) {
  await Tone.start()

  //polysynth.maxPolyphony = 4

  if (window.outerWidth > 1000) await startRecording()

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
      polysynth.triggerAttackRelease(notes, durations, delay)

    delay += durationToAdd
  }

  if (window.outerWidth > 1000) {
    setTimeout(() => {
      let title = prompt('Please enter title')
      stopRecording('Piano', title)
    }, totalDuration * 1020)
  }
}

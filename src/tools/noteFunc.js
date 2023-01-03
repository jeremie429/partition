import * as Tone from 'tone'

const synth = new Tone.Synth().toDestination()
const amSynth = new Tone.AMSynth().toDestination()
const polysynth = new Tone.PolySynth(Tone.AMSynth).toDestination()

//polysynth.set({ detune: -1200 })

//const newSynth = new Tone.Synth().toDestination()
Tone.Transport.bpm.value = 200

//console.log('Tone Bpm Value', Tone.Transport.bpm)

export async function playOneAudio(audio) {
  await Tone.start()
  try {
    amSynth.triggerAttackRelease(audio, '8n')
  } catch (error) {
    console.log(error)
  }
}
export async function playSnd(arrObj) {
  // console.log({ arrObj })
  await Tone.start()

  if (arrObj.length === 0) return

  let delay = arrObj.length > 100 ? Tone.now() + 0.5 : Tone.now()

  for (let i = 0; i < arrObj.length; i++) {
    const element = arrObj[i]

    let durationToAdd = element.duration

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
      synth.triggerAttackRelease(element.note, durationToAdd, delay)
      amSynth.triggerAttackRelease(element.note, durationToAdd, delay)

      delay += durationToAdd
    }
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

  if (notesArrObj.length === 0) return

  let delay = Tone.now()

  for (let i = 0; i < notesArrObj.length; i++) {
    const element = notesArrObj[i]

    let notes = element.notes
    let durations = element.durations
    let durationToAdd = Math.min(durations) || durations[0]

    polysynth.triggerAttackRelease(notes, durations, delay)

    delay += durationToAdd
  }
}

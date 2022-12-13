import * as Tone from 'tone'

const synth = new Tone.Synth().toDestination()
const amSynth = new Tone.AMSynth().toDestination()

//const newSynth = new Tone.Synth().toDestination()
Tone.Transport.bpm.value = 150

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

  let delay = Tone.now()

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

  //const polysynth = new Tone.PolySynth(Tone.AMSynth).toDestination()

  const sopranoSynth = new Tone.AMSynth().toDestination()
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
  }

  //let notes = []
  /*
  for (let i = 0; i < greatestLength; i++) {
    sopranoObj =
      i < sopranoArr.length && !sopranoObj?.toBeRemovedNext
        ? sopranoArr[i]
        : undefined
    altoObj =
      i < altoArr.length && !altoObj?.toBeRemovedNext ? altoArr[i] : undefined
    bassObj =
      i < bassArr.length && !bassObj?.toBeRemovedNext ? bassArr[i] : undefined
    tenorObj =
      i < tenorArr.length && !tenorObj?.toBeRemovedNext
        ? tenorArr[i]
        : undefined

    console.log({ index: i, sopranoObj, altoObj, bassObj, tenorObj })

    let notes = []
    let durations = []
    let durationsToSort

    if (sopranoObj !== undefined && sopranoObj.duration > 0) {
      durations.push(sopranoObj.duration)

      notes.push(sopranoObj.note)
    }

    if (altoObj !== undefined && altoObj.duration > 0) {
      durations.push(altoObj.duration)
      notes.push(altoObj.note)
    }

    if (tenorObj !== undefined && tenorObj.duration > 0 ) {
      durations.push(tenorObj.duration)
      notes.push(tenorObj.note)
    }

    if (bassObj !== undefined && bassObj.duration > 0) {
      durations.push(bassObj.duration)
      notes.push(bassObj.note)
    }

    durationsToSort = [...durations]

    let minDuration = durationsToSort.sort((a, b) => a - b).shift()

    console.log({ minDuration, durations, durationsToSort, notes })

    polysynth.triggerAttackRelease(notes, durations, time)

    if (sopranoObj !== undefined) {
      durations[0] = durations[0] - minDuration
      durations[0] > 0
        ? (sopranoObj.toBeRemovedNext = true)
        : (sopranoObj.toBeRemovedNext = false)
    }

    if (altoObj !== undefined) {
      durations[1] = durations[1] - minDuration
      durations[1] > 0
        ? (altoObj.toBeRemovedNext = true)
        : (altoObj.toBeRemovedNext = false)
    }

    if (bassObj !== undefined) {
      durations[3] = durations[3] - minDuration
      durations[3] > 0
        ? (bassObj.toBeRemovedNext = true)
        : (bassObj.toBeRemovedNext = false)
    }

    if (tenorObj !== undefined) {
      durations[2] = durations[2] - minDuration
      durations[2] > 0
        ? (tenorObj.toBeRemovedNext = true)
        : (tenorObj.toBeRemovedNext = false)
    }

    time += minDuration
  }*/

  /* const part = new Tone.Part(function (time, note) {
    polysynth.triggerAttackRelease(note.note, note.duration, time)
  }, mainChords).start(0)*/
  /*
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

      delay += durationToAdd
    }
  }*/
}

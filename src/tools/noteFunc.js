import * as Tone from 'tone'
/*function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}*/

const synth = new Tone.Synth().toDestination()
//const newSynth = new Tone.Synth().toDestination()
Tone.Transport.bpm.value = 150

//console.log('Tone Bpm Value', Tone.Transport.bpm)

export async function playOneAudio(audio) {
  await Tone.start()
  try {
    synth.triggerAttackRelease(audio, '8n')
  } catch (error) {
    console.log(error)
  }
}
export async function playSnd(arrObj) {
  // const synth = new Tone.Synth().toDestination()
  //const fmSynth = new Tone.FMSynth().toDestination();

  //const synth = new Tone.Synth().toDestination();
  // trigger the note a half second from now at half velocity
  //let duration = '+' + arrObj[0].duration
  /*let currentTime = Tone.now()

  synth.triggerAttack(arrObj[0].note, currentTime)

  setTimeout(() => {
    synth.triggerRelease()
  }, arrObj[0].duration * 1000)
*/
  // fmSynth.sync();

  await Tone.start()

  let delay = Tone.now()
  /*let currentTime = Tone.now()

  console.log(arrObj[0].note)

  synth.triggerAttack(arrObj[0].note, '+' + currentTime, 0.5)*/

  // synth.triggerRelease(currentTime + durationToTriggered)

  for (let i = 0; i < arrObj.length; i++) {
    const element = arrObj[i]

    let durationToAdd = element.duration

    if (element.isSoupir) {
      delay += durationToAdd
    } else {
      if (element.isLinked) {
        // let durationToTriggered = element.duration + 0.1

        //let currentTime = Tone.now()
        let nextToPlay = arrObj[i + 1]

        if (nextToPlay.note === element.note) {
          durationToAdd += nextToPlay.duration
          i += 1
        }
        /*
        newSynth.triggerAttack(element.note, delay)

        setTimeout(() => {
          newSynth.triggerRelease()
        }, element.duration * 950)*/
      }
      synth.triggerAttackRelease(element.note, durationToAdd, delay)

      delay += durationToAdd
    }
  }
}

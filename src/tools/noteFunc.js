import * as Tone from 'tone'
/*function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}*/

const synth = new Tone.Synth().toDestination()

export async function playOneAudio(audio) {
  try {
    synth.triggerAttackRelease(audio, '8n')
  } catch (error) {
    console.log(error)
  }
}
export async function playSnd(arrObj) {
  // const synth = new Tone.Synth().toDestination()
  //const fmSynth = new Tone.FMSynth().toDestination();
  // fmSynth.sync();

  let delay = Tone.now()

  for (let i = 0; i < arrObj.length; i++) {
    const element = arrObj[i]

    /* fmSynth.triggerAttackRelease(element.note, element.duration, delay);
    delay += element.duration;
    Tone.Transport.start(delay);*/
    if (element.isSoupir) {
      delay += element.duration
    } else {
      synth.triggerAttackRelease(element.note, element.duration, delay)
      delay += element.duration
      /*if (element.isLinked) {
        // schedule 3 notes when the transport first starts
        let secondEl = arrObj[i + 1];
        fmSynth.triggerAttackRelease(element.note, element.duration, delay);
        delay += element.duration;
        fmSynth.triggerAttackRelease(secondEl.note, secondEl.duration, delay);
        delay += secondEl.duration;

        Tone.Transport.start(delay);
        i += 1;
      } else {
        synth.triggerAttackRelease(element.note, element.duration, delay);
        delay += element.duration;
      }*/
    }
  }
}

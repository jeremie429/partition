import * as Tone from "tone";

export function playSnd(arrObj) {
  const synth = new Tone.Synth().toDestination();
  let delay = Tone.now();
  for (let i = 0; i < arrObj.length; i++) {
    const element = arrObj[i];

    synth.triggerAttackRelease(element.note, 5, delay);
    delay += element.duration;
  }
}

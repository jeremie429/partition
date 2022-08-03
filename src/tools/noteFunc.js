import * as Tone from "tone";
/*function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}*/

export async function playSnd(arrObj) {
  const synth = new Tone.Synth().toDestination();

  let delay = Tone.now();

  for (let i = 0; i < arrObj.length; i++) {
    const element = arrObj[i];
    synth.triggerAttackRelease(element.note, element.duration, delay);
    delay += element.duration;
  }
}

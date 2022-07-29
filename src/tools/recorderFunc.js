let chunks = [],
  recorder = null,
  pupitreName,
  titleName;

export async function startRecording() {
  await navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
    recorder = new MediaRecorder(stream);
    recorder.start();
    recorder.addEventListener("dataavailable", (event) => {
      console.log("we are here...", event.data);
      chunks.push(event.data);
    });

    recorder.addEventListener("stop", saveRecord);
  });
}

export function stopRecording(pupitre, title) {
  titleName = title;
  pupitreName = pupitre;
  recorder.stop();
}

export async function saveRecord() {
  //recorder.stop();
  const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });

  chunks = [];
  const url = URL.createObjectURL(blob);

  const audiodiv = document.createElement("audio");
  audiodiv.src = url;
  audiodiv.controls = true;
  audiodiv.play();

  const adiv = document.createElement("a");
  adiv.href = url;
  let suffix = Math.floor(Math.random() * 100000);
  let name = pupitreName + "_" + titleName + "_" + suffix;
  adiv.setAttribute("download", name);
  adiv.click();

  // audio.getTracks().forEach((track) => track.stop());
}

let chunks = [],
  recorder = null,
  pupitreName,
  titleName,
  audio,
  stream,
  mixedStream;

export async function startRecording() {
  try {
    stream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
      audio: true,
    });

    audio = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        sampleRate: 44100,
      },
    });

    if (stream && audio) {
      // console.log("recording ...");

      mixedStream = new MediaStream([
        ...stream.getTracks(),
        ...audio.getTracks(),
      ]);

      recorder = new MediaRecorder(mixedStream);
      recorder.start(200);
      recorder.addEventListener("dataavailable", (event) => {
        //console.log("we are here...", event.data);
        chunks.push(event.data);
      });

      recorder.addEventListener("stop", saveRecord);
    } else {
      console.log("no stream available");
    }
  } catch (error) {
    console.error(error);
  }

  await navigator.mediaDevices
    .getDisplayMedia({ video: true })
    .then((stream) => {
      recorder = new MediaRecorder(stream);
      recorder.start();
      recorder.addEventListener("dataavailable", (event) => {
        //console.log("we are here...", event.data);
        chunks.push(event.data);
      });

      recorder.addEventListener("stop", saveRecord);
    });
}

export function stopRecording(pupitre, title) {
  titleName = title;
  pupitreName = pupitre;
  recorder.stop();
  //console.log("stop recording");
}

export async function saveRecord() {
  //recorder.stop();

  try {
    const blob = new Blob(chunks, { type: "video/mp4" });

    chunks = [];
    const url = URL.createObjectURL(blob);

    stream.getTracks().forEach((track) => track.stop());
    audio.getTracks().forEach((track) => track.stop());

    const adiv = document.createElement("a");
    adiv.href = url;
    let suffix = Math.floor(Math.random() * 100000);
    let name = pupitreName + "_" + titleName + "_" + suffix;
    adiv.setAttribute("download", name + ".mp4");
    adiv.click();
  } catch (error) {
    console.log("error occured", error);
  }

  // audio.getTracks().forEach((track) => track.stop());
}

/*
let chunks = [],
  recorder = null,
  pupitreName,
  titleName;

export async function startRecording() {
  await navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
    recorder = new MediaRecorder(stream);
    recorder.start();
    recorder.addEventListener("dataavailable", (event) => {
      //console.log("we are here...", event.data);
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
*/

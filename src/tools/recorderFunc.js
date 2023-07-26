let chunks = [],
  recorder = null,
  pupitreName,
  titleName,
  // audio,
  stream
// mixedStream

export async function startRecording() {
  try {
    stream = await navigator.mediaDevices.getDisplayMedia({
      video: {
        mediaSource: 'screen',
      },
      audio: true,
      //audio: true,
    })

    recorder = new MediaRecorder(stream)
    recorder.start(200)
    recorder.addEventListener('dataavailable', async (event) => {
      //console.log('we are here...', event.data)

      chunks.push(event.data)
    })

    recorder.addEventListener('stop', saveRecord)
  } catch (error) {
    console.error({ error })
  }

  /* try {
    await navigator.mediaDevices
      .getDisplayMedia({ video: true })
      .then((stream) => {
        recorder = new MediaRecorder(stream)
        recorder.start()
        recorder.addEventListener('dataavailable', (event) => {
          console.log('we are here...', event.data)
          chunks.push(event.data)
        })

        recorder.addEventListener('stop', saveRecord)
      })
  } catch (error) {
    console.error({ error })
  }*/
}

export async function stopRecording(pupitre, title) {
  titleName = title
  pupitreName = pupitre
  try {
    await recorder.stop()
  } catch (error) {
    console.error({ error })
  }

  //console.log("stop recording");
}

export async function saveRecord() {
  //recorder.stop();

  try {
    //const blob = new Blob(chunks, { type: 'video/mp4' })
    const blob = new Blob(chunks, { type: 'video/x-matroska;codecs=avc1,opus' })

    chunks = []
    const url = URL.createObjectURL(blob)
    //console.log(stream)

    stream.getTracks().forEach(async (track) => await track.stop())
    //audio.getTracks().forEach(async (track) => await track.stop())

    const adiv = document.createElement('a')
    adiv.href = url
    let suffix = Math.floor(Math.random() * 100000)
    let name = pupitreName + '_' + titleName + '_' + suffix
    adiv.setAttribute('download', name + '.mp4')
    adiv.click()
  } catch (error) {
    console.log('error occured', error)
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

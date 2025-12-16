console.log("ui-shutter.js loaded");

// ===============================
// 要素取得
// ===============================
const shutterBtn = document.getElementById("btn-shutter");
const uiLayer = document.getElementById("ui-layer");
const scene = document.querySelector("a-scene");

// ===============================
// ユーティリティ
// ===============================
function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function waitForVideo() {
  return new Promise(resolve => {
    const check = () => {
      const video = document.querySelector("video");
      if (video && video.videoWidth > 0 && video.videoHeight > 0) {
        resolve(video);
      } else {
        requestAnimationFrame(check);
      }
    };
    check();
  });
}

function waitForRenderer(scene) {
  return new Promise(resolve => {
    const check = () => {
      if (scene.renderer && scene.renderer.domElement) {
        resolve();
      } else {
        requestAnimationFrame(check);
      }
    };
    check();
  });
}

function downloadImage(dataUrl) {
  const a = document.createElement("a");
  a.href = dataUrl;
  a.download = "ar_photo.png";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

// ===============================
// シャッター処理
// ===============================
shutterBtn.addEventListener("click", async () => {

  uiLayer.style.display = "none";

  const video = await waitForVideo();
  await waitForRenderer(scene);

  const bgCanvas = document.createElement("canvas");
  bgCanvas.width  = video.videoWidth;
  bgCanvas.height = video.videoHeight;

  const bgCtx = bgCanvas.getContext("2d");
  bgCtx.drawImage(video, 0, 0, bgCanvas.width, bgCanvas.height);

  await new Promise(r => requestAnimationFrame(r));
  await new Promise(r => requestAnimationFrame(r));

  const threeCanvas = scene.renderer.domElement;
  const threeImage = new Image();
  threeImage.src = threeCanvas.toDataURL("image/png");

  threeImage.onload = () => {

    const resultCanvas = document.createElement("canvas");
    resultCanvas.width  = bgCanvas.width;
    resultCanvas.height = bgCanvas.height;

    const ctx = resultCanvas.getContext("2d");
    ctx.drawImage(bgCanvas, 0, 0);

    const bw = bgCanvas.width;
    const bh = bgCanvas.height;
    const tw = threeImage.width;
    const th = threeImage.height;

    const bgRatio = bw / bh;
    const threeRatio = tw / th;

    let sx, sy, sw, sh;

    if (threeRatio > bgRatio) {
      sh = th;
      sw = th * bgRatio;
      sx = (tw - sw) / 2;
      sy = 0;
    } else {
      sw = tw;
      sh = tw / bgRatio;
      sx = 0;
      sy = (th - sh) / 2;
    }

    ctx.drawImage(
      threeImage,
      sx, sy, sw, sh,
      0, 0, bw, bh
    );

    downloadImage(resultCanvas.toDataURL("image/png"));
    uiLayer.style.display = "block";
  };
});

window.addEventListener("load", () => {

  console.log("ui-shutter.js loaded");

  const shutterBtn = document.getElementById("btn-shutter");
  const uiLayer = document.getElementById("ui-layer");
  const scene = document.querySelector("a-scene");

  console.log("shutterBtn:", shutterBtn);
  console.log("uiLayer:", uiLayer);
  console.log("scene:", scene);

  if (!shutterBtn || !uiLayer || !scene) {
    console.error("required elements not found");
    return;
  }

  shutterBtn.addEventListener("click", async () => {
    console.log("shutter clicked");

    uiLayer.style.display = "none";

    await new Promise(r => setTimeout(r, 100));

    uiLayer.style.display = "block";
  });

});
;

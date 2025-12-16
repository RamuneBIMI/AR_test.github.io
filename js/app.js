const arModel = document.getElementById("arModel");
const scaleSlider = document.getElementById("scaleSlider");
const rotationSlider = document.getElementById("rotationSlider");

/* サイズ */
scaleSlider.addEventListener("input", () => {
  const s = scaleSlider.value;
  arModel.setAttribute("scale", `${s} ${s} ${s}`);
});

/* 回転 */
rotationSlider.addEventListener("input", () => {
  const r = rotationSlider.value;
  arModel.setAttribute("rotation", `0 ${r} 0`);
});


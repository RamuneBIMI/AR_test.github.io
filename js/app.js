window.addEventListener("load", () => {
  const select = document.getElementById("modelSelect");
  const upload = document.getElementById("upload");
  const arModel = document.getElementById("arModel");
  const scaleSlider = document.getElementById("scaleSlider");
  const rotationSlider = document.getElementById("rotationSlider");

  console.log("app.js loaded"); // ←確認用

  select.addEventListener("change", () => {
    arModel.setAttribute("gltf-model", select.value);
  });

  scaleSlider.addEventListener("input", () => {
    console.log("SCALE:", scaleSlider.value);
    const s = scaleSlider.value;
    arModel.setAttribute("scale", `${s} ${s} ${s}`);
  });

  rotationSlider.addEventListener("input", () => {
    console.log("ROT:", rotationSlider.value);
    arModel.setAttribute("rotation", `0 ${rotationSlider.value} 0`);
  });

  upload.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    const option = document.createElement("option");
    option.value = url;
    option.textContent = file.name;
    select.appendChild(option);

    select.value = url;
    arModel.setAttribute("gltf-model", url);
  });
});


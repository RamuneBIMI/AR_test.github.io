window.addEventListener("load", () => {
  const arModel = document.getElementById("arModel");

  const modelSelect = document.getElementById("modelSelect");
  const upload = document.getElementById("upload");

  const scaleSlider = document.getElementById("scaleSlider");
  const rotXSlider = document.getElementById("rotX");
  const rotZSlider = document.getElementById("rotZ");

  console.log("app.js loaded");

  /* ===== 状態保持 ===== */
  let scale = 0.7;
  let rotX = 0;
  let rotZ = 0;

  /* ===== 共通更新 ===== */
  function updateTransform() {
    arModel.setAttribute("scale", `${scale} ${scale} ${scale}`);
    arModel.setAttribute("rotation", `${rotX} 0 ${rotZ}`);
  }

  /* ===== サイズ ===== */
  scaleSlider.addEventListener("input", () => {
    scale = scaleSlider.value;
    updateTransform();
  });

  /* ===== 回転 ===== */
  rotXSlider.addEventListener("input", () => {
    rotX = rotXSlider.value;
    updateTransform();
  });

  rotZSlider.addEventListener("input", () => {
    rotZ = rotZSlider.value;
    updateTransform();
  });

  /* ===== モデル選択 ===== */
  modelSelect.addEventListener("change", () => {
    arModel.setAttribute("gltf-model", modelSelect.value);
  });

  /* ===== アップロード ===== */
  upload.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const url = URL.createObjectURL(file);

    const option = document.createElement("option");
    option.value = url;
    option.textContent = file.name;
    modelSelect.appendChild(option);

    modelSelect.value = url;
    arModel.setAttribute("gltf-model", url);
  });

  /* 初期反映 */
  updateTransform();
});

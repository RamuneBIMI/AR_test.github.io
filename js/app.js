window.addEventListener("load", () => {
  const arModel = document.getElementById("arModel");

  const modelSelect = document.getElementById("modelSelect");
  const upload = document.getElementById("upload");

  const scaleSlider = document.getElementById("scaleSlider");
  const rotXSlider = document.getElementById("rotX");
  const rotZSlider = document.getElementById("rotZ");

  console.log("app.js loaded");

  // nullチェック（超重要）
  if (!arModel || !scaleSlider || !rotXSlider || !rotZSlider) {
    console.error("UI element missing", {
      arModel, scaleSlider, rotXSlider, rotZSlider
    });
    return;
  }

  let scale = 0.7;
  let rotX = 0;
  let rotZ = 0;

  function updateTransform() {
    console.log("update", scale, rotX, rotZ);
    arModel.setAttribute("scale", `${scale} ${scale} ${scale}`);
    arModel.setAttribute("rotation", `${rotX} 0 ${rotZ}`);
  }

  scaleSlider.addEventListener("input", () => {
    scale = scaleSlider.value;
    updateTransform();
  });

  rotXSlider.addEventListener("input", () => {
    rotX = rotXSlider.value;
    updateTransform();
  });

  rotZSlider.addEventListener("input", () => {
    rotZ = rotZSlider.value;
    updateTransform();
  });

  modelSelect.addEventListener("change", () => {
    arModel.setAttribute("gltf-model", modelSelect.value);
  });

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

  updateTransform();
});


<script>
const arModel = document.getElementById("arModel");
const scaleSlider = document.getElementById("scaleSlider");
const rotationSlider = document.getElementById("rotationSlider");
const modelSelect = document.getElementById("modelSelect");
const upload = document.getElementById("upload");

/* サイズ変更 */
scaleSlider.addEventListener("input", () => {
  const s = scaleSlider.value;
  arModel.setAttribute("scale", `${s} ${s} ${s}`);
});

/* 回転（Y軸） */
rotationSlider.addEventListener("input", () => {
  const r = rotationSlider.value;
  arModel.setAttribute("rotation", `0 ${r} 0`);
});

/* モデル選択 */
modelSelect.addEventListener("change", () => {
  arModel.setAttribute("gltf-model", modelSelect.value);
});

/* アップロード */
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
</script>

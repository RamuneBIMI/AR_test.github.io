<script>
  const select = document.getElementById("modelSelect");
  const upload = document.getElementById("upload");
  const arModel = document.getElementById("arModel");
  const scaleSlider = document.getElementById("scaleSlider");
  const rotationSlider = document.getElementById("rotationSlider");

  /* モデル選択 */
  select.addEventListener("change", () => {
    arModel.setAttribute("gltf-model", select.value);
  });

  /* サイズ変更 */
  scaleSlider.addEventListener("input", () => {
　　console.log("scale slider moved", scaleSlider.value);
    const s = scaleSlider.value;
    arModel.setAttribute("scale", `${s} ${s} ${s}`);
  });

  /* 回転（Y軸） */
  rotationSlider.addEventListener("input", () => {
    const r = rotationSlider.value;
    arModel.setAttribute("rotation", `0 ${r} 0`);
  });

  /* アップロード */
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

　　
</script>

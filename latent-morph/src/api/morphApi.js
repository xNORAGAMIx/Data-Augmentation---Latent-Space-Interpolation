export const generateMorph = async ({ imgA, imgB, steps, selectedModel }) => {
  const formData = new FormData();

  formData.append("imgA", imgA);
  formData.append("imgB", imgB);
  formData.append("steps", steps);
  formData.append("model_name", selectedModel);
  formData.append("return_frames", true);

  const res = await fetch("http://127.0.0.1:8000/morph", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();

  return {
    gif: data.gif,
    frames: data.frames.map(
      (f) => `data:image/png;base64,${f}`
    ),
  };
};
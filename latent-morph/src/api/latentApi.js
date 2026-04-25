export const decodeLatent = async (z) => {
  const res = await fetch("http://127.0.0.1:8000/decode", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ z }),
  });

  const data = await res.json();

  return `data:image/png;base64,${data.image}`;
};
async function handleUpload(e) {
  const file = e.target.files[0];
  const base64 = await toBase64(file);

  const res = await fetch("/api/upload", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ file: base64 }),
  });

  const data = await res.json();
  console.log("Uploaded image:", data.url);
}

// helper
const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

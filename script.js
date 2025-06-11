document.getElementById('uploadForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);

  const res = await fetch('/convert', {
    method: 'POST',
    body: formData
  });

  if (res.ok) {
    const blob = await res.blob();
    const extension = formData.get('targetFormat');
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `archivo_convertido.${extension}`;
    a.click();
  } else {
    alert('Error al convertir el archivo');
  }
});

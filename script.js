import { loadSpinner, showSpinner, hideSpinner } from '/components/spinner.component.js';

document.addEventListener('DOMContentLoaded', async () =>
{
  await loadSpinner('#spinner-placeholder');
});

document.getElementById('convert-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    showSpinner();
  
    const fileInput = document.getElementById('imageInput');
    const format = document.getElementById('formatSelect').value;
    const formData = new FormData();
    formData.append('image', fileInput.files[0]);
  
    const res = await fetch(`https://image-converter-backend-i6ei.onrender.com/convert?format=${format}`, {  //http://localhost:5000/convert?format=${format} for offline test
      method: 'POST',
      body: formData
    });
  
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
  
    const a = document.createElement('a');
    a.href = url;
    a.download = `converted.${format}`;
    a.click();
    hideSpinner();
  });
  

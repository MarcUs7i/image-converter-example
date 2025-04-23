console.log('script loaded');
document.getElementById('convertForm').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const fileInput = document.getElementById('imageInput');
    const format = document.getElementById('formatSelect').value;
    const formData = new FormData();
    formData.append('image', fileInput.files[0]);
  
    const res = await fetch(`https://image-converter-backend.onrender.com/convert?format=${format}`, {
      method: 'POST',
      body: formData
    });
  
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
  
    const a = document.createElement('a');
    a.href = url;
    a.download = `converted.${format}`;
    a.click();
  });
  
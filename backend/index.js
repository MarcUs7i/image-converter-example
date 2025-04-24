const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const cors = require('cors');
const fs = require('fs');

const app = express();
//file size limit (10 MB)
const upload = multer({
  dest: 'uploads/',
  limits: { fileSize: 10 * 1024 * 1024 } // 10 MB
});

app.use(cors({
  origin: ['https://balota-natan-utcn.github.io'],
}));

app.use((err, req, res, next) => {
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(413).send('File is too large. Max 15MB allowed.');
  }
  next(err);
});

app.post('/convert', upload.single('image'), async (req, res) => {
  const format = req.query.format || 'png';

  if (!req.file)
  {
    return res.status(400).send('No file uploaded or file too large.');
  }
  
  const inputPath = req.file.path;
  const outputPath = `${inputPath}.${format}`;

  try {
    await sharp(inputPath).toFormat(format).toFile(outputPath);
    res.download(outputPath, `converted.${format}`, () => {
      fs.unlinkSync(inputPath);
      fs.unlinkSync(outputPath);
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Conversion failed');
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

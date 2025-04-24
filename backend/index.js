const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const cors = require('cors');
const fs = require('fs');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(cors({
  origin: ['https://balota-natan-utcn.github.io'],
}));

app.post('/convert', upload.single('image'), async (req, res) => {
  const format = req.query.format || 'png';
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

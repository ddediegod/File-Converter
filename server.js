const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

const upload = multer({ dest: 'uploads/' });

app.use(cors());
app.use(express.static('public'));
app.use(express.static('.'));

// Ruta para conversión
app.post('/convert', upload.single('zipFile'), (req, res) => {
  const format = req.body.targetFormat;
  const originalPath = req.file.path;
  const newFilename = `archivo_convertido.${format}`;
  const newPath = path.join('uploads', newFilename);

  fs.rename(originalPath, newPath, (err) => {
    if (err) return res.status(500).send('Error al renombrar archivo');

    res.download(newPath, newFilename, (err) => {
      if (err) console.error(err);
      fs.unlink(newPath, () => {}); // Limpia el archivo después
    });
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

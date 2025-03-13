const express = require('express');
const cors = require('cors');

const port = process.env.PORT || 3000;


const path = require('path');
const app = express();

app.use(cors());

// Configura el endpoint para servir el archivo JSON
app.get('/api/partidos', (req, res) => {
  // Asegúrate de que el archivo esté en el lugar correcto
  res.sendFile(path.join(__dirname, 'partidos.json'));
});

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
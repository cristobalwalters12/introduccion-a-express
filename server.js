const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cors());

app.post('/canciones', (req, res) => {
  
    const nuevaCancion = req.body;
    const repertorio = JSON.parse(fs.readFileSync('data/repertorio.json', 'utf-8'));
    repertorio.push(nuevaCancion);
    fs.writeFileSync('data/repertorio.json', JSON.stringify(repertorio));
    res.json(repertorio);
});

app.get('/canciones', (req, res) => {
    const repertorio = JSON.parse(fs.readFileSync('data/repertorio.json', 'utf-8'));
    res.json(repertorio);
});

app.put('/canciones/:id', (req, res) => {
    const cancionId = Number(req.params.id);
    const datosActualizados = req.body;
    let repertorio = JSON.parse(fs.readFileSync('data/repertorio.json', 'utf-8'));
    repertorio = repertorio.map(cancion => {
        if (cancion.id === cancionId) {
            return { ...cancion, ...datosActualizados, id: cancionId }
        } else {
            return cancion;
        }
    });
    fs.writeFileSync('data/repertorio.json', JSON.stringify(repertorio));
    res.json(repertorio);
});

app.delete('/canciones/:id', (req, res) => {
    const cancionId = Number(req.params.id);
    let repertorio = JSON.parse(fs.readFileSync('data/repertorio.json', 'utf-8'));
    repertorio = repertorio.filter(cancion => cancion.id !== cancionId);
    fs.writeFileSync('data/repertorio.json', JSON.stringify(repertorio));
    res.json(repertorio);
});

app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});

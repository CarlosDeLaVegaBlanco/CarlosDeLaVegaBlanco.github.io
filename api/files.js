const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

// Servir archivos estáticos desde la carpeta "static"
app.use('/static', express.static(path.join(__dirname, '../static')));

// Servir archivos estáticos desde la carpeta "assets"
app.use('/assets', express.static(path.join(__dirname, '../assets')));

// Endpoint para listar los archivos en la carpeta "static"
app.get('/api/files', (req, res) => {
    const staticFolder = path.join(__dirname, '../static');
    fs.readdir(staticFolder, (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'No se pudo leer la carpeta' });
        }
        // Filtrar solo archivos de imagen
        const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));
        res.json(imageFiles);
    });
});

// Servir el archivo index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

module.exports = app;

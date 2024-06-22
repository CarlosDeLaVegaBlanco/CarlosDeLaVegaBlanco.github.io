const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

// Servir archivos estáticos desde la carpeta "static"
app.use('/static', express.static(path.join(__dirname, '../static')));

// Servir archivos estáticos desde la carpeta "assets"
app.use('/assets', express.static(path.join(__dirname, '../public/assets')));

// Endpoint para listar los archivos en la carpeta "static"
app.get('/api/files', (req, res) => {
    const staticFolder = path.join(__dirname, '../static');
    fs.readdir(staticFolder, (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'No se pudo leer la carpeta' });
        }
        // Filtrar solo archivos de imagen y excluir los archivos de resultado
        const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file) && !file.startsWith('result_'));
        res.json(imageFiles);
    });
});

// Endpoint para servir el archivo JSON
app.get('/api/data/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, '../static', filename);

    fs.readFile(filePath, (err, data) => {
        if (err) {
            return res.status(404).json({ error: 'Archivo no encontrado' });
        }
        res.json(JSON.parse(data));
    });
});

// Servir el archivo index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

module.exports = app;

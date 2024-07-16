const express = require('express');
const multer = require('multer');
const uuid = require('uuid').v4;
const path = require('path');

const app = express();

// Configuration de Multer pour stocker les fichiers
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Le dossier où les images seront stockées
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${uuid()}${ext}`); // Nom de fichier unique
  }
});

const upload = multer({ storage });

// Middleware pour gérer les formulaires JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware pour servir les fichiers statiques
app.use('/uploads', express.static('uploads'));

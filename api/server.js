const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Configuration MySQL
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

require('dotenv').config();
console.log('DB_USER:', process.env.DB_USER); // Debug pour voir si l'utilisateur est bien défini
console.log('DB_PASSWORD:', process.env.DB_PASSWORD ? '******' : '(vide)');
console.log('DB_NAME:', process.env.DB_NAME);

// Test de la connexion à la base de données
db.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à la base de données:', err);
        return;
    }
    console.log('Connecté à la base de données MySQL');
});

// Route de login (à mettre en premier)
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    console.log('Tentative de connexion:', username); // Debug

    try {
        db.query('SELECT * FROM admins WHERE username = ?', [username], async (err, results) => {
            if (err) {
                console.error('Erreur SQL:', err);
                res.status(500).json({ error: err.message });
                return;
            }
            
            console.log('Résultats de la requête:', results); // Debug
            
            if (results.length === 0) {
                res.status(401).json({ error: 'Identifiants incorrects' });
                return;
            }

            const admin = results[0];
            // Pour le moment, comparaison directe car le mot de passe n'est pas hashé
            if (password === admin.password) {
                const token = jwt.sign(
                    { id: admin.id, username: admin.username },
                    process.env.JWT_SECRET,
                    { expiresIn: '24h' }
                );

                // Mettre à jour la dernière connexion
                db.query('UPDATE admins SET last_login = NOW() WHERE id = ?', [admin.id]);

                res.json({ token });
            } else {
                res.status(401).json({ error: 'Identifiants incorrects' });
            }
        });
    } catch (error) {
        console.error('Erreur:', error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// Routes pour les formations
app.get('/api/formations', (req, res) => {
    db.query('SELECT * FROM formations', (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(results);
    });
});

app.post('/api/formations', (req, res) => {
    const { title, school, date, description } = req.body;
    db.query(
        'INSERT INTO formations (title, school, date, description) VALUES (?, ?, ?, ?)',
        [title, school, date, description],
        (err, result) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json({ id: result.insertId, ...req.body });
        }
    );
});

app.put('/api/formations/:id', (req, res) => {
    const { title, school, date, description } = req.body;
    db.query(
        'UPDATE formations SET title=?, school=?, date=?, description=? WHERE id=?',
        [title, school, date, description, req.params.id],
        (err) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json({ id: req.params.id, ...req.body });
        }
    );
});

app.delete('/api/formations/:id', (req, res) => {
    db.query('DELETE FROM formations WHERE id=?', [req.params.id], (err) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Formation supprimée' });
    });
});

// Routes similaires pour les expériences
app.get('/api/experiences', (req, res) => {
    db.query('SELECT * FROM experiences', (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(results);
    });
});

// ... autres routes pour experiences, projets, etc.

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
}); 
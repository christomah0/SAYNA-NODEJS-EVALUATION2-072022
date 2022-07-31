// importe module express
const express = require('express');
const path = require('path');
const cors = require('cors');
const api = require('./database/api');

const app = express();

// port utilisé pour l'écoute
const PORT = process.env.PORT || 3000;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: 'http://localhost/api/form' }));
app.use(express.static(path.join(__dirname, 'public')));

// obtient le chemin vers index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// obtient chemin vers backend.html
app.get('/backend', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'backend.html'));
});

// obtient chemin vers frontend.html
app.get('/frontend', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'frontend.html'));
});

// obtient chemin vers marketing.html
app.get('/marketingDigital', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'marketing.html'));
});

// obtient chemin vers uxui.html
app.get('/uxui', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'uxui.html'));
});

// obtient chemin vers frontend.html
app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});

// obtient chemin vers signup.html
app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});

/***********************************/
// route qui gère à obtenir les données pour être envoyé dans l'interface client
app.get('/api/rankByOrder', (req, res) => {
    api.getRankByOrderDesc(req, res);
});

app.get('/api/backendOp', (req, res) => {
    api.getBackendData(req, res);
});

app.get('/api/frontendOp', (req, res) => {
    api.getFrontendData(req, res);
});

app.get('/api/marketingOp', (req, res) => {
    api.getMarketingData(req, res);
});

app.get('/api/uxuiOp', (req, res) => {
    api.getUXUIData(req, res);
});
/***********************************/

// poste les informations réçu par visiteur
app.post('/api/form', (req, res) => {
    const visitor = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        avis: req.body.avis,
        note: req.body.note,
        formation: req.body.formation
    };

    // insère des données dans la base de donnée
    api.postData(
        visitor.firstname,
        visitor.lastname,
        visitor.avis,
        parseInt(visitor.note),
        visitor.formation
    );
});

/**
 * middleware qui gère à vérifier la présence des routes
 * et retourne '404 Not Found' si route n'est pas défini **/
app.use((req, res, next) => {
    res.status(404);
    if (req.accepts('html')) {
        res.send(api.template_html());
        return;
    }
});

// app écoute sur le port spécifié
app.listen(PORT, () => {console.log('[+] Listening on port: ', PORT, '...')});

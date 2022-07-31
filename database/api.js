// importe module
const mysql = require('mysql');

// initialise la connection entre server et base de donnée
const database = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'd_clic'
});

// essaie de connecter avec la base de donnée
database.connect((error) => {
    if (error) throw error;
    console.log('[+] Database connected...');
});

// fonction qui accomplie l'ajout des données dans la base de donnée
function postData(firstname, lastname, avis, note, formation) {
    let newPost = {
        firstname,
        lastname,
        avis,
        note,
        formation
    };

    database.query('INSERT INTO contact SET ?', newPost, (error, result) => {
        if (error) throw error;
        console.log('[+] Values inserted...');
    });
}

/**
 * fonctions qui assurent l'obtention des données concernant utilisateurs
 * dans la base de donnée pour chaque branche **/

// collècte utilisateurs et leurs note en ordre décroissant 
function getRankByOrderDesc(req, res) {
    database.query('SELECT * FROM contact order by note desc', (error, result) => {
        if (error) throw error;
        res.json(result);
        console.log('\n[+] Order by note succedded...');
    });
}

// collècte opinion backend
function getBackendData(req, res) {
    database.query('SELECT * FROM contact WHERE formation=\"Backend\"', (error, result) => {
        if (error) throw error;
        res.json(result);
        console.log('[+] Backend opinion collected...');
    });
}

// collècte opinion frontend
function getFrontendData(req, res) {
    database.query('SELECT * FROM contact WHERE formation=\"Frontend\"', (error, result) => {
        if (error) throw error;
        res.json(result);
        console.log('[+] Frontend opinion collected...');
    });
}

// collècte opinion marketing
function getMarketingData(req, res) {
    database.query('SELECT * FROM contact WHERE formation=\"Marketing-Digital\"', (error, result) => {
        if (error) throw error;
        res.json(result);
        console.log('[+] Marketing-Digital opinion collected...');
    });
}

// collècte opinion uxui
function getUXUIData(req, res) {
    database.query('SELECT * FROM contact WHERE formation=\"UX-UI\"', (error, result) => {
        if (error) throw error;
        res.json(result);
        console.log('[+] UX\\UI opinion collected...');
    });
}

// retourne template html
function template_html() {
    return (`
        <!DOCTYPE html>
        <html lang="fr">
            <head>
                <meta charset="utf-8">
                <meta name="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title> 404 </title>
                <style>
                    div {
                        display: flex ;
                        margin-top: 2rem; 
                        flex-direction: column;
                        justify-content: center;
                        align-content: center;
                    }
                    #status-code {
                        font-size: 4em;
                        text-align: center;
                    }
                    #status-text {
                        font-size: 1.5em;
                        text-align: center;
                    }
                    span {
                        border-right: 2px solid #000000;
                        border-left: 2px solid #000000;
                    }
                </style>
            </head>

            <body>
                <div>
                    <span id="status-code">404</span>
                    <span id="status-text">Not found</span>
                </div>
            </body>
        </html>
    `);
}

// exporte la fonction postData
module.exports = {
    postData,
    getRankByOrderDesc,
    getBackendData,
    getFrontendData,
    getMarketingData,
    getUXUIData,
    template_html
};

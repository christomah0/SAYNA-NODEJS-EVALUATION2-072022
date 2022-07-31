// id formulaire
const myForm = document.getElementById('myForm');

//  collècte informations venant de toutes catégories
// en ordre décroissant en fontion de leurs note
$.ajax({
    url: '/api/rankByOrder',
    method: 'GET',
    dataType: 'json',
    success: function(data, status, jqXhr) {
        data.forEach((item) => {
            $('.visitorRank').append(`
                <li class="opinion">
                    <p class="myname"> - ${item.firstname} ${item.lastname} - </p>
                    <p class="myop">#Note: ${item.note}</p>
                </li>
            `);
        });
    },
    error: function (jqXhr, textStatus, errorMessage) { 
        $('p').append('Error: ' + errorMessage);
    }
});

// collècte informations venant de catégorie backend
$.ajax({
    url: '/api/backendOp',
    method: 'GET',
    dataType: 'json',
    success: function (data, status, jqXhr) {
        data.forEach((item) => {
            $('.avis-backend').append(`
                <li class="opinion">
                    <p class="myname"> - ${item.firstname} - </p>
                    <p class="myop">Avis: "${item.avis}"</p>
                </li>
            `);
        });
    },
    error: function (jqXhr, textStatus, errorMessage) { 
        $('p').append('Error: ' + errorMessage);
    }
});

// collècte informations venant de catégorie frontend
$.ajax({
    url: '/api/frontendOp',
    method: 'GET',
    dataType: 'json',
    success: function (data, status, jqXhr) {
        data.forEach((item) => {
            $('.avis-frontend').append(`
                <li class="opinion">
                    <p class="myname"> - ${item.firstname} - </p>
                    <p class="myop">Avis: "${item.avis}"</p>
                </li>
            `);
        });
    },
    error: function (jqXhr, textStatus, errorMessage) { 
        $('p').append('Error: ' + errorMessage);
    }   
});

// collècte informations venant de catégorie marketing
$.ajax({
    url: '/api/marketingOp',
    method: 'GET',
    dataType: 'json',
    success: function (data, status, jqXhr) {
        data.forEach((item) => {
            $('.avis-marketing').append(`
                <li class="opinion">
                    <p class="myname"> - ${item.firstname} - </p>
                    <p class="myop">Avis: "${item.avis}"</p>
                </li>
            `);
        });
    },
    error: function (jqXhr, textStatus, errorMessage) { 
        $('p').append('Error: ' + errorMessage);
    }
});

// collècte informations venant de catégorie uxui
$.ajax({
    url: '/api/uxuiOp',
    method: 'GET',
    dataType: 'json',
    success: function (data, status, jqXhr) {
        data.forEach((item) => {
            $('.avis-uxui').append(`
                <li class="opinion">
                    <p class="myname"> - ${item.firstname} - </p>
                    <p class="myop">Avis: "${item.avis}"</p>
                </li>
            `);
        });
    },
    error: function (jqXhr, textStatus, errorMessage) { 
        $('p').append('Error: ' + errorMessage);
    }
});

// déclenche l'évènement de soumission des informations
myForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // crée une instance de XMLHttpRequest() dans l'objet xhr
    const xhr = new XMLHttpRequest();
    let form_data = new FormData(myForm);

    if (checkData(form_data)) {
        xhr.open('POST', 'http://localhost:3000/api/form', true);
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                console.log('[+] Connection established...');
            }
            else {
                return new Error('[!] Error connection...');
            }
        };
        xhr.send(convToJson(form_data)); // envoie les données
    }
});

// fonction pour convertir des données en format JSON 
function convToJson(_form_data) {
    let _obj = {};
    for (const item of _form_data.keys()) {
        _obj[item] = _form_data.get(item);
    }
    return JSON.stringify(_obj, null, 2);
}

// function pour vérifier si les champs ne sont pas rempli
function checkData(_form_data) {
    let _obj = {};
    for (const item of _form_data.keys()) {
        _obj[item] = _form_data.get(item);
    }
    if (_obj.firstname !== '' && _obj.lastname !== '' && _obj.avis !== '' && _obj.note != NaN) {
        return true
    }
    return false;
}
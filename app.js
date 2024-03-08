const form = document.querySelector('#form'); // prends tout le formulaire
const tableBody = document.querySelector('tbody'); // prends le corps du tableau
const content = document.querySelector('#newContent'); // sélectionne l'input pour ajouter un élément

newEvent()

function newEvent() {
form.addEventListener('submit', addContent);
}

//Ajout de l'event
function addContent(event){
if (content.value === '')
    alert ('Ajouter un élément')

// ajouter une ligne à la table 
const tr = document.createElement('tr');

//création des td
const tdCheckbox = document.createElement('td');
const tdBadgeText = document.createElement('td');
const tdText = document.createElement('td');
const tdBtnDelete = document.createElement('td');

//élément du checkbox
const checkbox = document.createElement('input');
checkbox.type = 'checkbox';
checkbox.classList = ('form-check-input', 'form-check-input-lg');
checkbox.style.width = '2em';
checkbox.style.height = '2em';

//élément du badge 
const badge = document.createElement('')


    event.preventDefault()
}

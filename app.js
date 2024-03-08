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
checkbox.classList.add = ('form-check-input', 'form-check-input-lg');
checkbox.type = 'checkbox';
checkbox.style.width = '2em';
checkbox.style.height = '2em';

//élément du badge 
const badge = document.createElement('span');
badge.classList.add = ('badge', 'bg-primary');

//élement du petit texte
const smallText = createElement('small');
smallText.classList.add = ('form-text', 'text-muted');

//élement de l'input texte readonly
const text = createElement('input');
text.type = 'text';
text.classList.add = ('form-control', 'formList');

//élement du bouton Effacer
const btnDelete = createElement('button');
btnDelete.type = 'submit';
btnDelete.classList.add = ('btn', 'btn-danger');

//placer le bouton effacer à la fin 
tdBtnDelete.className = 'text-end';

//relier les éléments au td
tdCheckbox.appendChild(checkbox);
tdBadgeText.appenchild(badge);
tdBadgeText.appenchild(smallText);
tdText.appendChild(text);
tdBtnDelete.appenchild(btnDelete);

//relier les éléments au tr
tr.appendChild(checkbox);
tr.appendChild(badge);
tr.appendChild(smallText);
tr.appendChild(text);
tr.appendChild(btnDelete);
tableBody.appendChild(tr);

    event.preventDefault()
}

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
    event.preventDefault()
}

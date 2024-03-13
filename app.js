const form = document.querySelector('#form'); // prends tout le formulaire
const tableBody = document.querySelector('tbody'); // prends le corps du tableau
const content = document.querySelector('#newContent'); // sélectionne l'input pour ajouter un élément
const filter = document.querySelector('#filter'); // sélectionne l'id de l'input pour filtrer 

newEvent()

function newEvent() {
    form.addEventListener('submit', addContent);

    // filtrer la liste
    filter.addEventListener('keyup', filterList);

    // supprimer une tâche
    tableBody.addEventListener('click', deleteBtn);
};

// Ajout de l'event
function addContent(event) {
    if (content.value === '')
        alert('Ajouter un élément')

    // récupérer la priorité
    const priority = document.querySelector('#priority').value;

    // récupérer la date
    const date = document.querySelector('#date').value;



    // ajouter une ligne à la table 
    const tr = document.createElement('tr');

    // création des td
    const tdCheckbox = document.createElement('td');
    const tdBadgeText = document.createElement('td');
    const tdText = document.createElement('td');
    const tdBtnDelete = document.createElement('td');

    // élément du checkbox
    const checkbox = document.createElement('input');
    checkbox.classList.add('form-check-input', 'form-check-input-lg');
    checkbox.type = 'checkbox';
    checkbox.style.width = '2em';
    checkbox.style.height = '2em';

    // élément du badge 
    const badge = document.createElement('span');

    if (priority === 'Normale') {
        badge.classList.add('badge', 'bg-primary')
    } else if (priority === 'Haute') {
        badge.classList.add('badge', 'bg-warning')
    } else {
        badge.classList.add('badge', 'bg-danger')
    }

    badge.textContent = `${priority}`;

    // ajout de la base <br>
    const br = document.createElement('br');

    // élement du petit texte
    const smallText = document.createElement('small');
    smallText.classList.add = ('form-text', 'text-muted');
    smallText.textContent = date;

    // élement de l'input texte readonly
    const text = document.createElement('input');
    text.type = ('text');
    text.classList.add('form-control', 'formList');
    text.value = content.value;
    text.readOnly = true;

    // élement du bouton Effacer
    const btnDelete = document.createElement('button');
    btnDelete.type = 'submit';
    btnDelete.classList.add('btn', 'btn-danger');
    btnDelete.textContent = ('Effacer');

    // placer le bouton effacer à la fin 
    tdBtnDelete.className = 'text-end';

    // relier les éléments au td (cellules)
    tdCheckbox.appendChild(checkbox);
    tdBadgeText.appendChild(badge);
    tdBadgeText.appendChild(br);
    tdBadgeText.appendChild(smallText);
    tdText.appendChild(text);
    tdBtnDelete.appendChild(btnDelete);

    // relier les éléments au tr (lignes)
    tr.appendChild(tdCheckbox);
    tr.appendChild(tdBadgeText);
    tr.appendChild(tdText);
    tr.appendChild(tdBtnDelete);
    tableBody.appendChild(tr);

    event.preventDefault()
}

// fonction de filterList
function filterList(e) {
    const list = e.target.value.toLowerCase();
    document.querySelectorAll('.formList').forEach(
        function (select) {
            const word = select.firstChild.textContent;
            if (word.toLocaleLowerCase().indexOf(list) != -1) {
                select.getElementsByClassName.display = 'block';
            } else {
                select.style.display = 'none';
            }
        }
    );

    console.log(list);
}

// supprimer la ligne
function deleteBtn(e) {
    if (e.target.classList.contains('btn-danger')) {
        const trParent = e.target.closest('tr');
        if (confirm('Voulez-supprimer?'))
            if (trParent) {
                trParent.remove()
            };
    };
};

// supprimer la ligne avec parentElement
/* 
function deleteBtn (e) {
    if (e.target.classList.contains('btn-danger') ) {
        if(confirm('voulez-vous supprimer ?'))
        e.target.parentElement.parentElement.remove();
    };
}; 
*/
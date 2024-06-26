const form = document.querySelector("#form"); // prends tout le formulaire
const tableBody = document.querySelector("tbody"); // prends le corps du tableau
const content = document.querySelector("#newContent"); // sélectionne l'input pour ajouter un élément
const filter = document.querySelector("#filter"); // sélectionne l'id de l'input "rechercher"

// Ajout de l'event
function addContent(event) {
  event.preventDefault();

  if (content.value === "") alert("Ajouter un élément");

  // récupérer la priorité
  const priority = document.querySelector("#priority").value;
  // récupère les anciennes priorités ou créer un nouveau tableau vide
  let priorityArray = JSON.parse(localStorage.getItem("Priorities")) || [];
  // insérer la nouvelle date dans le tableau
  priorityArray.push(priority);
  // met à jour le tableau avec le nouveau contenu
  localStorage.setItem("Priorities", JSON.stringify(priorityArray));

  let date;
  // if selector !== vide
  //  date = new date

  if (document.querySelector("#date").value !== "") {
    date = new Date(document.querySelector("#date").value);
    // récupère les anciennes dates ou créer un nouveau tableau vide
    let dateArray = JSON.parse(localStorage.getItem("Dates")) || [];
    // insérer la nouvelle date dans le tableau
    dateArray.push(date);
    // met à jour le tableau avec le nouveau contenu
    localStorage.setItem("Dates", JSON.stringify(dateArray));
  }

  //  console.log(date);

  // vérifier si la date est dépassée
  const currentDate = new Date();
  const datePassed = date < currentDate;

  // ajouter une ligne à la table
  const tr = document.createElement("tr");

  // création des td
  const tdCheckbox = document.createElement("td");
  const tdBadgeText = document.createElement("td");
  const tdText = document.createElement("td");
  const tdBtnDelete = document.createElement("td");

  // élément du checkbox
  const checkbox = document.createElement("input");
  checkbox.classList.add("form-check-input", "form-check-input-lg");
  checkbox.type = "checkbox";
  checkbox.style.width = "2em";
  checkbox.style.height = "2em";

  // élément du badge
  const badge = document.createElement("span");
  badge.textContent = `${priority}`;

  if (priority === "Priorité normale") {
    tr.dataset.priority = 0;
    badge.classList.add("badge", "bg-primary");
  } else if (priority === "Priorité haute") {
    tr.dataset.priority = 1;
    badge.classList.add("badge", "bg-warning");
  } else {
    tr.dataset.priority = 2;
    badge.classList.add("badge", "bg-danger");
  }

  // ajout de la base <br>
  const br = document.createElement("br");

  // élement du petit texte
  const smallText = document.createElement("small");
  smallText.classList.add("form-text", "text-muted");

  if (date) {
    // élement du petit texte avec la valeur de la date
    smallText.textContent = date.toLocaleDateString("fr-FR");

    if (datePassed) {
      smallText.classList.add("badge", "bg-secondary");
    }
    // ajoute le dataset date avec une valeur en milliseconde
    tr.dataset.date = date.getTime();
  } else {
    smallText.textContent = "pas de date limite";
  }

  // élement de l'input texte readonly
  const text = document.createElement("input");
  text.type = "text";
  text.classList.add("form-control", "formList");
  text.value = content.value;
  text.readOnly = true;

  // élement du bouton Effacer
  const btnDelete = document.createElement("button");
  btnDelete.type = "submit";
  btnDelete.classList.add("btn", "btn-danger");
  btnDelete.textContent = "Effacer";

  // placer le bouton effacer à la fin
  tdBtnDelete.className = "text-end";

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

  // récupère le contenu qu'on veut sauvegarder
  let contentStorage = document.querySelector("#newContent").value;
  // récupère l'ancien contenu existant
  let contentArray = JSON.parse(localStorage.getItem("Content")) || [];
  // ajouter l'élément à l'array
  contentArray.push(contentStorage);
  // fait une mise à jour de l'array avec le nouveau contenu
  localStorage.setItem("Content", JSON.stringify(contentArray));
  console.log(contentArray);
}

// fonction de filterList
function filterList(e) {
  const list = e.target.value.toLowerCase();

  document.querySelectorAll(".formList").forEach(function (select) {
    const word = select.value.toLowerCase();
    const parent = select.closest("tr");

    if (word.indexOf(list) !== -1) {
      parent.style.display = null;
    } else {
      parent.style.display = "none";
    }
  });

  //  console.log(list);
}

// supprimer la ligne
function deleteBtn(e) {
  if (e.target.classList.contains("btn-danger")) {
    const trParent = e.target.closest("tr");
    if (confirm("Voulez-supprimer?"))
      if (trParent) {
        trParent.remove();
      }
  }
}

// supprimer la ligne avec parentElement
/* 
function deleteBtn (e) {
    if (e.target.classList.contains('btn-danger') ) {
        if(confirm('voulez-vous supprimer ?'))
        e.target.parentElement.parentElement.remove();
};
}; 
*/

// Ajouter un nouveau contenu
form.addEventListener("submit", addContent);

// filtrer la liste
filter.addEventListener("keyup", filterList);

// supprimer une tâche
tableBody.addEventListener("click", deleteBtn);

// trier option +/-
document.querySelector("#sort").addEventListener("change", (e) => {
  switch (e.target.value) {
    case "option1":
      return sortByPriorityASC();
    case "option2":
      return sortByPriorityDESC();
    case "option3":
      return sortByCheckboxON();
    case "option4":
      return sortByCheckboxOFF();
    case "option5":
      return sortByDateASC();
    case "option6":
      return sortByDateDESC();
    case "annuler":
      return reset();
  }
});

// tri par priorité +/-
const sortByPriorityASC = () => {
  // récupère toutes les todos et en les converties en items itérable
  const children = [...tableBody.querySelectorAll("tr")];

  // remplace tout les enfants de tableBody par le nouveau tri
  tableBody.replaceChildren(
    ...children.sort((a, b) => b.dataset.priority - a.dataset.priority)
  );
};

// tri  par priorité -/+
const sortByPriorityDESC = () => {
  // récupère toutes les todos et en les converties en items itérable
  const children = [...tableBody.querySelectorAll("tr")];

  // remplace tout les enfants de tableBody par le nouveau tri
  tableBody.replaceChildren(
    ...children.sort((a, b) => a.dataset.priority - b.dataset.priority)
  );
};

// tri par checkbox activé
const sortByCheckboxON = () => {
  const children = [...tableBody.querySelectorAll("tr")];
  tableBody.replaceChildren(
    ...children.sort((a, b) => {
      const checkboxA = a.querySelector('input[type="checkbox"]');
      const checkboxB = b.querySelector('input[type="checkbox"]');
      return checkboxB.checked - checkboxA.checked;
    })
  );
};

// tri par checkbox désactivé
const sortByCheckboxOFF = () => {
  const children = [...tableBody.querySelectorAll("tr")];
  tableBody.replaceChildren(
    ...children.sort((a, b) => {
      const checkboxA = a.querySelector('input[type="checkbox"]');
      const checkboxB = b.querySelector('input[type="checkbox"]');
      return checkboxA.checked - checkboxB.checked;
    })
  );
};

// tri par date +/-
const sortByDateASC = () => {
  const children = [...tableBody.querySelectorAll("tr")];
  tableBody.replaceChildren(
    ...children.sort((a, b) => {
      const dateA = +a.dataset.date || Infinity;
      const dateB = +b.dataset.date || Infinity;
      console.log(dateA);
      return dateB - dateA;
    })
  );
};

// tri par date -/+
const sortByDateDESC = () => {
  const children = [...tableBody.querySelectorAll("tr")];
  tableBody.replaceChildren(
    ...children.sort((a, b) => {
      const dateA = +a.dataset.date || Infinity;
      const dateB = +b.dataset.date || Infinity;
      console.log(dateA);
      return dateA - dateB;

    })
  );
};

// Infinity = mets soit la valeur la plus haute

// annuler la selection 
function reset() {
  document.querySelector("#sort").value = "Trier par";
}
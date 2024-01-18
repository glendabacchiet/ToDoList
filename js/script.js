const button = document.querySelector(".button-aggiungi");
const input = document.querySelector(".input-compiti");
const elencoCompiti = document.querySelector(".elenco");

// elenco di compiti
let arrayCompiti = [];

// aggiungi il compito all'array
function aggiungiCompito() {
  if (input.value != "") {
    arrayCompiti.push({
      compito: input.value,
      fatto: false,
    });

    input.value = "";

    vedereCompiti();
  } else {
    alert("Devi inserire un compito!");
  }
}

// fa vedere l'elenco dei compiti
function vedereCompiti() {
  let newLi = "";
  arrayCompiti.forEach((compito, index) => {
    newLi = newLi +
      `<li class="compiti ${compito.fatto && "compito-fatto"}">
            <img src="./img/checked.png" alt="check-compito" onclick="compitoFatto(${index})">
            <p>${compito.compito}</p>
            <img src="./img/trash.png" alt="cancellare-compito" onclick="cancellareCompito(${index})">
        </li>
        `;
    });

    elencoCompiti.innerHTML = newLi;

    localStorage.setItem('elenco',JSON.stringify(arrayCompiti));
}

// cancella il compito scelto
function cancellareCompito(index){
    arrayCompiti.splice(index, 1);
    vedereCompiti();
}

// modifica il compito quando gia fatto
function compitoFatto(index){
    arrayCompiti[index].fatto = !arrayCompiti[index].fatto;
    vedereCompiti();
}

// per mantenere i compiti quando si aggiorna il browser
function aggiornaCompiti() {
    const compitiLocalStorage = localStorage.getItem('elenco');

    if(compitiLocalStorage){
        arrayCompiti = JSON.parse(compitiLocalStorage);
    }

    vedereCompiti();
}

aggiornaCompiti();
button.addEventListener("click", aggiungiCompito);
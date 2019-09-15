/*****VARIABLAR*****/
const knapp = document.querySelector("#leggtil-knapp");
const liste = document.querySelector("#liste");
const tekstFelt = document.querySelector("#tekst-felt");

/*****FUNKSJONAR*****/
//Hent data fra #tekst-felt når #leggtil-knapp klikkes.
function leggTilListe() {

  const VARE = tekstFelt.value.trim();
  if(VARE){
    lagVare(VARE);
  }

  tekstFelt.value = "";
  tekstFelt.focus();

  //Lagre lista når nye varer leggest inn
  lagreListe();
}

/*** Vis varen i listen ***/
function lagVare(vare) {
  //Lag nytt HTML element
  const li = document.createElement("li");
    const slett = new Slett();
  //Legg data fra #tekst-felt inn i HTML-elementet
  li.innerHTML = vare;
  li.appendChild(slett.knapp);
  //Fest elementet til listen.
  liste.appendChild(li);
}

//Lag en sletteknapp
function Slett() {
  this.knapp = document.createElement("p");
  this.knapp.innerHTML = "X";
  this.knapp.classList.add("slett")

//Legg til slett funksjon til sletteknappen.
  this.knapp.addEventListener("click", function() {
    liste.removeChild(this.parentElement);
    tekstFelt.focus();

    //Lagre lista når noko slettast
    lagreListe();
  });
  }

//Lagre listen
function lagreListe() {
  const listeElement = document.querySelectorAll("li");
  const varer = [];
  for(let i = 0; i < listeElement.length; i++){
    varer.push(listeElement[i].innerText.slice(0, -3));
  }
  localStorage.handleListeApp = varer.join("&%$");
}

  /*****PROGRAM****/
  knapp.addEventListener("click", leggTilListe);

  //Sjekk om det finnst ei lagra lista
  if(localStorage.handleListeApp){
    const varer = localStorage.handleListeApp.split("&%$");
    for(let i = 0; i < varer.length; i++){
      lagVare(varer[i]);
    }
  }
    tekstFelt.value = "";

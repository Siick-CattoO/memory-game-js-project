"use strict";
console.clear();

//todo>     MEMORY-AUFGABEN

//todo>     - Spielfeld erstellen ~~> 6x4 / 4x6
//todo>     - Katen flippen ~~> eventListener("click")
//todo>     - Flip-Effekt   ~~> .toggle("div")
//todo>     - Paar gefunden ~~> .flipped
//todo>     - Paar falsch ~~> .remove("CLASS")

//* ------------------------------------------------------------------------------- Selectors

// Elemente rüberholen und ansprechen
const section = document.querySelector("section");
const retryCount = document.querySelector("span");
let retry = 8;

// -------------------------------------------------
// Text verlinken
retryCount.textContent = retry;

// -------------------------------------------------
// Kartendaten generieren ~~~> Array mit Objekten
const getData = () => [
  { imgSrc: "./images/cat.png", name: "cat" },
  { imgSrc: "./images/cat.png", name: "cat" },
  { imgSrc: "./images/chameleon.png", name: "chameleon" },
  { imgSrc: "./images/chameleon.png", name: "chameleon" },
  { imgSrc: "./images/elephant.png", name: "elephant" },
  { imgSrc: "./images/elephant.png", name: "elephant" },
  { imgSrc: "./images/fox.png", name: "fox" },
  { imgSrc: "./images/fox.png", name: "fox" },
  { imgSrc: "./images/jellyfish.png", name: "jellyfish" },
  { imgSrc: "./images/jellyfish.png", name: "jellyfish" },
  { imgSrc: "./images/owl.png", name: "owl" },
  { imgSrc: "./images/owl.png", name: "owl" },
  { imgSrc: "./images/panda-bear.png", name: "panda-bear" },
  { imgSrc: "./images/panda-bear.png", name: "panda-bear" },
  { imgSrc: "./images/snail.png", name: "snail" },
  { imgSrc: "./images/snail.png", name: "snail" },
  { imgSrc: "./images/snake.png", name: "snake" },
  { imgSrc: "./images/snake.png", name: "snake" },
  { imgSrc: "./images/toucan.png", name: "toucan" },
  { imgSrc: "./images/toucan.png", name: "toucan" },
  { imgSrc: "./images/turtle.png", name: "turtle" },
  { imgSrc: "./images/turtle.png", name: "turtle" },
  { imgSrc: "./images/whale.png", name: "whale" },
  { imgSrc: "./images/whale.png", name: "whale" },
];

//! ------------------------------------------------------------------------------- Mix Cards Function
// zufällige Anordnung der Karten // Mix Cards
const mixCards = () => {
  const cardData = getData();
  cardData.sort(() => Math.random() - 0.5);
  return cardData;
};

//! ------------------------------------------------------------------------------- Card Generator Function
const cardGenerator = () => {
  const cardData = mixCards();
  // HTML generieren:
  const cards = document.querySelectorAll(".card");
  // Schleife erstellen, um auf jedes Objekt im Array zuzugreifen:
  cardData.forEach((item) => {
    const card = document.createElement("div");
    const cardFront = document.createElement("img");
    const cardBack = document.createElement("div");
    // CSS-Klassen zuweisen:
    card.classList = "card";
    cardFront.classList = "cardFront";
    cardBack.classList = "cardBack";
    // Information zu der Karte hinzufügen:
    cardFront.src = item.imgSrc;
    card.setAttribute("name", item.name);
    // Erstellte Elemente dem Parent zuweisen:
    section.appendChild(card);
    card.appendChild(cardFront);
    card.appendChild(cardBack);

    // "Klick-Event" für den eventListener:
    card.addEventListener("click", (e) => {
      card.classList.toggle("toggleCard");
      checkCards(e);
    });
  });
};

//! ------------------------------------------------------------------------------- Matching Cards Function
// Checken, ob Karten zusammenpassen:
const checkCards = (e) => {
  console.log(e);
  const clickedCard = e.target;
  // Weitere Klasse hinzufügen zu den umgedrehten Karten
  clickedCard.classList.add("flipped");
  // Umgedrehte Karten in neuer Variable speichern
  const flippedCards = document.querySelectorAll(".flipped");

  //^ ------------------------------------------------------------------ if-Statement finding pair
  // Die "toggle-class" ist für die Animation, während die "flipped-class" checkt ob zwei Karten zusammen passen
  // Einen Boolean ertsellen ~~~> if-statement:

  if (flippedCards.length === 2) {
    if (flippedCards[0].getAttribute("name") === flippedCards[1].getAttribute("name")) {
      console.log("match");
      flippedCards.forEach((card) => {
        // "flipped"-Klasse entfernen, damit die Karten aufgedeckt bleiben:
        card.classList.remove("flipped");
        // Möglichkeit zum anklicken entfernen:
        card.style.pointerEvents = "none";
      });
    } else {
      console.log("wrong");
      // Mit froEach-Schleife durch jedes Objekt gehen und die "flipped"-Klasse entfernen: // .remove("class")
      flippedCards.forEach((card) => {
        card.classList.remove("flipped");
        setTimeout(() => card.classList.remove("toggleCard"), 1800); // calculating in milliseconds
      });
      retry--;
      retryCount.textContent = retry;
      if(retry === 0) {
        restart()
     }
    }
  }
};

//! ------------------------------------------------------------------------------- Restart Function

// Alle Karten wieder umdregen und mischen //  Restart
const restart = () => {
  let cardData = mixCards();
  let fronts = document.querySelectorAll(".cardFront");
  let cards = document.querySelectorAll(".card");
  // Schleife für gefundene Karten-Paare erstellen ~~~> nicht mehr klickbar:
  cardData.forEach((item, index) => {
    // Alle Karten wieder umdrehen, wenn Game Over:
    cards[index].classList.remove("toggleCard");
    // Alle Karten neu mischen, aber erst nachdem alle Karten wieder umgedreht sind: // setTimeout()
    setTimeout(() => {
    cards[index].style.pointerEvents = "all";
    fronts[index].src = item.imgSrc;
  }, 1000)
  });

  // Versuche bis Game Over
  retry = 8;
  retryCount.textContent = retry;
  
};

cardGenerator();

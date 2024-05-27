function randomRGB(){
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r},${g},${b})`
}

const letters = document.querySelectorAll('.letter');
const intervalId = setInterval(function(){
  for (let letter of letters) {
    letter.style.color = randomRGB();
  }
}, 1000);


const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
];

function shuffle(array) {
  let counter = array.length;
  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--;

    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    const newDiv = document.createElement("div");
    newDiv.classList.add(color);
    newDiv.addEventListener("click", handleCardClick);

    gameContainer.append(newDiv);
  }
}

let cardOne = null;
let cardTwo = null;
let cardsFlipped = 0;
let isProcessing = false;

function handleCardClick(event) {
  if (isProcessing || event.target === cardOne || event.target === cardTwo) {
    return;
  }

  let chosenCard = event.target;

  if (chosenCard.classList.contains("flipped") || cardsFlipped === 2) {
    return;
  }

  chosenCard.classList.add("flipped");
  let colorIndex = COLORS.indexOf(chosenCard.classList[0]);
  chosenCard.style.backgroundColor = COLORS[colorIndex];

  if (!cardOne) {
    cardOne = chosenCard;
    cardsFlipped++;
  } else {
    cardTwo = chosenCard;
    cardsFlipped++;
    isProcessing = true;

    if (cardOne.classList[0] === cardTwo.classList[0]) {
      cardOne.removeEventListener("click", handleCardClick);
      cardTwo.removeEventListener("click", handleCardClick);
      cardOne = null;
      cardTwo = null;
      cardsFlipped = 0;
      isProcessing = false;
    } else {
      setTimeout(function () {
        cardOne.classList.remove("flipped");
        cardTwo.classList.remove("flipped");
        cardOne.style.backgroundColor = "";
        cardTwo.style.backgroundColor = "";
        cardOne = null;
        cardTwo = null;
        cardsFlipped = 0;
        isProcessing = false;
      }, 1000);
    }
  }
}

createDivsForColors(shuffledColors);

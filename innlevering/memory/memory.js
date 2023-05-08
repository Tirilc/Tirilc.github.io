const moves = document.getElementById("moves-count");
const timeValue = document.getElementById("time");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const gameContainer = document.querySelector(".game-container");
const result = document.getElementById("result");
const resultTime = document.querySelector('.resultTime');
const controls = document.querySelector(".controls-container");
let cards;
let interval;
let firstCard = false;
let secondCard = false;
//Items array
const items = [
    {name:"turtle",image: "../bilder/turtle.png"},
    {name:"seal", image:"../bilder/seal.png"},
    {name:"shell", image:"../bilder/shell.png"},
    {name:"sealH", image:"../bilder/sealB.png"},
    {name:"crab", image:"../bilder/crab.png"},
    {name:"puffer",image:"../bilder/puffer.png"},
    {name:"fish",image:"../bilder/fish.png"},
    {name:"octopus",image:"../bilder/octopus.png"},
    {name:"whale",image:"../bilder/whale.png"},
    {name:"clown-fish", image:"../bilder/clown-fish.png"},
    {name:"fisk 2",image:"../bilder/fisk2.png"},
    {name:"hummer", image:"../bilder/hummer.png"},
    ];
//initialiserer tid
let seconds = 0,
  minutes = 0;
//initialiserer moves og win telling
let movesCount = 0,
  winCount = 0;
//for timer
const timeGenerator = () => {
  seconds += 1;
  //minutter logikk
  if (seconds >= 60) {
    minutes += 1;
    seconds = 0;
  }
  //formaterer tid før visning
  let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
  let minutesValue = minutes < 10 ? `0${minutes}` : minutes;
  timeValue.innerHTML = `<span>Time:</span>${minutesValue}:${secondsValue}`;
  resultTime.innerHTML = `<h4>Tiden din er ${minutesValue}:${secondsValue}</h4>`;
};
//For å kalkulere moves
const movesCounter = () => {
  movesCount += 1;
  moves.innerHTML = `<span>Moves:</span>${movesCount}`;
};
//velger random objects fra items array
const generateRandom = (size = 4) => {
  //temporary array
  let tempArray = [...items];
  //initialiserer cardValues array
  let cardValues = [];
  //størrelsen skal være dobbel (4*4 matrix)/2 siden det vil eksistere par med objekter
  size = (size * size) / 2;
  //Random object valg
  for (let i = 0; i < size; i++) {
    const randomIndex = Math.floor(Math.random() * tempArray.length);
    cardValues.push(tempArray[randomIndex]);
    //når du har valgt, fjern objektet fra den midlertidige arrayet
    tempArray.splice(randomIndex, 1);
  }
  return cardValues;
};
const matrixGenerator = (cardValues, size = 4) => {
  gameContainer.innerHTML = "";
  cardValues = [...cardValues, ...cardValues];
  //enkel stokking
  cardValues.sort(() => Math.random() - 0.5);
  for (let i = 0; i < size * size; i++) {
    gameContainer.innerHTML += `
     <div class="card-container" data-card-value="${cardValues[i].name}">
        <div class="card-before">?</div>
        <div class="card-after">
        <img src="${cardValues[i].image}" class="image"/></div>
     </div>
     `;
  }
  //Grid
  gameContainer.style.gridTemplateColumns = `repeat(${size},auto)`;
  //kort
  cards = document.querySelectorAll(".card-container");
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      //Hvis valgt kort er ikke matched enda deretter bare kjør (altså allerede matchet kort når det klikkes vil bli ignorert)
      if (!card.classList.contains("matched")) {
        //flipp det klikkede kortet
        card.classList.add("flipped");
        //hvis det blir det første kortet(siden det første kortet er opprinnelig falskt)
        if (!firstCard) {
          //gjeldene kort vil bli firstCard
          firstCard = card;
          //gjeldenes kort verdi blir firstCardValue
          firstCardValue = card.getAttribute("data-card-value");
        } else {
          //øker moves siden brukern valgte det andre kortet
          movesCounter();
          //secondCard og verdi
          secondCard = card;
          let secondCardValue = card.getAttribute("data-card-value");
          if (firstCardValue == secondCardValue) {
            //hvis begge kort metcher legg til matched klasse så kortene vil bli ignorert neste gang
            firstCard.classList.add("matched");
            secondCard.classList.add("matched");
            //setter firstCard til false fordi neste kort vil bli det første
            firstCard = false;
            //winCount øker når spiller finner en match
            winCount += 1;
            //sjekker hvis winCount == halvparten av cardValues
            if (winCount == Math.floor(cardValues.length / 2)) {
              result.innerHTML = `<h2>Du vant!</h2>
            <h4>Du brukte ${movesCount} trekk</h4>`;
              stopGame();
            }
          } else {
            //hvis kortet ikke matcher
            //flipper kortet tilbake til normalen
            let [tempFirst, tempSecond] = [firstCard, secondCard];
            firstCard = false;
            secondCard = false;
            let delay = setTimeout(() => {
              tempFirst.classList.remove("flipped");
              tempSecond.classList.remove("flipped");
            }, 900);
          }
        }
      }
    });
  });
};
//starter spillet
startButton.addEventListener("click", () => {
  movesCount = 0;
  seconds = 0;
  minutes = 0;
  //kontrollerer buttons og synlighet
  controls.classList.add("hide");
  stopButton.classList.remove("hide");
  startButton.classList.add("hide");
  //starter tiden
  interval = setInterval(timeGenerator, 1000);
  //initialiserer bevegelse 
  moves.innerHTML = `<span>Moves:</span> ${movesCount}`;
  initializer();
});
//stopper spillet
stopButton.addEventListener(
  "click",
  (stopGame = () => {
    controls.classList.remove("hide");
    stopButton.classList.add("hide");
    startButton.classList.remove("hide");
    clearInterval(interval);
  })
);
//Initialiser verdier og funksj. anrop
const initializer = () => {
  result.innerText = "";
  winCount = 0;
  let cardValues = generateRandom();
  console.log(cardValues);
  matrixGenerator(cardValues);
};
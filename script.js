//! input

const username = "Mati";

//!Select labbles

const user = document.querySelector(".user");
const chanceLeft = document.querySelector(".Chance-Left");
const score = document.querySelector(".score");
const quiz = document.querySelector(".quiz");
const A = document.querySelector(".choiceUpper--left");
const B = document.querySelector(".choiceUpper--right");
const C = document.querySelector(".choiceLower--left");
const D = document.querySelector(".choiceLower--right");
const choiceCont = document.querySelector(".choice-cont");
const start = document.querySelector(".start");
const next = document.querySelector(".next");
const newGame = document.querySelector(".newGame");
const question = document.querySelector(".question-cont");
const rendmsg = document.querySelector(".message-render");

// ! selecting msgs

const message1 = `Your are so dumb ${username}! how could you miss that. you have only 1 chance`;
const lastmessage = `Get out of here!! You're Stupid basterd`;

//! global Variables

let allData = [];
let internalScore = 0;
let internalChance = 3;
let currentCountry2;

//!  render badMessage

const badMessage = function (identifier) {
  if (identifier === 1) return message1;
  if (identifier === 0) return lastmessage;
};

//! window load
const emptytab = function () {
  rendmsg.textContent = "";
  quiz.textContent = ``;
  question.textContent = "";
  A.textContent = "";
  B.textContent = "";
  C.textContent = "";
  D.textContent = "";
};

//! Reset choice

const resetChoice = function () {
  A.style.backgroundColor = "rgb(77, 134, 109)";
  B.style.backgroundColor = "rgb(77, 134, 109)";
  C.style.backgroundColor = "rgb(77, 134, 109)";
  D.style.backgroundColor = "rgb(77, 134, 109)";
};

//!Generating random numbers

function generateNumbers() {
  let numbers = [];
  while (numbers.length < 3) {
    let randomNum = Math.floor(Math.random() * 10);
    if (randomNum !== 0 && !numbers.includes(randomNum)) {
      numbers.push(randomNum);
    }
  }

  numbers.push(0);

  numbers.sort(() => Math.random() - 0.5);

  return numbers;
}

const renderQuestion = function (data) {
  question.textContent = `"What is the capital city of ${data.currentCountry.name} ?`;
  // quiz.textContent = `${data.currentCountry.name}`;
  A.textContent = `${data.choice1}`;
  B.textContent = `${data.choice2}`;
  C.textContent = `${data.choice3}`;
  D.textContent = `${data.choice4}`;
};

//! Get Country Data from Api

const getCountryData = async function (random) {
  try {
    const response = await fetch(
      "https://countriesnow.space/api/v0.1/countries/capital"
    );
    console.log(random);

    const datap = await response.json();
    const { data } = datap;

    data.forEach(function (ob) {
      allData.push(ob);
    });

    const currentCountry = allData[random];
    currentCountry2 = currentCountry;
    const chNumbers = generateNumbers();
    console.log(chNumbers);
    let A, B, C, D;

    for ([ind, val] of chNumbers.entries()) {
      if (ind === 0) A = val;
      if (ind === 1) B = val;
      if (ind === 2) C = val;
      if (ind === 3) D = val;
    }
    console.log(currentCountry);
    console.log(A, B, C, D);

    const choice1 = allData[random - A].capital;
    const choice2 = allData[random + B].capital;
    const choice3 = allData[random - C].capital;
    const choice4 = allData[random + D].capital;

    const datarendered = { choice1, choice2, choice3, choice4, currentCountry };
    renderQuestion(datarendered);
    console.log(currentCountry);
    console.log(choice1, choice2, choice3, choice4);
  } catch (error) {
    console.log(error);
  }
};

choiceCont.addEventListener("click", function (event) {
  event.preventDefault();
  if (!(internalChance === 0)) {
    if (internalScore === 30) {
    }
    const clicked = event.target.closest(".choice");
    if (clicked.textContent === currentCountry2.capital) {
      clicked.style.backgroundColor = "rgb(85, 255, 0)";
      internalScore++;
      score.textContent = internalScore;
      console.log(remainChance);
    }

    if (clicked.textContent !== currentCountry2.capital) {
      clicked.style.backgroundColor = "rgb(252, 0, 0)";
      internalChance--;
      chanceLeft.textContent = internalChance;
    }
  }
  if (internalChance === 1) {
    const msg = badMessage(internalChance);
    rendmsg.textContent = msg;
  }

  if (internalChance === 0) {
    const msg = badMessage(internalChance);
    rendmsg.textContent = msg;
  }
});

if (!(internalChance === 0)) {
  next.addEventListener("click", function () {
    resetChoice();
    const randomNumber = Math.floor(Math.random() * 250) + 1;
    getCountryData(randomNumber);
    console.log(remainChance);
  });

  start.addEventListener("click", function () {
    rendmsg.textContent = "Good Luck!";
    const randomNumber = Math.floor(Math.random() * 250) + 1;
    getCountryData(randomNumber);
  });
}

window.onload = function () {
  emptytab();
};

newGame.addEventListener("click", function () {
  rendmsg.textContent = "";
  quiz.textContent = ``;
  question.textContent = "";
  A.textContent = "";
  B.textContent = "";
  C.textContent = "";
  D.textContent = "";
});

//! input

const currentUser = document.querySelector(".login__input");

//!Select labbles

const gameContent = document.querySelector(".container");
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
const login = document.querySelector(".login_btn");
const logincont = document.querySelector(".loginCont");
const congratCont = document.querySelector(".CongraMessage");
const failCont = document.querySelector(".failMessage");
const tryagain = document.querySelector(".failMessage__button");
const playagain = document.querySelector(".CongraMessage__button");
const failName = document.querySelector(".failMessage-name");

//! global Variables

let allData = [];
let internalScore = 0;
let internalChance = 5;
let currentCountry2;
let username;

// ! selecting msgs

const message1 = `Your are so dumb ${username}! how could you miss that. you have only 1 chance`;
const lastmessage = `Get out of here!! You're Stupid basterd`;

//!  back to game

const cleaner = function (input) {
  next.style.pointerEvents = "none";
  next.style.color = "gray";
  start.style.pointerEvents = "all";
  start.style.color = "black";
  chanceLeft.textContent = "5";
  score.textContent = "0";
  internalScore = 0;
  internalChance = 5;
  rendmsg.textContent = "";
  quiz.textContent = ``;
  question.textContent = "";
  A.textContent = "";
  B.textContent = "";
  C.textContent = "";
  D.textContent = "";
};
//! User Name Editor

const nameEditor = function (name) {
  return (
    name.toLowerCase().charAt(0).toUpperCase() + name.toLowerCase().slice(1)
  );
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
  question.style.fontSize = "35px";
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

    const datap = await response.json();
    const { data } = datap;

    data.forEach(function (ob) {
      allData.push(ob);
    });

    const currentCountry = allData[random];
    currentCountry2 = currentCountry;
    const chNumbers = generateNumbers();

    let A, B, C, D;

    for ([ind, val] of chNumbers.entries()) {
      if (ind === 0) A = val;
      if (ind === 1) B = val;
      if (ind === 2) C = val;
      if (ind === 3) D = val;
    }

    const choice1 = allData[random - A]?.capital || currentCountry.allData[164];
    const choice2 = allData[random + B]?.capital || currentCountry.allData[7];
    const choice3 = allData[random - C]?.capital || currentCountry.allData[14];
    const choice4 = allData[random + D]?.capital || currentCountry.allData[51];

    const datarendered = { choice1, choice2, choice3, choice4, currentCountry };
    renderQuestion(datarendered);
  } catch (error) {
    console.log(error);
  }
};

choiceCont.addEventListener("click", function (event) {
  rendmsg.textContent = "";
  choiceCont.style.pointerEvents = "none";
  event.preventDefault();
  if (!(internalChance === 0)) {
    if (internalScore === 1) {
      gameContent.classList.remove("show");
      congratCont.style.display = "block";
    }
    const clicked = event.target.closest(".choice");
    if (clicked.textContent === currentCountry2.capital) {
      next.style.pointerEvents = "all";
      next.style.color = "black";
      clicked.style.backgroundColor = "rgb(85, 255, 0)";
      internalScore++;
      score.textContent = internalScore;
    }

    if (clicked.textContent !== currentCountry2.capital) {
      next.style.pointerEvents = "all";
      next.style.color = "black";
      clicked.style.backgroundColor = "rgb(252, 0, 0)";
      internalChance--;
      chanceLeft.textContent = internalChance;
    }
  }

  if (internalChance === 1) {
    const message1 = `Your are so dumb ${username}! how could you miss that. you have only 1 chance`;

    rendmsg.textContent = message1;
  }

  if (internalChance === 0) {
    gameContent.classList.remove("show");
    failCont.style.display = "block";
    failName.textContent = username;
    failName.style.color = "rgb(252, 0, 0)";

    next.style.pointerEvents = "none";
    next.style.color = "gray";
    start.style.pointerEvents = "none";
    start.style.color = "gray";
  }
});

if (!(internalChance === 0)) {
  next.addEventListener("click", function () {
    resetChoice();
    next.style.pointerEvents = "none";
    choiceCont.style.pointerEvents = "all";
    next.style.color = "grey";
    const randomNumber = Math.floor(Math.random() * 250) + 1;
    getCountryData(randomNumber);
  });

  start.addEventListener("click", function () {
    start.style.pointerEvents = "none";
    start.style.color = "grey";

    rendmsg.textContent = "Good Luck!";
    rendmsg.style.color = "rgb(253, 3, 3)";
    const randomNumber = Math.floor(Math.random() * 250) + 1;
    getCountryData(randomNumber);
  });
}

login.addEventListener("click", function (e) {
  e.preventDefault();
  let username2 = currentUser.value;
  username = nameEditor(username2);
  user.textContent = `Welcome : ${username}`;
  if (username2) {
    logincont.classList.add("hidden");
    gameContent.classList.add("show");
    failCont.classList.remove("hidden");
  }

  emptytab();
});

tryagain.addEventListener("click", function () {
  cleaner();
  resetChoice();
  failCont.style.display = "none";
  gameContent.classList.add("show");
});

playagain.addEventListener("click", function () {
  cleaner();
  resetChoice();
  congratCont.style.display = "none";
  gameContent.classList.add("show");
});

newGame.addEventListener("click", function () {
  cleaner();
  resetChoice();
});

// fetch("https://countriesnow.space/api/v0.1/countries/capital")
//   .then(function (response) {
//     const data = response.json();
//     return data;
//   })
//   .then(function (data) {
//     console.log(data);
//   })
//   .catch(function (err) {
//     console.log(err);
//   });

//!Select labbles

const user = document.querySelector(".user");
const chance = document.querySelector(".chance");
const score = document.querySelector(".score");

const randomNumber = Math.floor(Math.random() * 250) + 1;
// console.log(randomNumber);

const getCountryData = async function (random) {
  try {
    const response = await fetch(
      "https://countriesnow.space/api/v0.1/countries/capital"
    );
    console.log(random);

    const datap = await response.json();
    const { data } = datap;

    const current = data[random];
    console.log(current);
    let A;
    let B;
    let C;
    let D;
    const decide = Math.floor(Math.random() * 4);
    A = decide;
    if (A === 1) {
      B = 0;
      C = random + 10;
      D = random + 20;
    } else if (A === 2) {
      B = random - 24;
      C = 0;
      D = random + 20;
    } else if (A === 3) {
      B = random + 8;
      C = random - 1;
      D = 0;
    } else if (A === 0) {
      B = random - 24;
      C = random + 30;
      D = random + 20;
    }

    const choice1 = data[random - A].capital;
    const choice2 = data[random + B].capital;
    const choice3 = data[random - C].capital;
    const choice4 = data[random + D].capital;

    console.log(choice1, "+", choice2, "+", choice3, "+", choice4);
  } catch (error) {
    console.error(error);
  }
};
getCountryData(randomNumber);

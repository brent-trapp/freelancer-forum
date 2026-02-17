/**
 * @typedef Freelancer
 * @property {string} name
 * @property {string} occupation
 * @property {number} rate
 */

// === Constants ===
const NAMES = ["Alice", "Bob", "Carol", "Dave", "Eve"];
const OCCUPATIONS = ["Writer", "Teacher", "Programmer", "Designer", "Engineer"];
const PRICE_RANGE = { min: 20, max: 200 };
const NUM_FREELANCERS = 100;

const freelancers = Array.from({ length: NUM_FREELANCERS }, makeFreelancer);
const averageRate = getAverageRate();

// create a freelancer array of NUM_FREELANCERS
// this means two things - (1) you need a function to make a freelancer, just like
// we had the makeQuote function and (2) you need to create the array - maybe (probably)
// with Array.from, just like we did in class

/** @returns {Freelancer} a freelancer with a random name, occupation and type */
function makeFreelancer() {
  const name = NAMES[Math.floor(Math.random() * NAMES.length)];
  const occupation =
    OCCUPATIONS[Math.floor(Math.random() * OCCUPATIONS.length)];
  const rate =
    PRICE_RANGE.min +
    Math.floor(Math.random() * (PRICE_RANGE.max - PRICE_RANGE.min));
  return { name, occupation, rate };
}

function getAverageRate() {
  const total = freelancers.reduce((total, currentFreelancer) => {
    return total + currentFreelancer.rate;
  }, 0);
  return total / freelancers.length;
}

// you will need two functions (but not the only two!) to create the UI - you will need
// a function that creates ONE ROW from ONE FREELANCER OBJECT, and a function
// that creates ONE ROW FOR EACH FREELANCER OBJECT in the freelancers array, and then
// puts ALL of those rows inside a table

/*
  the html for the table - this will go in the render function below

  <table>
  <thead>
    <tr>
        <th>Name</th>
        <th>Occupation</th>
        <th>Rate</th>
    </tr>
    <tbody id="FreelancerRows"><body>
  </table> <!-- This will be the container that holds the row -->
*/

// This is the function that creates the freelancer Rows
function FreelancerRow({ name, occupation, rate }) {
  const $tr = document.createElement("tr");
  $tr.innerHTML = `
    <td>${name}</td>
    <td>${occupation}</td>
    <td>${rate}</td>
    `;
  return $tr;
}

function FreelancerRows() {
  const $tbody = document.createElement("tbody");
  const $freelancers = freelancers.map(FreelancerRow);
  $tbody.replaceChildren(...$freelancers);
  return $tbody;
}

function AverageRate() {
  const $p = document.createElement("p");
  $p.textContent = `The average rate is $${averageRate.toFixed(2)}`;
  return $p;
}

// you will need to use this function to calculate the average rate AND display it
// on the screen

function render() {
  const $app = document.querySelector("#app");

  $app.innerHTML = `
    <h1>Freelancer Forum</h1>
        <AverageRate></AverageRate>
        <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Occupation</th>
                <th>Rate</th>
            </tr>
        </thead>
        <tbody id="FreelancerRows"></tbody>
        </table>
  `;
  $app.querySelector("AverageRate").replaceWith(AverageRate());
  $app.querySelector("#FreelancerRows").replaceWith(FreelancerRows());
}
render();

'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = country => {
  const html = `
    <article class="country ">
      <img class="country__img" src="${country.flag}" />
      <div class="country__data">
        <h3 class="country__name">${country.name}</h3>
        <h4 class="country__region">${country.region}</h4>
        <p class="country__row"><span>👫</span>${(
          +country.population / 1000000
        ).toFixed(1)}M people</p>
        <p class="country__row"><span>🗣️</span>${country.languages[0].name}</p>
        <p class="country__row"><span>💰</span>${country.currencies[0].name}</p>
    </div>
  </article>
  `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};
const renderNeighbourhood = (country, className = '') => {
  const html = `
    <article class="country ${className} ">
    <img class="country__img" src="${country.flag}" />
    <div class="country__data">
      <h3 class="country__name">${country.name}</h3>
      <h4 class="country__region">${country.region}</h4>
      <p class="country__row"><span>👫</span>${(
        +country.population / 1000000
      ).toFixed(1)}M people</p>
      <p class="country__row"><span>🗣️</span>${country.languages[0].name}</p>
      <p class="country__row"><span>💰</span>${country.currencies[0].name}</p>
  </div>
  </article>
  `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

// const getCountry = function (country) {
//   const xhr = new XMLHttpRequest();
//   xhr.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
//   xhr.send();
//   xhr.addEventListener('load', () => {
//     const [data] = JSON.parse(xhr.responseText);
//     console.log(data);
//     renderCountry(data);

//     const [neighbours] = data.borders;
//     const xhr2 = new XMLHttpRequest();
//     xhr2.open('GET', `https://restcountries.eu/rest/v2/name/${neighbours}`);
//     xhr2.send();
//     xhr2.addEventListener('load', () => {
//       const [data] = JSON.parse(xhr2.responseText);
//       renderNeighbourhood(data, 'neighbour');
//     });
//   });
// };
const getCountry = function (country) {
  fetch(`https://restcountries.eu/rest/v2/name/${country}`)
    .then(response => response.json())
    .then(data => {
      const [country] = data;
      renderCountry(country);
      const [neighbour] = country.borders;
      if (!neighbour) return;
      fetch(`https://restcountries.eu/rest/v2/name/${neighbour}`)
        .then(response => response.json())
        .then(data => {
          const [neighbour] = data;
          console.log(neighbour);
          renderNeighbourhood(neighbour, 'neighbour');
        });
    })
    .then();
};

btn.addEventListener('click', () => {
  getCountry('russia');
  btn.style.display = 'none';
});

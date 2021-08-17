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
// const renderNeighbourhood = (country, className = '') => {
//   const html = `
//     <article class="country ${className} ">
//       <img class="country__img" src="${country.flag}" />
//       <div class="country__data">
//         <h3 class="country__name">${country.name}</h3>
//         <h4 class="country__region">${country.region}</h4>
//         <p class="country__row"><span>👫</span>${(
//           +country.population / 1000000
//         ).toFixed(1)}M people</p>
//         <p class="country__row"><span>🗣️</span>${country.languages[0].name}</p>
//         <p class="country__row"><span>💰</span>${country.currencies[0].name}</p>
//     </div>
//   </article>
//   `;
//   countriesContainer.insertAdjacentHTML('beforeend', html);
//   countriesContainer.style.opacity = 1;
// };

const getCountry = function (country) {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
  xhr.send();
  xhr.addEventListener('load', () => {
    const [data] = JSON.parse(xhr.responseText);
    console.log(data);
    renderCountry(data);
    // renderNeighbourhood(data, 'neighbour');
  });
};

btn.addEventListener('click', () => {
  getCountry('russia');
});

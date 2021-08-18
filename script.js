'use strict';

const btn = document.querySelector('.btn-country');
const inputCountry = document.querySelector('.input-country');
const countriesContainer = document.querySelector('.countries');
const label = document.querySelector('.label');

const getJSON = (url, errMsg = '') => {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(errMsg);

    return response.json();
  });
};

const renderError = msg => {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

const hideBlocks = () => {
  label.style.display = 'none';
  btn.style.display = 'none';
};

const renderCountry = (country, className = '') => {
  const html = `
    <article class="country ${className} ">
    <img class="country__img" src="${country.flag}" />
    <div class="country__data">
      <h3 class="country__name">${country.name}</h3>
      <h4 class="country__region">${country.region}</h4>
      <p class="country__row"><span>👫</span>${(
        +country.population / 100000
      ).toFixed(1)}M people</p>
      <p class="country__row"><span>🗣️</span>${country.languages[0].name}</p>
      <p class="country__row"><span>💰</span>${country.currencies[0].name}</p>
  </div>
  </article>
  `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const whereAmI = function (lat, lng) {
  getJSON(
    `https://geocode.xyz/${lat},${lng}?geoit=json&auth=181289708789022931241x34591`,
    `can't find country, please reload the page and try again!`
  )
    .then(data => {
      const { country } = data;
      getCountry(country);
    })
    .catch(err => {
      renderError(err);
    });
};

const getCountry = function (country) {
  getJSON(
    `https://restcountries.eu/rest/v2/name/${country}`,
    `can't find country, please reload the page and try again!`
  )
    .then(data => {
      const [country] = data;
      renderCountry(country);
      const neighbour = country.borders;

      neighbour.forEach(neighbour => {
        return getJSON(
          `https://restcountries.eu/rest/v2/alpha/${neighbour}`,
          `can't find country, please reload the page and try again!`
        )
          .then(data => {
            const neighbour = data;
            renderCountry(neighbour, 'neighbour');
          })
          .catch(err => {
            renderError(err);
          });
      });
    })
    .catch(err => {
      renderError(err);
    });
};

btn.addEventListener('click', () => {
  if (!navigator.geolocation) return;
  navigator.geolocation.getCurrentPosition(pos => {
    const { latitude, longitude } = pos.coords;
    whereAmI(latitude, longitude);
  });
  hideBlocks();
});

inputCountry.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    const countryName = inputCountry.value;
    getCountry(countryName);
    inputCountry.value = '';
    hideBlocks();
  }
});

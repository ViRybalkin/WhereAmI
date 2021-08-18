'use strict';

const btn = document.querySelector('.btn-country');
const btnInput = document.querySelector('.btn-input');
const inputCountry = document.querySelector('.input-country');
const countriesContainer = document.querySelector('.countries');
const label = document.querySelector('.label');

const whereAmI = function (lat, lng) {
  fetch(
    `https://geocode.xyz/${lat},${lng}?geoit=json&auth=181289708789022931241x34591`
  )
    .then(response => {
      if (!response.ok) throw new Error(` ${response.status}`);

      return response.json();
    })
    .then(data => {
      const { country } = data;
      if (!country) return;
      getCountry(country);
    })
    .catch(function (err) {
      console.error(err);
    });
};

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

const getCountry = function (country) {
  fetch(`https://restcountries.eu/rest/v2/name/${country}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`can't found country`);
      }
      return response.json();
    })
    .then(data => {
      const [country] = data;
      renderCountry(country);
      const neighbour = country.borders;

      neighbour.forEach(neighbour => {
        if (!neighbour) return;
        fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`)
          .then(response => {
            if (!response.ok) {
              throw new Error(`cant't find country ${neighbour}`);
            }
            return response.json();
          })
          .then(data => {
            const neighbour = data;
            renderNeighbourhood(neighbour, 'neighbour');
          })
          .catch(err => console.error(err));
      });
    });
};

btn.addEventListener('click', () => {
  if (!navigator.geolocation) return;
  navigator.geolocation.getCurrentPosition(pos => {
    const { latitude, longitude } = pos.coords;
    whereAmI(latitude, longitude);
  });
  label.style.display = 'none';
  btn.style.display = 'none';
});

inputCountry.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    const countryName = inputCountry.value;
    getCountry(countryName);
    inputCountry.value = '';
    label.style.display = 'none';
    btn.style.display = 'none';
    label.style.display = 'none';
    btn.style.display = 'none';
  }
});

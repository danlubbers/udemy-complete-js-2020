'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

/*** AJAX CALLS ***/

const getCountry = country => {
  const xmlData = new XMLHttpRequest();
  xmlData.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
  xmlData.send();
  xmlData.addEventListener('load', () => {
    const [data] = JSON.parse(xmlData.responseText);
    console.log(data);

    const html = `
      <article class="country">
        <img class="country__img" src="${data.flag}" />
        <div class="country__data">
          <h3 class="country__name">${data.name}</h3>
          <h4 class="country__region">${data.region}</h4>
          <p class="country__row"><span>👫</span>${(
            +data.population / 1000000
          ).toFixed(1)} million people</p>
          <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
          <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
        </div>
      </article>  
    `;

    countriesContainer.insertAdjacentHTML('beforeend', html);
    // countriesContainer.style.opacity = 1;
  });
};

// getCountry('portugal');

/*** CALLBACK HELL ***/

const renderCountry = (data, className = '') => {
  const html = `
      <article class="country ${className}">
        <img class="country__img" src="${data.flag}" />
        <div class="country__data">
          <h3 class="country__name">${data.name}</h3>
          <h4 class="country__region">${data.region}</h4>
          <p class="country__row"><span>👫</span>${(
            +data.population / 1000000
          ).toFixed(1)} million people</p>
          <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
          <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
        </div>
      </article>  
    `;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  // countriesContainer.style.opacity = 1;
};

// AJAX CALL country 1
const getCountryAndNeighbor = country => {
  const xmlData = new XMLHttpRequest();
  xmlData.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
  xmlData.send();
  xmlData.addEventListener('load', () => {
    const [data] = JSON.parse(xmlData.responseText);
    console.log(data);

    // render first country
    renderCountry(data);

    // Get neighbor country 2
    const [neighbor] = data.borders;

    if (!neighbor) return;

    const xmlData2 = new XMLHttpRequest();
    xmlData2.open('GET', `https://restcountries.eu/rest/v2/alpha/${neighbor}`);
    xmlData2.send();

    xmlData2.addEventListener('load', () => {
      const data2 = JSON.parse(xmlData2.responseText);
      renderCountry(data2, 'neighbour');
    });
  });
};

// getCountryAndNeighbor('portugal');
// getCountryAndNeighbor('usa');

/*** PROMISES AND FETCH ***/

const fetchRequest = fetch('https://restcountries.eu/rest/v2/name/portugal');
// console.log(fetchRequest);

/*** CONSUMING & CHAINING PROMISES ***/

const renderError = errMsg => {
  countriesContainer.insertAdjacentText('beforeend', errMsg);
  countriesContainer.style.opacity = 1;
};

const getCountryData = country => {
  // Country 1
  fetch(`https://restcountries.eu/rest/v2/name/${country}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(
          `Country "${response.url.split('/').pop()}" not found (${
            response.status
          })`
        );
      }
      return response.json();
    })
    .then(data => {
      renderCountry(data[0]);
      const neighbor = data[0].borders[0];

      if (!neighbor) return;

      // Country 2
      return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbor}`);
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(
          `Country Code: "${response.url.split('/').pop()}" not found (${
            response.status
          })`
        );
      }
      return response.json();
    })
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      console.error(err);
      renderError(`Something went wrong: ${err.message}`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

// btn.addEventListener('click', () => getCountryData('portugal'));

// getCountryData('blah');

// Code Challenge 1

const whereAmI = (lat, lng) => {
  fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
    .then(res => {
      if (!res.ok) {
        throw new Error(`Problem with geocoding ${res.status}`);
      }
      return res.json();
    })
    .then(data => {
      console.log(`You are in ${data.city}, ${data.country}`);
      getCountryData(data.country);
    })
    .catch(err => console.error(err));
};

whereAmI(52.508, 13.381);

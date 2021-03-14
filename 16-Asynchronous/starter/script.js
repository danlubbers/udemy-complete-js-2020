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
  countriesContainer.style.opacity = 1;
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

// whereAmI(52.508, 13.381);

/*** EVENT LOOP PRACTICE ***/
// console.log('test start');
// setTimeout(() => console.log('0 sec timer'), 0);
// Promise.resolve('Resolved Promise 1').then(res => console.log(res)); // this resolves first because of microtask queue. Has priority over callback queue ( setTimeout )

// All microtasks have priority - look at console.logs in browser
Promise.resolve('Promise 2').then(res => {
  // for (let i = 0; i < 1000000000; i++) {}
  // console.log(res);
});
// console.log('test end');

/*** BUILDING A SIMPLE PROMISE ***/

// const lotteryPromise = new Promise((resolve, reject) => {
//   console.log('Lottery in progress...');

//   // setTimeout simulates asynchronous code
//   setTimeout(() => {
//     if (Math.random() >= 0.5) {
//       resolve('You WIN!!!');
//     } else {
//       reject(new Error('LOSER!!!'));
//     }
//   }, 2000);
// });

// Consume Promise
// lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// Promisifying setTimeout
const wait = seconds => {
  return new Promise(resolve => setTimeout(resolve, seconds * 1000));
};

// Chaining: No Callback Hell!
// wait(2)
//   .then(() => {
//     console.log('1 second passed.');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('2 seconds passed.');
//     return wait(1);
//   })
//   .then(() => {
//     console.log('3 seconds passed.');
//     return wait(1);
//   })
//   .then(() => console.log('4 seconds passed.'));

// resolves immediately
// Promise.resolve('Immediate').then(res => console.log(res));
// rejects immediately
// Promise.reject(new Error('Rejected')).catch(err => console.error(err));

/*** PROMISIFYING GEOLOCATION ***/

const getPosition = () => {
  return new Promise((resolve, reject) => {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   err => reject(err)
    // );

    // This is the same as what is commented above
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

// getPosition().then(res => console.log(res));

const whereAmI2 = () => {
  getPosition()
    .then(pos => {
      const { latitude: lat, longitude: lng } = pos.coords;

      return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    })
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

// whereAmI2();

// Code Challenge 2

const waitChallenge = seconds => {
  return new Promise(resolve => setTimeout(resolve, seconds * 1000));
};

const imageContainer = document.querySelector('.images');

const createImage = imgPath => {
  return new Promise((resolve, reject) => {
    const image = document.createElement('img');
    image.src = imgPath;

    image.addEventListener('load', () => {
      imageContainer.append(image);
      resolve(image);
    });
    image.addEventListener('error', () => {
      reject(new Error('Image not found!'));
    });
  });
};

let currentImg;

// createImage('/img/img-1.jpg')
//   .then(img => {
//     currentImg = img;
//     console.log('Image 1 loaded!');
//     return waitChallenge(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//     return createImage('img/img-2.jpg');
//   })
//   .then(img => {
//     currentImg = img;
//     console.log('Image 2 loaded!');
//     return waitChallenge(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//   })
//   .catch(err => console.error(err));

/*** CONSUMING ASYNC/AWAIT ***/
/*** ERROR HANDLING: TRY/CATCH ***/

const getPositionAsync = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmIAsync = async function () {
  try {
    // Geolocation
    const pos = await getPositionAsync();
    const { latitude: lat, longitude: lng } = pos.coords;

    // Reverse Geocoding
    const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    if (!resGeo.ok) throw new Error(`Problem getting location data!`);
    const dataGeo = await resGeo.json();
    // console.log(dataGeo);

    // Country Data
    const res = await fetch(
      `https://restcountries.eu/rest/v2/name/${dataGeo.country}`
    );
    if (!res.ok) throw new Error(`Problem getting Country data!`);
    const data = await res.json();
    renderCountry(data[0]);

    return `You are in ${dataGeo.city}, ${dataGeo.country}`;
  } catch (err) {
    console.error(err);
    renderError(`Something went wrong: ${err.message}`);

    // reject promise returned from async function
    throw err;
  }
};

console.log('1: Will get location');

// return the promise value 'You are in city, country'
// whereAmIAsync()
//   .then(city => console.log(`2: ${city}`))
//   .catch(err => console.error(`2: ${err}`))
//   .finally(() => console.log(`3: Finished getting location`));

// using async/await using IIFE instead of then/catch above
(async function () {
  try {
    const city = await whereAmIAsync();
    console.log(`2: ${city}`);
  } catch (err) {
    console.error(`2: ${err}`);
  }
  console.log(`3: Finished getting location`);
})();

/*** PROMISES IN PARALLEL ***/

const getJSON = (url, errorMsg = 'Something went wrong!') => {
  return fetch(url).then(res => {
    if (!res.ok) throw new Error(`${errorMsg} (${res.status})`);
    return res.json();
  });
};

const get3Countries = async function (c1, c2, c3) {
  try {
    // const [data1] = await getJSON(
    //   `https://restcountries.eu/rest/v2/name/${c1}`
    // );
    // const [data2] = await getJSON(
    //   `https://restcountries.eu/rest/v2/name/${c2}`
    // );
    // const [data3] = await getJSON(
    //   `https://restcountries.eu/rest/v2/name/${c3}`
    // );

    // Promise.all - If one promise rejects, they all fail
    const data = await Promise.all([
      getJSON(`https://restcountries.eu/rest/v2/name/${c1}`),
      getJSON(`https://restcountries.eu/rest/v2/name/${c2}`),
      getJSON(`https://restcountries.eu/rest/v2/name/${c3}`),
    ]);

    console.log(data.map(el => el[0].capital)); // loop over data to get capital

    // console.log([data1.capital, data2.capital, data3.capital]);
  } catch (err) {
    console.error(err);
  }
};

get3Countries('portugal', 'canada', 'tanzania');

/*** PROMISE COMBINATORS ***/

// Promise.race
// only get one result of the fastest promise, either fulfilled or rejected
(async function () {
  const res = await Promise.race([
    getJSON(`https://restcountries.eu/rest/v2/name/italy`),
    getJSON(`https://restcountries.eu/rest/v2/name/egypt`),
    getJSON(`https://restcountries.eu/rest/v2/name/mexico`),
  ]);

  console.log(res[0]);
})();

const timeout = function (sec) {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error('request took to long!'));
    }, sec * 1000);
  });
};

Promise.race([
  getJSON(`https://restcountries.eu/rest/v2/name/tanzania`),
  timeout(0.3), // rejects at 0.1
])
  .then(res => console.log(res))
  .catch(err => console.error(err));

// Promise.allSettled *NEW ES2020*
Promise.allSettled([
  Promise.resolve('Success'),
  Promise.reject('Error'),
  Promise.resolve('Success'),
]).then(res => console.log(res));

// Promise.any *NEW ES2021*
Promise.any([
  Promise.resolve('Success'),
  Promise.reject('Error'),
  Promise.resolve('Success'),
]).then(res => console.log(res));

import '../css/style.css';
import '../css/snackbar.css';
import {fetchData} from './fetch.js';

console.log('Moi luodaan nyt tokeneita ja kirjaudutaan sisään');

// Esimerkin takia haut ovat nyt suoraan tässä tiedostossa, jotta harjoitus ei sekoita
// teidän omaa projektin rakennetta

const registerUser = async (event) => {
  event.preventDefault();

  // Haetaan oikea formi
  const registerForm = document.querySelector('.registerForm');

  // Haetaan formista arvot
  const username = registerForm.querySelector('#username').value.trim();
  const password = registerForm.querySelector('#password').value.trim();
  const email = registerForm.querySelector('#email').value.trim();

  // Luodaan body lähetystä varten taustapalvelun vaatimaan muotoon
  const bodyData = {
    username: username,
    password: password,
    email: email,
  };

  // Endpoint
  const url = 'http://localhost:3000/api/users';

  // Options
  const options = {
    body: JSON.stringify(bodyData),
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
  };
  console.log(options);

  // Hae data
  const response = await fetchData(url, options);

  if (response.error) {
    console.error('Error adding a new user:', response.error);
    return;
  }

  if (response.message) {
    console.log(response.message, 'success');
  }

  console.log(response);
  registerForm.reset(); // tyhjennetään formi
};

const loginUser = async (event) => {
  event.preventDefault();

  const loginForm = document.querySelector('.loginForm');
  const username = loginForm.querySelector('input[name=username]').value.trim();
  const password = loginForm.querySelector('input[name=password]').value.trim();

  const bodyData = { username, password };
  const url = 'http://localhost:3000/api/auth/login';

  const options = {
    body: JSON.stringify(bodyData),
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
  };

  console.log('🔹 Lähetetään kirjautumispyyntö:', options);
  const response = await fetchData(url, options);

  if (response.error) {
    console.error('⛔ Kirjautumisvirhe:', response.error);
    alert('Kirjautuminen epäonnistui! Tarkista käyttäjätunnus ja salasana.');
    return;
  }

  if (!response.token || !response.user) {
    console.error('⛔ Backend ei palauttanut tarvittavia tietoja:', response);
    alert('Kirjautuminen epäonnistui! Palvelinvirhe.');
    return;
  }

  console.log('✅ Kirjautuminen onnistui:', response);
  localStorage.setItem('token', response.token);
  localStorage.setItem('nimi', response.user.username);

  alert('Kirjautuminen onnistui, siirrän sinut pääsivulle!');
  
  // Käytetään pientä viivettä, jotta alert näkyy ennen uudelleenohjausta
  setTimeout(() => {
    location.href = './apitest.html';
  }, 500);
};



const checkUser = async (event) => {
  event.preventDefault();

  // Endpoint
  const url = 'http://localhost:3000/api/auth/me';

  //kutsun headers tiedot johon liitetään tokieni
  let headers = {};

  //nyt haetaan token localstoragesta
  const token = localStorage.getItem('token');

  //muodostetaan nyt headers oikeaan muotoon
  headers = { Authorization: `Bearer ${token}`,};

  // Options
  const options = {
    headers: headers,
  };
  console.log(options);

  // Hae data
  const response = await fetchData(url, options);

  if (response.error) {
    console.error('Error adding a new user:', response.error);
    return;
  }

  if (response.message) {
    console.log(response.message, 'success');
  }

  console.log(response);
  loginForm.reset(); // tyhjennetään formi
};

const registerForm = document.querySelector('.registerForm');
registerForm.addEventListener('submit', registerUser);

const loginForm = document.querySelector('.loginForm');
loginForm.addEventListener('submit', loginUser);

const meRequest = document.querySelector('#meRequest');
meRequest.addEventListener('click', checkUser);
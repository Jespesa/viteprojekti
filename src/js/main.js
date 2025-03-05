import '../css/style.css';
import '../css/snackbar.css';
import {getItems} from './items.js';
<<<<<<< HEAD
import {getUsers, addUser} from './users.js';
import {getData} from './test.js';
import {getEntries} from './entries.js';

document.querySelector('#app').innerHTML = `Moi kirjautunut käyttäjä ${localStorage.getItem('nimi')}`;

getData();

const getItemBtn = document.querySelector('.get_items');
getItemBtn.addEventListener('click', getItems);

const getUserBtn = document.querySelector('.get_users');
getUserBtn.addEventListener('click', getUsers);

const addUserForm = document.querySelector('.formpost');
addUserForm.addEventListener('click', addUser);

const getEntriesBtn = document.querySelector('.get_entries');
getEntriesBtn.addEventListener('click', getEntries);
=======
import { getUsers } from './user.js';
import { addUser } from './user.js';

document.querySelector('#app').innerHTML = 'Moi tässä oman APIn harjoituksia';



const getitemsbtn = document.querySelector('.get_items');
getitemsbtn.addEventListener('click', getItems);

const getusersbtn = document.querySelector('.get_users');
getusersbtn.addEventListener('click', getUsers);


const adduserForm = document.querySelector('.formpost');
getusersbtn.addEventListener('click', addUser);
>>>>>>> f68412fc22f7b29e150acd1f1e63c28449f3a758

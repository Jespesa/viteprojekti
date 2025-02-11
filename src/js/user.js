import { fetchData } from "./fetch.js";

// Määritellään dialog-muuttuja globaalisti
const dialog = document.querySelector('.info_dialog');
const closeButton = dialog.querySelector('button');

closeButton.addEventListener('click', () => {
    dialog.close();
});

// Haetaan päiväkirjamerkinnät
const getDiaryEntries = async () => {
    const url = 'http://localhost:3000/api/diaryentries';  // Korvaa omalla endpointillasi
    const diaryEntries = await fetchData(url);

    if (diaryEntries.error) {
        console.error('Virhe fetch-haussa:', diaryEntries.error);
        return;
    }

    console.log(diaryEntries);

    const cardArea = document.querySelector('.card-area');
    cardArea.innerHTML = '';  // Tyhjennetään korttialue ennen uusien merkintöjen näyttämistä

    diaryEntries.forEach((entry) => {
        const card = document.createElement('div');
        card.classList.add('card');
        
        card.innerHTML = `
            <div class="card-img">
                <img src="/src/img/lilonukkuu.jpg" alt="Diary Entry Image" />
            </div>
            <div class="card-diary">
                <p><strong>Mood:</strong> ${entry.mood}</p>
                <p><strong>Weight:</strong> ${entry.weight} kg</p>
                <p><strong>Sleep:</strong> ${entry.sleep_hours} hours</p>
                <p><strong>Notes:</strong> ${entry.notes}</p>
            </div>
        `;

        cardArea.appendChild(card);
    });
};

// Hae päiväkirjamerkinnät -nappulan tapahtumakuuntelija
document.querySelector('.get_diary_entries').addEventListener('click', getDiaryEntries);

// Haetaan käyttäjät ja täytetään taulukko
const getUsers = async () => {
    const url = 'http://localhost:3000/api/users';
    const users = await fetchData(url);

    if (users.error) {
        console.error('Virhe fetch-haussa:', users.error);
        return;
    }

    console.log(users);
    const tableBody = document.querySelector('.tbody');
    tableBody.innerHTML = '';

    users.forEach((user) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td><button class="check" data-id="${user.user_id}">Info</button></td>
            <td><button class="del" data-id="${user.user_id}">Delete</button></td>
            <td>${user.user_id}</td>
        `;

        tableBody.appendChild(row);
    });

    addButtonEventListeners();
};

// Lisää event listenerit Info-napeille
const addButtonEventListeners = () => {
    document.querySelectorAll('.check').forEach((button) => {
        button.addEventListener('click', async (event) => {
            const userId = event.target.dataset.id;
            if (!userId) {
                console.error('User ID is missing or undefined');
                return;
            }

            try {
                const userDetails = await fetchData(`http://localhost:3000/api/users/${userId}`);
                if (userDetails.error) {
                    console.error('Error fetching user details:', userDetails.error);
                    return;
                }

                // Päivitetään dialogin sisältö ja avataan se
                const spans = dialog.querySelectorAll('.dialog-content span');
                spans[0].textContent = userDetails.user_id;
                spans[1].textContent = userDetails.username;
                spans[2].textContent = userDetails.email;
                spans[3].textContent = userDetails.user_level;

                dialog.showModal();

            } catch (error) {
                console.error('Error fetching user:', error);
            }
        });
    });
};

// Käyttäjän lisääminen
const addUser = async (event) => {
    event.preventDefault(); // Estää sivun päivityksen

    const username = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();
    const email = document.querySelector('#email').value.trim();

    if (!username || !password || !email) {
        showToast('Täytä kaikki kentät ennen käyttäjän lisäämistä.', 'error');
        return;
    }

    const bodyData = {
        username: username,
        password: password,
        email: email,
    };

    const url = 'http://localhost:3000/api/users';
    const options = {
        body: JSON.stringify(bodyData),
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const response = await fetchData(url, options);

    if (response.error) {
        console.error('Virhe fetch-haussa:', response.error);
        showToast(response.error, 'error');
        return;
    }

    showToast(response.message || 'Käyttäjä lisätty onnistuneesti!', 'success');

    document.querySelector('.addform').reset(); // Tyhjennetään lomake
    getUsers(); // Päivitetään käyttäjälista
};

// Toast-viestien näyttäminen
const showToast = (message, type) => {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerText = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
};

// "DOMContentLoaded" event listener
document.addEventListener("DOMContentLoaded", () => {
    // "Get all users" -napin event listener
    const getUsersButton = document.querySelector('.get_users');
    if (getUsersButton) {
        getUsersButton.addEventListener('click', getUsers);
    } else {
        console.error('Elementti ".get_users" ei löytynyt. Tarkista HTML.');
    }

    // "Add User" -napin event listener
    const addUserForm = document.querySelector('.formpost');
    if (addUserForm) {
        addUserForm.addEventListener('click', addUser);
    } else {
        console.error('Elementti ".formpost" ei löytynyt. Tarkista HTML.');
    }
});

export { getUsers, addUser };

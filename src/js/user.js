import { fetchData } from "./fetch.js";

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

                alert(`User Info:\nUsername: ${userDetails.username}\nEmail: ${userDetails.email}\nUser ID: ${userDetails.user_id}\nUser Level: ${userDetails.user_level}\nCreated At: ${userDetails.created_at}`);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        });
    });
};

// "Get all users" -napin event listener
document.addEventListener("DOMContentLoaded", () => {
    const getUsersButton = document.querySelector('.get_users');
    if (getUsersButton) {
        getUsersButton.addEventListener('click', getUsers);
    } else {
        console.error('Elementti ".get_users" ei löytynyt. Tarkista HTML.');
    }
});

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

// "Add User" -napin event listener
document.addEventListener("DOMContentLoaded", () => {
    const addUserForm = document.querySelector('.formpost');
    if (addUserForm) {
        addUserForm.addEventListener('click', addUser);
    } else {
        console.error('Elementti ".formpost" ei löytynyt. Tarkista HTML.');
    }
});

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

export { getUsers, addUser };

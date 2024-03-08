//1. Нужно вывести список пользователей

const apiURL = "https://jsonplaceholder.typicode.com";
const usersListEl = document.querySelector(".users-list");
const userInfoEl = document.querySelector(".user-info");

//1. Нужно реализовать запрос получения пользователей
//2. Реализовать обработчик ответа от сервера
//3. Рендер списка пользователей
//4. Повесить события click на список 
//5. Получаем id пользователя 
//6. Делаем запрос на сервер получая инфу об выбраном пользователе
//7. Обработчик на получение ответа от сервера 
//8. Рендерим инфу пользователя

//Получаем id пользователя
usersListEl.addEventListener("click", (e) => {
    e.preventDefault();

    if (e.target.dataset.userId) {
        getUserInfoHTTP(e.target.dataset.userId, onGetUserInfoCallback);
    }
});



//Реализация запроса получения пользователей
function getUsersHTTP(cb) {
    const xhr = new XMLHttpRequest();

    xhr.open("GET", `${apiURL}/users`);

    xhr.addEventListener("load", () => {
        if (xhr.status !== 200) {
            console.log('Error', xhr.status); //Проврека нас статус запроса
            return;
        }

        const res = JSON.parse(xhr.responseText);

        cb(res);
    });

    xhr.send();
}

//Делаем запрос на сервер получая инфу об выбраном пользователе
function getUserInfoHTTP(id, cb) {
    const xhr = new XMLHttpRequest();

    xhr.open("GET", `${apiURL}/users/${id}`);

    xhr.addEventListener("load", () => {
        if (xhr.status !== 200) {
            console.log('Error', xhr.status); //Проврека нас статус запроса
            return;
        }

        const res = JSON.parse(xhr.responseText);

        cb(res);
    });

    xhr.send();
}

function onGetUserInfoCallback(user) {
    if (!user.id) {
        console.log("User not found");
        return;
    }
    renderUserInfo(user);
}
//Реализация обработчика ответа от сервера
function onGetUsersCallBack(users) {
    if (!users.length) {
        return;
    }

    renderUsersList(users);
}

//Рендер списка пользователей
function renderUsersList(users) {
    const fragment = users.reduce(
        (acc, user) => acc + userListItemTemplate(user),
        ''
    );

    usersListEl.insertAdjacentHTML('afterbegin', fragment);
}

function renderUserInfo(user) {
    userInfoEl.innerHTML = "";

    const template = userInfoTemplate(user);
    userInfoEl.insertAdjacentHTML('afterbegin', template);
}

//Создаем базовую разметку для одного user
function userListItemTemplate(user) {
    return `
<button type="button" class="list-group-item list-group-item-action" data-user-id ="${user.id}">
  ${user.name}
</button>
`;
}

function userInfoTemplate(user) {
    return `
<div class="card border-dark mb-3">
 <div class="card-header">${user.name}</div>
 <div class="card-body" text-dark>
  <h5 class="card-title">${user.email}</h5>
  <ul class="list-group list-group-flush">
    <li class="list-group-item"><b>NickName:</b>${user.username}</li>
    <li class="list-group-item"><b>Website:</b>${user.website}</li>
    <li class="list-group-item"><b>Company:</b>${user.company.name}</li>
    <li class="list-group-item"><b>City:</b>${user.address.city}</li>
  </ul>
 </div>
<div class="card-footer bg-transparent border-dark">Phone: ${user.phone}</div>
</div>
`;
}

getUsersHTTP(onGetUsersCallBack);


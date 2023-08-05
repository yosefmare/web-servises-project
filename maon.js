const url = "https://jsonplaceholder.typicode.com/";
// create variable data with empty array value 
let data = []
function searchUser(e) {
    // store the search value in variable then filter the empty array in accordance the search value
    let searchString = e.target.value
    let filteredUsers = data.filter((user) => {
        return (
            user.name.includes(searchString) ||
            user.email.includes(searchString)
        );
    });
    // takes the filtered array as a argument to visible only the users that maching the filter proses
    displayUsers(filteredUsers)
}

async function loadUsers() {
    const response = await fetch(`${url}users`);
    data = await response.json();
    // take the response users data as a argument to display it in the page
    displayUsers(data)
}

function displayUsers(usersArray) {
    const users = usersArray.map(user => {
        return `
        <!-- user info card -->
        <div class="user-detels">
            <div class="info">
                <label><b>id:</b> <input id="userId" onclick="getUserTodosAndPosts(this)" class="user-id" type="button" value="${user.id}"></label>
                <label><b>name:</b> <input type="text" value="${user.name}"></label>
                <label><b>email:</b> <input type="text" value="${user.email}"></label>
            </div>
            
            <div class="user-btn">
                <button class="proses-btn more-info" onmouseover="showMoreData(this)" onclick = "collapseMoreData(this)">Outer Data</button>
                <div>
                    <button class="proses-btn update" onclick = "updateUser(this)">update</button>
                    <button class="proses-btn delete" onclick= "deleteUser(this)">delete</button>
                </div>
            </div>
            
            <div class="user-more-info" style="display: none;">
                <label>street: <input type="text" value= "${user.address.street}"></label>
                <label>city: <input type="text" value = "${user.address.city}"></label>
                <label>zip-code: <input type="text" value = "${user.address.zipcode}"></label>
            </div>
        </div>
        <!-- user info card -->
    `
    });
    document.getElementById('all-users').innerHTML = users
}

async function getUserTodosAndPostsRequest(userId, path) {
    const response = await fetch(`${url}${path}?userId=${userId}`);
    const data = await response.json();
    return data
}

async function getUserTodosAndPosts(e) {
    document.getElementById('tasks').innerHTML = "";
    const data = await getUserTodosAndPostsRequest(e.value, "todos")
    data.forEach(todo => {
        if (todo.completed === true) {
            document.getElementById('tasks').innerHTML += `
        <div class="users-todos">
        <div class="task">
            <label>
                <b>title:</b> <input type="text" value="${todo.title}">
            </label>
            <label>
                <b>done:</b> <input type="text"value="${todo.completed}">
            </label>
        </div>
        <div class="check-task" style="display: none;">
            <button id="status">completed</button>
        </div>
    </div>
        `;
        } else {
            document.getElementById('tasks').innerHTML += `
        <div class="users-todos">
        <div class="task">
            <label>
                <b>title:</b> <input type="text" value="${todo.title}">
            </label>
            <label>
                <b>done:</b> <input type="text"value="${todo.completed}">
            </label>
        </div>
        <div class="check-task">
            <button onclick="completedTodo(this, ${todo.id})" id="status">completed</button>
        </div>
    </div>
        `;
        }
    });
    getPosts(e)
}

async function getPosts(e) {
    document.getElementById('posts').innerHTML = "";

    const data = await getUserTodosAndPostsRequest(e.value, "posts")
    data.forEach(post => {
        document.getElementById('posts').innerHTML += `
    <div class="post">
                        <header>
                            <h3>${post.title}</h3>
                        </header>
                        <div class="post-content">
                            <p>${post.body}</p>
                        </div>
                    </div>
    `;

    });

}


function showMoreData(e) {
    e.parentElement.parentElement.childNodes[5].style.display = ""
}

function collapseMoreData(e) {
    e.parentElement.parentElement.childNodes[5].style.display = "none"
}

async function updateRequest(path, updateProperty, userId) {


    const updateData = {
        // Add your dynamic properties here
        ...updateProperty,
    };


    const response = await fetch(`${url}${path}/${userId}`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
    })

    const data = await response.json();
    console.log(data);
}

async function deleteUser(e) {
    const userId = e.parentElement.parentElement.parentElement.childNodes[1].childNodes[1].childNodes[2].value;
    const response = await fetch(`${url}users/${userId}`, {
        method: "DELETE"
    })
    const data = await response.json();
    console.log(`user: ${userId} Deleted`, data);

    e.parentElement.parentElement.parentElement.remove()

}

function updateUser(e) {
    //  the user Enter the name and email values
    const userId = e.parentElement.parentElement.parentElement.childNodes[1].childNodes[1].childNodes[2].value;
    let newUserName = prompt("type new user name ")
    let newUserEmail = prompt("type new user email ")

    //  changing the default user and email values
    e.parentElement.parentElement.parentElement.childNodes[1].childNodes[3].childNodes[2].value = newUserName;
    e.parentElement.parentElement.parentElement.childNodes[1].childNodes[5].childNodes[2].value = newUserEmail;

    updateRequest("users", { name: newUserName, email: newUserEmail }, userId)
}

function completedTodo(e, userId){
    e.parentElement.style.display = "none";
    e.parentElement.parentElement.childNodes[1].childNodes[3].childNodes[3].value = true;
    updateRequest("todos", {completed : true}, userId)
}
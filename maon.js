const url = "https://jsonplaceholder.typicode.com/"

async function getUsers() {
    const response = await fetch(`${url}users`);
    const data = await response.json()
    data.forEach(user => {
        document.getElementById('users').innerHTML += `
        <!-- user info card -->
        <div class="user-detels">
            <div class="info">
                <label><b>id:</b> <input class="user-id" type="button" value="${user.id}"></label>
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
}

function showMoreData(e) {
    e.parentElement.parentElement.childNodes[5].style.display = ""
}

function collapseMoreData(e) {
    e.parentElement.parentElement.childNodes[5].style.display = "none"
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

async function updateUser(e) {
    //  the user Enter the name and email values
    const userId = e.parentElement.parentElement.parentElement.childNodes[1].childNodes[1].childNodes[2].value;
    let newUserName = prompt("type new user name ")
    let newUserEmail = prompt("type new user email ")

    //  the default user and email values
    e.parentElement.parentElement.parentElement.childNodes[1].childNodes[3].childNodes[2].value = newUserName;
    e.parentElement.parentElement.parentElement.childNodes[1].childNodes[5].childNodes[2].value = newUserEmail;
    // call API url to update
    const response = await fetch(`${url}users/${userId}`, {
        method: 'PATCH',
        body: JSON.stringify({
            name: newUserName,
            email: newUserEmail
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })

    const data = await response.json();
    console.log(data); 


}
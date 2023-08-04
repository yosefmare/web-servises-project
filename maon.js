const url = "https://jsonplaceholder.typicode.com/"

async function getUsers(){
    const response = await fetch(`${url}users`);
    const data = await response.json()
    data.forEach(user => {
        document.getElementById('users').innerHTML +=`
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
                    <button class="proses-btn update">update</button>
                    <button class="proses-btn delete">delete</button>
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
getUsers()


function showMoreData(e){
    e.parentElement.parentElement.childNodes[5].style.display = ""
}

function collapseMoreData(e){
    e.parentElement.parentElement.childNodes[5].style.display = "none"
}
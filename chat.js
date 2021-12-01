function get_user_servers() {
    user_id = sessionStorage.getItem("user_id");
    fetch(`http://127.0.0.1:8000/users/${user_id}/servers`, {
        method: "GET",
    })
        .then(response => response.json())
        .then(data => {
            const server_select = document.getElementById("server_select");
            data.forEach(server => {
                const option = document.createElement("option");
                const option_text = document.createTextNode(`${server["server"]["name"]}`);
                option.appendChild(option_text);
                option.value = server["server_id"];
                server_select.appendChild(option);
            })
        })
}

function get_server_members() {
    const server_id = document.getElementById("server_select").value;

    const ul = document.getElementById("server_members_list");
    ul.innerHTML = "";

    const server_members_div = document.getElementById("server_members_div");

    fetch(`http://127.0.0.1:8000/servers/${server_id}/members`, {
        method: "GET",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token")
        }
    })
        .then(response => response.json())
        .then(data => {
            data.forEach(user => {
                const li = document.createElement("li");
                const li_text = document.createTextNode(`${user["user"]["username"]}`);
                li.appendChild(li_text);
                ul.appendChild(li);
            })
        })
}

const user_id_form = document.getElementById("user_id_form");

user_id_form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(user_id_form);

    const user_id = formData.get("user_id")
    console.log(user_id);
})

const data = new FormData();

data.append("username", "user@gmail.com");
data.append("password", 123)

var dev_url = "http://127.0.0.1:8000/login"
var heroku_url = "https://chat-api-johann.herokuapp.com/login"

fetch(dev_url, {
    method: "POST",
    body: data
})
    .then(response => response.json())
    .then(data => {
        console.log(data);
        localStorage.setItem("access_token", data["access_token"])
    })

function get_server() {
    fetch("http://127.0.0.1:8000/servers/6", {
        method: "GET",
        headers: {
            "content-type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("access_token")
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
}
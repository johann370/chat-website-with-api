const dev_url = "http://127.0.0.1:8000";
const heroku_url = "https://chat-api-johann.herokuapp.com";

function get_user_servers() {
    user_id = sessionStorage.getItem("user_id");
    fetch(`${dev_url}/users/${user_id}/servers`, {
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

    fetch(`${dev_url}/servers/${server_id}/members`, {
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


function createServer() {
    const create_server_form = document.getElementById("create_server_form");
    const formData = new FormData(create_server_form);

    fetch(`${dev_url}/servers`, {
        method: "POST",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
            "content-type": "application/json"
        },
        body: JSON.stringify({ "name": formData.get("server_name") })
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data["detail"]) {
                const error = document.getElementsByClassName("error");
                if (error[0].childNodes[0] == null) {
                    const p = document.createElement("p");
                    p.id = "error_text";
                    const node = document.createTextNode(data["detail"]);
                    p.appendChild(node);
                    error[0].appendChild(p);
                } else {
                    document.getElementById("error_text").innerText = "Please enter all fields";
                }
            } else {
                const msg = document.getElementsByClassName("msg");
                const p = document.createElement("p");
                const node = document.createTextNode("Successfully created server");
                p.appendChild(node);
                msg[0].appendChild(p);
            }
        })
}

function joinServer() {
    const join_server_form = document.getElementById("join_server_form");
    const formData = new FormData(join_server_form);

    fetch(`${dev_url}/servers/${formData.get("server_id")}`, {
        method: "POST",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
            "content-type": "application/json"
        },
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data["detail"]) {
                const error = document.getElementsByClassName("error");
                if (error[0].childNodes[0] == null) {
                    const p = document.createElement("p");
                    p.id = "error_text";
                    const node = document.createTextNode(data["detail"]);
                    p.appendChild(node);
                    error[0].appendChild(p);
                } else {
                    document.getElementById("error_text").innerText = "Please enter all fields";
                }
            } else {
                const msg = document.getElementsByClassName("msg");
                const p = document.createElement("p");
                const node = document.createTextNode("Successfully joined server");
                p.appendChild(node);
                msg[0].appendChild(p);
            }
        })
}

function signup() {
    const signup_form = document.getElementById("signup_form");
    const formData = new FormData(signup_form);

    if (formData.get("username") !== "" && formData.get("email") !== "" && formData.get("password") !== "" && formData.get("password_repeat") !== "") {
        if (formData.get("password") === formData.get("password_repeat")) {

            fetch(`${dev_url}/users`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    "username": formData.get("username"),
                    "email": formData.get("email"),
                    "password": formData.get("password")
                })
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    if (data["detail"][0]["msg"]) {
                        const error = document.getElementsByClassName("error");
                        if (error[0].childNodes[0] == null) {
                            const p = document.createElement("p");
                            p.id = "error_text";
                            const node = document.createTextNode(data["detail"][0]["msg"]);
                            p.appendChild(node);
                            error[0].appendChild(p);
                        } else {
                            document.getElementById("error_text").innerText = "Please enter all fields";
                        }
                    } else if (data["detail"]) {
                        const error = document.getElementsByClassName("error");
                        if (error[0].childNodes[0] == null) {
                            const p = document.createElement("p");
                            p.id = "error_text";
                            const node = document.createTextNode(data["detail"]);
                            p.appendChild(node);
                            error[0].appendChild(p);
                        } else {
                            document.getElementById("error_text").innerText = "Please enter all fields";
                        }
                    } else {
                        document.location = "index.html";
                    }
                })
        } else {
            const error = document.getElementsByClassName("error");
            if (error[0].childNodes[0] == null) {
                const p = document.createElement("p");
                p.id = "error_text";
                const node = document.createTextNode("Passwords do not match");
                p.appendChild(node);
                error[0].appendChild(p);
            } else {
                document.getElementById("error_text").innerText = "Passwords do not match";
            }
        }
    } else {
        const error = document.getElementsByClassName("error");
        if (error[0].childNodes[0] == null) {
            const p = document.createElement("p");
            p.id = "error_text";
            const node = document.createTextNode("Please enter all fields");
            p.appendChild(node);
            error[0].appendChild(p);
        } else {
            document.getElementById("error_text").innerText = "Please enter all fields";
        }
    }
}

function load_messages() {
    var server_id = document.getElementById("server_select").value;
    const chatbox = document.getElementById("chatbox_div");
    chatbox.innerHTML = "";
    fetch(`${dev_url}/messages/${server_id}`, {
        method: "GET",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token")
        }
    })
        .then(response => response.json())
        .then(data => {
            data.forEach(message => {
                const p = document.createElement("p");
                const p_text = document.createTextNode(`${message["author"]["username"]}: ${message["content"]}`);
                p.appendChild(p_text);
                const chatbox = document.getElementById("chatbox_div");
                chatbox.append(p);
                chatbox.scrollTop = chatbox.scrollHeight;
            })
        })
}

function send_message() {
    const message_form = document.getElementById("message_form");
    const formData = new FormData(message_form);

    if (formData.get("content") !== "") {
        var server_id = document.getElementById("server_select").value;
        fetch(`${dev_url}/messages/${server_id}`, {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("access_token"),
                "content-type": "application/json"
            },
            body: JSON.stringify({ content: formData.get("content") })
        })
            .then(response => response.json())
            .then(data => {
                load_messages();
            })
    }
}

function login() {
    const login_form = document.getElementById("login_form");
    const formData = new FormData(login_form);

    if (formData.get("username") !== "" && formData.get("password") !== "") {
        fetch(`${dev_url}/login`, {
            method: "POST",
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data["detail"]) {
                    const error = document.getElementsByClassName("error");
                    if (error[0].childNodes[0] == null) {
                        const p = document.createElement("p");
                        p.id = "error_text";
                        const node = document.createTextNode(data["detail"]);
                        p.appendChild(node);
                        error[0].appendChild(p);
                    } else {
                        document.getElementById("error_text").innerText = "Please enter all fields";
                    }
                } else {
                    localStorage.setItem("access_token", data["access_token"])
                    sessionStorage.setItem("user_id", data["user_id"]);
                    document.location = "index.html";
                }
            })
    } else {
        const error = document.getElementsByClassName("error");
        if (error[0].childNodes[0] == null) {
            const p = document.createElement("p");
            p.id = "error_text";
            const node = document.createTextNode("Please enter all fields");
            p.appendChild(node);
            error[0].appendChild(p);
        } else {
            document.getElementById("error_text").innerText = "Please enter all fields";
        }
    }
}
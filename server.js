function createServer() {
    const dev_url = "http://127.0.0.1:8000/servers";
    const create_server_form = document.getElementById("create_server_form");
    const formData = new FormData(create_server_form);

    fetch(dev_url, {
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
    const dev_url = "http://127.0.0.1:8000/servers";
    const join_server_form = document.getElementById("join_server_form");
    const formData = new FormData(join_server_form);

    fetch(`${dev_url}/${formData.get("server_id")}`, {
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
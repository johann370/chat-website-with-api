const dev_url = "http://127.0.0.1:8000/messages"
function load_messages() {
    var server_id = document.getElementById("server_select").value;
    const chatbox = document.getElementById("chatbox_div");
    chatbox.innerHTML = "";
    fetch(`${dev_url}/${server_id}`, {
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
        fetch(`${dev_url}/${server_id}`, {
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
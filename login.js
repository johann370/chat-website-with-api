function login() {
    const login_form = document.getElementById("login_form");
    const formData = new FormData(login_form);

    if (formData.get("username") !== "" && formData.get("password") !== "") {
        const dev_url = "http://127.0.0.1:8000/login"

        fetch(dev_url, {
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
function signup() {
    const signup_form = document.getElementById("signup_form");
    const formData = new FormData(signup_form);

    if (formData.get("username") !== "" && formData.get("email") !== "" && formData.get("password") !== "" && formData.get("password_repeat") !== "") {
        if (formData.get("password") === formData.get("password_repeat")) {
            const dev_url = "http://127.0.0.1:8000/users";

            fetch(dev_url, {
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
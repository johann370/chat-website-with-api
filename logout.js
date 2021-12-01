function logout() {
    sessionStorage.removeItem("user_id");
    localStorage.removeItem("access_token");
    document.location = "index.html";
}
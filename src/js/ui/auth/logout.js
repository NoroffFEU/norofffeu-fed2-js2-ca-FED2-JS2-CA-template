document.getElementById("logoutBtn").addEventListener("click", onLogout);

export function onLogout() {
    // Remove token from local storage
    localStorage.removeItem("token");
    // Redirect to login page
    window.location.href = "auth/login/";
    alert("You have been logged out.");
}

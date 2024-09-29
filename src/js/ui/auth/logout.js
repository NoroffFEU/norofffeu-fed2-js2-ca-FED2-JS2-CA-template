document.getElementById("logoutBtn").addEventListener("click", onLogout);

// Function called when logout button is clicked.
// Removes token from local storage, redirects to login page.
export function onLogout() {
    // Remove token from local storage
    localStorage.removeItem("token");
    // Redirect to login page
    window.location.href = "auth/login/";
    alert("You have been logged out.");
}

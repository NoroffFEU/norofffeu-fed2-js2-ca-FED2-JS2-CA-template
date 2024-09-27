
export function onLogout() {
    // Remove the token from local storage
    localStorage.removeItem('token'); // Replace 'authToken' with the actual key you use

    // Redirect to the login page
    window.location.href = './auth/login/';
}

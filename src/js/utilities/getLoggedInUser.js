// Gets the logged in user from local storage.
export function getLoggedInUser() {
    return JSON.parse(localStorage.getItem("user"));
}
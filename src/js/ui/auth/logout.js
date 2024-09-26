import NoroffAPI from "../../api";
const api = new NoroffAPI();

export async function onLogout() {
    alert ("You are now logged out")
    const data = await api.auth.logout()
    return data;
}

// const logoutButton = document.getElementById('logoutButton');
// console.log(logoutButton)
// logoutButton.addEventListener('click', onLogout);

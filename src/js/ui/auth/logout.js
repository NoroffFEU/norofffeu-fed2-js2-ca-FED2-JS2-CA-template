import NoroffAPI from "../../api";

const api = new NoroffAPI();

export async function onLogout() {
    alert ("lockout is ready to use")
   await api.auth.logout();
}


import { onLogout } from "../auth/logout";

export function setLogoutListener() {
    const logoutButton = document.getElementById('logout-btn')
    if (logoutButton){
        logoutButton.addEventListener('click', async () => {
            await onLogout()
        })
    }
}

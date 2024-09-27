import { onLogout } from '../auth/logout.js';

export function setLogoutListener() {
    const logoutBtn = document.getElementById('logOut');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent the default anchor link behavior
            onLogout();
        });
    }
}


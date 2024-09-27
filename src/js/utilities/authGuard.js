import { getToken } from '../auth/key';

export function authGuard() {
    const token = getToken();
    if (!token) {
        window.location.href = '../auth/login'; // Redirect to login if not authenticated
        return false;
    }
    return true;
}


import { updateNavigation } from '../../../app.js';

export function onLogout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  updateNavigation(); // Call this after removing the token
  window.location.href = '/auth/login/'; // Redirect to login page
}

export default onLogout;
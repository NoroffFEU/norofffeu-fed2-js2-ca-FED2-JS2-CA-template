// src/js/utilities/authGuard.js

export function authGuard() {
  const token = localStorage.getItem('token');
  if (!token) {
      console.log('No token found, redirecting to login');
      window.location.href = '/auth/login/';
  } else {
      console.log('Token found, user is authenticated');
  }
}
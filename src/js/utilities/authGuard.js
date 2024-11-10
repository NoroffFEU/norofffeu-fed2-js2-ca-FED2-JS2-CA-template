// src/js/utilities/authGuard.js

/**
 * Checks if the user is authenticated and redirects to the login page if not.
 * 
 * @function authGuard
 * @returns {void}
 * 
 * @example
 * // Call this function to check if the user is authenticated
 * authGuard();
 */

export function authGuard() {
  const token = localStorage.getItem('token');
  if (!token) {
      console.log('No token found, redirecting to login');
      window.location.href = '/auth/login/';
  } else {
      console.log('Token found, user is authenticated');
  }
}
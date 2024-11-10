/**
 * Logs the user out of the application by removing the user's token and redirecting to the home page.
 * 
 * @function onLogout
 * @returns {void}
 */

export function onLogout() {
  console.log('Logout function called');
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('name');
  localStorage.removeItem('email');
  
  console.log('Local storage cleared');
  
  console.log('Redirecting to home page');
  window.location.replace('/');
}

export default onLogout;
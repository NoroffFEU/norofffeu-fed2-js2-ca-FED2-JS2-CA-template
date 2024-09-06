export function onLogout(event) {
  event.preventDefault();

  localStorage.removeItem('token');
  localStorage.removeItem('user');
  alert("You have successfully logged out.");
  window.location.href = "/";
}

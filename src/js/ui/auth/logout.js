export function onLogout(event) {
  event.preventDefault();

  localStorage.removeItem('accessToken');
  alert("You have successfully logged out.");
  window.location.href = "/";
}

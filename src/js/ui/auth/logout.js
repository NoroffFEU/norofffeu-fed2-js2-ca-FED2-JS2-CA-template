import NoroffAPI from "../../api";

export function onLogout(event) {
  event.preventDefault();

  NoroffAPI.user = null;
  NoroffAPI.token = null;

  // localStorage.removeItem('token');
  // localStorage.removeItem('user');
  alert("You have successfully logged out.");
  window.location.href = "/";
}

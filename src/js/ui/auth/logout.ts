export function onLogout() {
  localStorage.removeItem("token");
  localStorage.removeItem("userName");
  window.location.href = "/";
}

export function redirectIfAuthenticated() {
  if (localStorage.token) {
    window.location.href = "/home/";
  }
}

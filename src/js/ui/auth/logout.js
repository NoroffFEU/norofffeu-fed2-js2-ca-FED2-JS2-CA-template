export function onLogout() {
  console.log("click");

  localStorage.removeItem("userinfo");
  localStorage.removeItem("token");
  window.location.href = "/auth/login/";
}

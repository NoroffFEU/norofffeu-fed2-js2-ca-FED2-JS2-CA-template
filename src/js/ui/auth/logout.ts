// maybe to delete

export function onLogout() {
  const confirmLogout = confirm("Are you sure you want to logout?");
  if (confirmLogout) {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    window.location.href = "/";
  } else {
    return;
  }
}

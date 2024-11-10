
export function onLogout() {    
    localStorage.removeItem("postId")
    localStorage.removeItem("token");
    alert("Logged out");
    window.location.href = "/auth/login/";
}
  
export function setLogoutListener() {
    const logoutBtn = document.querySelector(".logoutBtn");

    logoutBtn.addEventListener("click", function () {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userID");
        window.location.href = "/auth/login/";
    });
}

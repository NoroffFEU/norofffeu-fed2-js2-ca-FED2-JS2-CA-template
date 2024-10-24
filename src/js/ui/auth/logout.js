import logoutService from "../../api/services/logoutService";

export async function onLogout() {
    alert ("You are now logged out")
    await logoutService.logout()
    window.location.href = '/'
}
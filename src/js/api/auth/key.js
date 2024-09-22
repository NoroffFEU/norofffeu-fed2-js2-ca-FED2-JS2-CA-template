export async function getKey() {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
        return accessToken;
    } else {
        console.error("Access denied");
        return null;
    }
}

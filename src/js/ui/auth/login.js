import { saveKey } from "../../api/auth/key";
import { login } from "../../api/auth/login";

export async function onLogin(event) {
  event.preventDefault();

  const formData = {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  };

  try {
    const responseData = await login(formData);
    console.log("User successfully logged in!", responseData);
    // Save access token and profile data to local storage
    await saveKey("accessToken", responseData.data.accessToken);
    await saveKey("profileData", responseData);
  } catch (error) {
    console.error("Login failed:", error.message);
  }
}

import { register } from "../../api/auth/register.js";

// Called when registration form is submitted. 
// Sets values and calls register(POST) function from API.
export async function onRegister(event) {
  event.preventDefault();

  const username = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const registerData = {
    name: username,
    email: email,
    password: password,
  };

  try {
    const response = await register(registerData);
    console.log(response);
    window.location.href = '/'; // Redirect to home page
  } catch (error) {
    console.error("An error occurred during registration:", error);
    alert(error.message);
  }
}

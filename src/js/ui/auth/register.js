import { register } from "../../api/auth/register";

export async function onRegister(event) {
  event.preventDefault(); // Prevent default form submission behavior

  // Gather only the required form data
  const formData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  };

  try {
    const responseData = await register(formData);

    // If responseData is successfully returned
    console.log("User registered successfully!", responseData);
  } catch (error) {
    console.log("Registration failed:", error.message);
  }
}

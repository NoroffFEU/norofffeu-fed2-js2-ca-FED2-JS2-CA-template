import NoroffAPI from "../../api/index.js";

const api = new NoroffAPI();

export async function onRegister(event) {
  event.preventDefault();

  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

  const name = nameInput.value;
  const email = emailInput.value;
  const password = passwordInput.value;

  nameInput.value = "";
  emailInput.value = "";
  passwordInput.value = "";

  try {
    await api.auth.register({ name, email, password });
    alert(`Registration successful!\nUsername: ${name}\nEmail: ${email}`);
    window.location.href = "/auth/login/";
  } catch(error) {
    alert(`${error.message}.\nPlease try again.`);
  }
}
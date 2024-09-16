import { fetchLogin } from "../../api/auth/login";

function checkEmail(email) {
  if (email.includes("@stud.noroff.no") || email.includes("@noroff.no")) {
    return true;
  }

  alert("Email must contain @stud.noroff.no or @noroff.no");
  return false;
}

function checkPassword(password) {
  if (password.length >= 8) {
    return true;
  }

  alert("Password must be at least 8 characters long");
  return false;
}

export async function onLogin(event) {
  event.preventDefault();

  //console.log(event.target[0].value + " " + event.target[1].value);

  const email = event.target[0].value;
  const password = event.target[1].value;
  const emailValid = checkEmail(email);
  const passwordValid = checkPassword(password);

  if (emailValid == false || passwordValid == false) {
    return;
  }

  let result = await fetchLogin({ email, password });

  console.log(result.data);

  if (result.data.accessToken) {
    localStorage.setItem("token", result.data.accessToken);
    window.location.href = "/";
  } else {
    console.error("Login failed");
  }
}

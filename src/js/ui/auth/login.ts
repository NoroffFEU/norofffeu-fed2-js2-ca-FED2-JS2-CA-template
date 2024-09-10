import { login } from "../../api/auth/login";

export async function onLogin(event: Event) {
  event.preventDefault();

  const form = event.target as HTMLFormElement;

  const email =
    (form.elements.namedItem("email") as HTMLInputElement)?.value || "";
  const password =
    (form.elements.namedItem("password") as HTMLInputElement)?.value || "";

  const data = await login({ email, password });
  if (data) {
    alert("Login successful!");
    const { name, email, bio, avatar, banner, accessToken } = data;
    console.log(name, email, bio, avatar.url, avatar.alt, banner, accessToken);
  }
  return data;
}

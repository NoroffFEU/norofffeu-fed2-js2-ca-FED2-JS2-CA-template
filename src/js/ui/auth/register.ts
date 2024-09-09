import { register } from "../../api/auth/register";

export async function onRegister(event: Event) {
  event.preventDefault();

  const form = event.target as HTMLFormElement;

  const name =
    (form.elements.namedItem("name") as HTMLInputElement)?.value || "";
  const email =
    (form.elements.namedItem("email") as HTMLInputElement)?.value || "";
  const password =
    (form.elements.namedItem("password") as HTMLInputElement)?.value || "";

  const data = await register({ name, email, password });
  if (data) {
    alert("Registration successful!");
    const { name, email, bio, avatar, banner } = data;
    console.log(data);
  }
  return data;
}

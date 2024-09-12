import { register } from "@api/auth/register";
import { APIRegisterRequest } from "@/types/types";

export async function onRegister(event: Event) {
  event.preventDefault();
  const form = event.target as HTMLFormElement;
  const formData = new FormData(form);
  const userData = Object.fromEntries(formData);
  const { name, email, password } = userData;

  try {
    await register({ name, email, password } as APIRegisterRequest);
    window.location.href = "/login/";
  } catch (error) {
    console.error(error);
  }
}

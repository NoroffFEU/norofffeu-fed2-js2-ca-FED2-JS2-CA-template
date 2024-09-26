// src/api/register.js
export async function register(user) {
  const response = await fetch("https://v2.api.noroff.dev/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  return response;
}

export function getUser() {
  return localStorage.getItem("userName") as string;
}

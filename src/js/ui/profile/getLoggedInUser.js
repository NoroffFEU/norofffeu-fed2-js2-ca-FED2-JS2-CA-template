export function getLoggedInUser() {
  const user = localStorage.getItem("user");
  const parsedUser = JSON.parse(user);

  if (parsedUser) {
    return parsedUser;
  }

  return false;
}

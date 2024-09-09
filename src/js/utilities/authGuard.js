export function authGuard() {
  if (!localStorage.token) {
    //alert("You must be logged in to view this page");
    //window.location.href = "/auth/login/";
  }
}

export function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  return date.toLocaleDateString('en-GB', options);
}
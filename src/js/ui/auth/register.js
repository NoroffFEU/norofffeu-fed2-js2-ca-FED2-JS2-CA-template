export async function onRegister(event) {
  event.preventDefault();
  console.log(this.name.value);
  console.log(this.email.value);
  console.log(this.password.value);
}

import NoroffApp from "../../ui";

const form = document.forms["login"];

form.addEventListener("submit", NoroffApp.events.login);

import NoroffApp from "../../ui";

const form = document.forms["register"];

form.addEventListener("submit", NoroffApp.events.register);
import NoroffApp from "../../ui/index.js";

const logoutButton = document.querySelector(".logout-button");
logoutButton.addEventListener("click", NoroffApp.events.logout);

NoroffApp.events.post.displaySinglePost();


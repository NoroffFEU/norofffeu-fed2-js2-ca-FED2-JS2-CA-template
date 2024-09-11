import NoroffApp from "../../ui";

const logoutButton = document.querySelector(".logout-button");
logoutButton.addEventListener("click", NoroffApp.events.logout);

NoroffApp.events.post.displayPosts();
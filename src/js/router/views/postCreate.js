// import { onCreatePost } from "../../ui/post/create";
// import { authGuard } from "../../utilities/authGuard";
//
// authGuard();
//
// const form = document.forms.createPost;
//
// form.addEventListener("submit", onCreatePost);

// src/router/views/postCreate.js
import { onCreatePost } from "../../ui/post/create.js";
import { authGuard } from "../../utilities/authGuard"; // Importing authGuard for authentication

authGuard(); // Ensure the user is authenticated

const form = document.forms.createPost; // Get the form by name
form.addEventListener("submit", onCreatePost); // Attach the event listener for form submission
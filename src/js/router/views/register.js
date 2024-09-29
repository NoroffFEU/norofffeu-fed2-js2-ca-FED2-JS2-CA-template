import { onRegister } from "../../ui/auth/register";

/**
 * Sets up and renders the register view of the application.
 * 
 * This function initializes the register page by calling the setupRegisterForm function.
 * 
 * @function registerView
 * @returns {void}
 * 
 * @example
 * // Call this function when the register page loads
 * registerView();
 */

const form = document.forms.register;

form.addEventListener("submit", onRegister);

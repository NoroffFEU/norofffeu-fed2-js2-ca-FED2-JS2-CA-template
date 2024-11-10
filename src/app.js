import "./css/style.css";

import router from "./js/router/index.js";

import { initMobileMenu } from './js/utilities/mobileMenu.js';

// Initialize router
router();

// Initialize mobile menu when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
});



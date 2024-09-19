// src/app.js

import router from "./js/router/index.js";

document.addEventListener('DOMContentLoaded', () => {
  router(window.location.pathname);
});
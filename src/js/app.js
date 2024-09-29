// src/js/app.js
// Import router
import router from "/src/js/index.js"; 

// Call the router function with the current URL pathname
await router(window.location.pathname);


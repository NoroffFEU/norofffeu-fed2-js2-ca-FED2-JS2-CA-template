// src/js/router/views/notFound.js

export default function notFoundRouter() {
    document.addEventListener("DOMContentLoaded", () => {
      document.getElementById("notFoundMessage").textContent = "The page you're looking for does not exist.";
    });
  }
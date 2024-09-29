// src/js/ui/global/logout.js

export function onLogout() {
  try {
    // Remove user-related information from local storage
    localStorage.removeItem("token");  // Remove the stored token
    localStorage.removeItem("user");   // Remove the stored user information

    // Log a message for debugging purposes
    console.log("User has been logged out");

    // Redirect the user to the home page
    window.location.href = "/index.html";  // Change this to the correct home page URL
  } catch (error) {
    // Handle any unexpected errors during logout
    console.error("Error during logout:", error);
    alert("An error occurred while logging out. Please try again.");
  }
}

// Add event listener for the logout button
document.addEventListener("DOMContentLoaded", () => {
  const logoutButton = document.getElementById("logoutButton");
  if (logoutButton) {
    logoutButton.addEventListener("click", onLogout);
  } else {
    console.error("Logout button not found in the DOM");
  }
});

import { authGuard } from "../../utilities/authGuard";
import { renderProfile, onUpdateProfile } from "../../ui/profile/update.js";

authGuard();

document.addEventListener('DOMContentLoaded', () => {
    const userID = localStorage.getItem("userID");

    if (!userID) {
        window.location.href = "/auth/login/";
    } else {
        renderProfile(userID); // Call renderProfile to show the profile on load
    }

    const form = document.querySelector('form[name="updateProfile"]');
    form.addEventListener("submit", onUpdateProfile);
});
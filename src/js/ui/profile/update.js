import { readProfile } from "../../api/profile/read.js";
import { updateProfile } from "../../api/profile/update.js";

export async function renderProfile(userID) {
    try {
        const profileData = await readProfile(userID);
        const profileContainer = document.getElementById('profile-container');
        profileContainer.innerHTML = `
            <h2>${profileData.data.name}</h2>
            <p>${profileData.data.bio}</p>
            <img src="${profileData.data.avatar.url}" alt="User Avatar" />
            <img src="${profileData.data.banner.url}" alt="User Banner" />
        `;
    } catch (error) {
        console.error("Error rendering profile:", error);
        document.getElementById('profile-container').innerText = "Profile not found.";
    }
}

export async function onUpdateProfile(event) {
    event.preventDefault();

    const avatar = document.querySelector('input[name="avatar"]').value;
    const banner = document.querySelector('input[name="banner"]').value;
    const bio = document.querySelector('textarea[name="bio"]').value;
    const userID = localStorage.getItem("userID");

    try {
        const updatedProfile = await updateProfile(userID, { avatar, banner, bio });
        alert("Profile updated successfully!");
        renderProfile(userID); // Re-render the profile with updated data
    } catch (error) {
        console.error("Error updating profile:", error);
        alert("Failed to update profile.");
    }
}
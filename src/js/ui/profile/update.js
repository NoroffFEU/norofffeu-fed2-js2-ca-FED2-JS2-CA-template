import { readProfile } from "../../api/profile/read.js";
import { updateProfile } from "../../api/profile/update.js";

const profileContainer = document.getElementById("profileContainer");

export async function renderProfile() {
    if (!profileContainer) {
        console.error("Profile container element not found");
        return;
    }

    const response = await readProfile();
    console.log(response);
    if (response.ok) {
        const data = response.data;

        profileContainer.innerHTML = `
            <h2>${data.data.name}</h2>
            <p>${data.data.bio}</p>
            <img src="${data.data.banner?.url}" alt="${
            data.data.banner?.alt || "Banner"
        }"/>
            <img src="${data.data.avatar?.url}" alt="${
            data.data.avatar?.alt || "Avatar"
        }"/>
        <h3>Followers: ${data.data._count.followers}</h3>
<h3>Following: ${data.data._count.following}</h3>
<h3>Posts: ${data.data._count.posts}</h3>
        `;
    } else {
        console.error("Failed to load data:", response.error);
        alert("Failed to fetch profile data.");
    }
}
renderProfile();

// Function to handle the update profile event
export async function onUpdateProfile(event) {
    event.preventDefault();

    const userID = localStorage.getItem("userID");

    // Assuming these elements exist in your form or UI for updating the profile
    const avatarUrl = document.getElementById("avatarUrl").value;
    const bannerUrl = document.getElementById("bannerUrl").value;
    const bio = document.getElementById("bio").value;

    try {
        await updateProfile(userID, {
            avatar: avatarUrl,
            banner: bannerUrl,
            bio,
        });
        alert("Profile updated successfully!");

        // Re-render the profile with the updated information
        await renderProfile();
    } catch (error) {
        console.error("Failed to update profile:", error);
        alert("Error: Could not update profile.");
    }
}

// Attach event listener to update profile form if it exists
const updateProfileForm = document.getElementById("updateProfileForm");
if (updateProfileForm) {
    updateProfileForm.addEventListener("submit", onUpdateProfile);
}

// Rendering the profile when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    renderProfile();
});

{
    /*  */
}

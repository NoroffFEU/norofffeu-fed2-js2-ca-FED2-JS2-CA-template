import { authGuard } from "../../utilities/authGuard.js";
import { createFollowBtn } from "../../ui/profile/follow.js";
import { readProfile } from "../../api/profile/read.js";
import { updateProfile } from "../../api/profile/update.js";

export async function profileView() {
    console.log("Profile view function called");
    authGuard();

    const profileContainer = document.querySelector("#profile-container");
    
    if (!profileContainer) {
        console.error("Profile container not found");
        return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    let profileName = urlParams.get('name');

    // Get the logged-in user's name from localStorage
    let loggedInUserName = localStorage.getItem('name');

    // If name is not set, try to get it from the user object
    if (!loggedInUserName || loggedInUserName === 'undefined') {
        const userString = localStorage.getItem('user');
        if (userString) {
            const userData = JSON.parse(userString);
            loggedInUserName = userData.name;
            // Update localStorage with the correct name
            localStorage.setItem('name', loggedInUserName);
        }
    }

    console.log("URL profile name:", profileName);
    console.log("Logged in user name:", loggedInUserName);
    console.log("localStorage contents:", JSON.parse(JSON.stringify(localStorage)));

    if (!profileName) {
        profileName = loggedInUserName;
    }

    console.log("Final profile name to load:", profileName);

    if (profileName && profileName !== 'undefined') {
        await loadProfile(profileName);
    } else {
        profileContainer.innerHTML = "<p>No profile specified and no user logged in. Please log in to view your profile.</p>";
    }
}

async function loadProfile(name) {
    const profileContainer = document.querySelector("#profile-container");

    if (!name || name === 'undefined') {
        console.error("Invalid profile name provided to loadProfile function");
        profileContainer.innerHTML = "<p>Error: Invalid profile name. Please log in again.</p>";
        return;
    }

    try {
        console.log("Attempting to load profile for:", name);
        const profile = await readProfile(name);
        
        const profileHTML = `
            <h2>${profile.name}'s Profile</h2>
            <p>Email: ${profile.email}</p>
            <p>Bio: ${profile.bio || 'No bio available'}</p>
            ${profile.avatar ? `<img src="${profile.avatar.url}" alt="${profile.avatar.alt || 'Profile avatar'}" style="max-width: 200px;">` : ''}
            ${profile.banner ? `<img src="${profile.banner.url}" alt="${profile.banner.alt || 'Profile banner'}" style="max-width: 100%;">` : ''}
            <p>Posts: ${profile._count?.posts || 0}</p>
            <p>Followers: ${profile._count?.followers || 0}</p>
            <p>Following: ${profile._count?.following || 0}</p>
        `;
        
        profileContainer.innerHTML = profileHTML;
        
        // Add update form
        const updateForm = createUpdateForm(profile);
        profileContainer.appendChild(updateForm);
        
    } catch (error) {
        console.error("Error loading profile:", error);
        profileContainer.innerHTML = `<p>Error loading profile for ${name}. Please try again later.</p>`;
    }
}

function createUpdateForm(profile) {
    const form = document.createElement('form');
    form.innerHTML = `
        <h3>Update Profile</h3>
        <label for="bio">Bio:</label>
        <textarea id="bio" name="bio">${profile.bio || ''}</textarea><br>
        <label for="avatar-url">Avatar URL:</label>
        <input type="url" id="avatar-url" name="avatar-url" value="${profile.avatar?.url || ''}"><br>
        <label for="banner-url">Banner URL:</label>
        <input type="url" id="banner-url" name="banner-url" value="${profile.banner?.url || ''}"><br>
        <button type="submit">Update Profile</button>
    `;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const updateData = {
            bio: form.bio.value,
            avatar: { url: form['avatar-url'].value },
            banner: { url: form['banner-url'].value }
        };

        try {
            await updateProfile(profile.name, updateData);
            alert('Profile updated successfully!');
            loadProfile(profile.name); // Reload the profile to show updated info
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile. Please try again.');
        }
    });

    return form;
}
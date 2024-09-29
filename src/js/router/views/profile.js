import { authGuard } from "../../utilities/authGuard.js";
import { createFollowBtn } from "../../ui/profile/follow.js";
import { readProfile } from "../../api/profile/read.js";
import { updateProfile } from "../../api/profile/update.js";
import { getAllProfiles } from "../../api/profile/allProfiles.js"; // Add this line

/**
 * Asynchronously loads and displays the profile view based on URL parameters or logged-in user.
 * Logs relevant information during execution and updates the local storage if needed.
 * 
 * @async
 * @function profileView
 * @returns {Promise<void>} 
 */


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
        
        // Add the all profiles section
        await loadAllProfiles(profileContainer, loggedInUserName);
    } else {
        profileContainer.innerHTML = "<p>No profile specified and no user logged in. Please log in to view your profile.</p>";
    }
}

/**
 * Asynchronously loads the profile information for the specified user and updates the DOM with profile details.
 * 
 * @async
 * @function loadProfile
 * @param {string} name - The name of the profile to load.
 * @returns {Promise<void>} 
 */

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
            ${profile.banner ? `<img src="${profile.banner.url}" alt="${profile.banner.alt || 'Profile banner'}" style="max-width: 200px;">` : ''}
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

/**
 * Creates an HTML form element to update the user's profile, pre-filled with current profile data.
 * 
 * @function createUpdateForm
 * @param {Object} profile - The profile object containing current profile details.
 * @param {string} profile.bio - The current bio of the user.
 * @param {Object} profile.avatar - The current avatar object of the user.
 * @param {string} profile.avatar.url - The URL of the avatar image.
 * @param {Object} profile.banner - The current banner object of the user.
 * @param {string} profile.banner.url - The URL of the banner image.
 * @returns {HTMLFormElement} - The update form element for the user's profile.
 */

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

/**
 * Asynchronously loads and displays all user profiles.
 * 
 * @async
 * @function loadAllProfiles
 * @param {HTMLElement} container - The container element to append the profiles to.
 * @param {string} currentUserName - The name of the currently logged-in user.
 * @returns {Promise<void>}
 */

async function loadAllProfiles(container, currentUserName) {
    const allProfilesContainer = document.createElement('div');
    allProfilesContainer.innerHTML = '<h2>All Profiles</h2>';
    container.appendChild(allProfilesContainer);

    try {
        const allProfilesData = await getAllProfiles();
        const profilesList = document.createElement('ul');
        profilesList.style.listStyle = 'none';
        profilesList.style.padding = '0';

        allProfilesData.data.forEach(profile => {
            const listItem = document.createElement('li');
            listItem.style.marginBottom = '10px';
            listItem.innerHTML = `
                <img src="${profile.avatar?.url || '/default-avatar.png'}" alt="${profile.name}'s avatar" style="width: 50px; height: 50px; vertical-align: middle;">
                <span style="margin-left: 10px;">${profile.name}</span>
            `;

            // Don't show follow button for the current user
            if (profile.name !== currentUserName) {
                const followBtn = createFollowBtn(profile.name, profile.isFollowing);
                listItem.appendChild(followBtn);
            }

            profilesList.appendChild(listItem);
        });

        allProfilesContainer.appendChild(profilesList);
    } catch (error) {
        console.error("Error loading all profiles:", error);
        allProfilesContainer.innerHTML += '<p>Error loading profiles. Please try again later.</p>';
    }
}
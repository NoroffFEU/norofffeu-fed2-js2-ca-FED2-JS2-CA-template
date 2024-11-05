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
        profileContainer.innerHTML = "<p class='text-red-600'>Error: Invalid profile name. Please log in again.</p>";
        return;
    }

    try {
        console.log("Attempting to load profile for:", name);
        const profile = await readProfile(name);
        
        const profileHTML = `
            <div class="flex items-center space-x-4 mb-6">
                ${profile.avatar ? 
                    `<img src="${profile.avatar.url}" alt="${profile.avatar.alt || 'Profile avatar'}" class="w-24 h-24 rounded-full object-cover">` : 
                    `<div class="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
                        <span class="text-gray-500">No Avatar</span>
                    </div>`
                }
                <div>
                    <h2 class="text-2xl font-bold text-gray-800">${profile.name}'s Profile</h2>
                    <p class="text-gray-600">${profile.email}</p>
                </div>
            </div>
            ${profile.banner ? 
                `<img src="${profile.banner.url}" alt="${profile.banner.alt || 'Profile banner'}" class="w-full h-48 object-cover rounded-lg mb-6">` : ''
            }
            <div class="space-y-4">
                <p class="text-gray-700">${profile.bio || 'No bio available'}</p>
                <div class="flex space-x-6">
                    <span class="text-gray-600">Posts: ${profile._count?.posts || 0}</span>
                    <span class="text-gray-600">Followers: ${profile._count?.followers || 0}</span>
                    <span class="text-gray-600">Following: ${profile._count?.following || 0}</span>
                </div>
            </div>
        `;
        
        profileContainer.innerHTML = profileHTML;
        
        // Add update form
        const updateForm = createUpdateForm(profile);
        profileContainer.appendChild(updateForm);
        
    } catch (error) {
        console.error("Error loading profile:", error);
        profileContainer.innerHTML = `<p class="text-red-600">Error loading profile for ${name}. Please try again later.</p>`;
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
    form.className = 'mt-8 bg-white rounded-lg shadow-md p-6 space-y-6';
    form.innerHTML = `
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Update Profile</h3>
        <div class="space-y-2">
            <label for="bio" class="block text-sm font-medium text-gray-700">Bio:</label>
            <textarea 
                id="bio" 
                name="bio" 
                class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 h-32 resize-y"
            >${profile.bio || ''}</textarea>
        </div>
        <div class="space-y-2">
            <label for="avatar-url" class="block text-sm font-medium text-gray-700">Avatar URL:</label>
            <input 
                type="url" 
                id="avatar-url" 
                name="avatar-url" 
                value="${profile.avatar?.url || ''}"
                class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            >
        </div>
        <div class="space-y-2">
            <label for="banner-url" class="block text-sm font-medium text-gray-700">Banner URL:</label>
            <input 
                type="url" 
                id="banner-url" 
                name="banner-url" 
                value="${profile.banner?.url || ''}"
                class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            >
        </div>
        <button 
            type="submit" 
            class="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-md transition-colors"
        >
            Update Profile
        </button>
    `;

    // Event listener remains the same
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
            loadProfile(profile.name);
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
    allProfilesContainer.className = 'mt-8 pb-8';  // Added pb-8 here
    allProfilesContainer.innerHTML = '<h2 class="text-2xl font-bold text-gray-800 mb-6">All Profiles</h2>';
    container.appendChild(allProfilesContainer);

    try {
        const allProfilesData = await getAllProfiles();
        const profilesGrid = document.createElement('div');
        profilesGrid.className = 'grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-0';

        allProfilesData.data.forEach(profile => {
            const profileCard = document.createElement('div');
            profileCard.className = 'bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow';
            profileCard.innerHTML = `
                <div class="flex items-center space-x-3">
                    <img 
                        src="${profile.avatar?.url || '/default-avatar.png'}" 
                        alt="${profile.name}'s avatar" 
                        class="w-12 h-12 rounded-full object-cover"
                    >
                    <div>
                        <h3 class="font-semibold text-gray-800">${profile.name}</h3>
                        <p class="text-sm text-gray-600">Following: ${profile._count?.following || 0}</p>
                    </div>
                </div>
            `;

            if (profile.name !== currentUserName) {
                const followBtn = createFollowBtn(profile.name, profile.isFollowing);
                followBtn.className = 'mt-4 w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-md transition-colors';
                profileCard.appendChild(followBtn);
            }

            profilesGrid.appendChild(profileCard);
        });

        allProfilesContainer.appendChild(profilesGrid);
    } catch (error) {
        console.error("Error loading all profiles:", error);
        allProfilesContainer.innerHTML += `
            <p class="text-red-600 mt-4">Error loading profiles. Please try again later.</p>
        `;
    }
}
import { authGuard } from "../../utilities/authGuard.js";
import { createFollowBtn } from "../../ui/profile/follow.js";
import { readProfile } from "../../api/profile/read.js";
import { updateProfile } from "../../api/profile/update.js";
import { getAllProfiles } from "../../api/profile/allProfiles.js";

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

    let loggedInUserName = localStorage.getItem('name');

    if (!loggedInUserName || loggedInUserName === 'undefined') {
        const userString = localStorage.getItem('user');
        if (userString) {
            const userData = JSON.parse(userString);
            loggedInUserName = userData.name;
            localStorage.setItem('name', loggedInUserName);
        }
    }

    if (!profileName) {
        profileName = loggedInUserName;
    }

    if (profileName && profileName !== 'undefined') {
        await loadProfile(profileName);
        await loadAllProfiles(profileContainer, loggedInUserName);
    } else {
        profileContainer.innerHTML = "<p class='text-gray-300'>No profile specified and no user logged in. Please log in to view your profile.</p>";
    }
}

async function loadProfile(name) {
    const profileContainer = document.querySelector("#profile-container");

    if (!name || name === 'undefined') {
        console.error("Invalid profile name provided to loadProfile function");
        profileContainer.innerHTML = "<p class='text-red-500'>Error: Invalid profile name. Please log in again.</p>";
        return;
    }

    try {
        const profile = await readProfile(name);
        
        const updateForm = createUpdateForm(profile);
        const profileHTML = `
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div class="col-span-1 md:col-span-3 bg-gray-800 rounded-lg shadow-md p-6">
                <div class="flex items-center space-x-4 mb-6">
                    ${profile.avatar ?
                        `<img src="${profile.avatar.url}" alt="${profile.avatar.alt || 'Profile avatar'}" class="w-16 h-16 rounded-full object-cover">` :
                        `<div class="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center">
                            <span class="text-2xl text-blue-400">${profile.name.charAt(0).toUpperCase()}</span>
                        </div>`
                    }
                    <div>
                        <h2 class="text-2xl font-bold text-gray-100">${profile.name}'s Profile</h2>
                        <p class="text-gray-400">${profile.email}</p>
                    </div>
                </div>
                ${profile.banner ?
                    `<div class="flex justify-center md:justify-start mb-6">
                        <img src="${profile.banner.url}" 
                             alt="${profile.banner.alt || 'Profile banner'}" 
                             class="w-48 h-48 object-cover rounded-lg">
                    </div>` :
                    ''
                }
                <div class="space-y-4">
                    <p class="text-gray-300">${profile.bio || 'No bio available'}</p>
                    <div class="flex flex-row justify-around md:justify-start md:space-x-6 py-4 text-gray-400">
                        <span>Posts: ${profile._count?.posts || 0}</span>
                        <span>Followers: ${profile._count?.followers || 0}</span>
                        <span>Following: ${profile._count?.following || 0}</span>
                    </div>
                </div>
            </div>
            <div class="col-span-1 order-last md:order-none">
                ${updateForm.html}
            </div>
        </div>
        `;
        
        profileContainer.innerHTML = profileHTML;
        updateForm.setup();
        
    } catch (error) {
        console.error("Error loading profile:", error);
        profileContainer.innerHTML = `<p class="text-red-500">Error loading profile for ${name}. Please try again later.</p>`;
    }
}

function createUpdateForm(profile) {
    const formHtml = `
        <div class="bg-gray-800 rounded-lg shadow-md p-6 space-y-6">
            <h3 class="text-xl font-semibold text-gray-100 mb-4">Update Profile</h3>
            <form id="updateProfileForm" class="space-y-6">
                <div class="space-y-2">
                    <label for="bio" class="block text-sm font-medium text-gray-300">Bio:</label>
                    <textarea 
                        id="bio" 
                        name="bio" 
                        class="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 h-32 resize-y placeholder-gray-400"
                    >${profile.bio || ''}</textarea>
                </div>
                <div class="space-y-2">
                    <label for="avatar-url" class="block text-sm font-medium text-gray-300">Avatar URL:</label>
                    <input 
                        type="url" 
                        id="avatar-url" 
                        name="avatar-url" 
                        value="${profile.avatar?.url || ''}"
                        class="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 placeholder-gray-400"
                    >
                </div>
                <div class="space-y-2">
                    <label for="banner-url" class="block text-sm font-medium text-gray-300">Banner URL:</label>
                    <input 
                        type="url" 
                        id="banner-url" 
                        name="banner-url" 
                        value="${profile.banner?.url || ''}"
                        class="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 placeholder-gray-400"
                    >
                </div>
                <button 
                    type="submit" 
                    class="mx-auto block w-full md:w-1/2 bg-blue-400 hover:bg-blue-500 text-gray-900 font-semibold py-2 px-4 rounded-md transition-colors"
                >
                    Update Profile
                </button>
            </form>
        </div>
    `;

    return {
        html: formHtml,
        setup: () => {
            const form = document.getElementById('updateProfileForm');
            if (form) {
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
                        await loadProfile(profile.name);
                    } catch (error) {
                        console.error('Error updating profile:', error);
                        alert('Failed to update profile. Please try again.');
                    }
                });
            }
        }
    };
}

async function loadAllProfiles(container, currentUserName) {
    const allProfilesContainer = document.createElement('div');
    allProfilesContainer.className = 'mt-8 pb-8';
    allProfilesContainer.innerHTML = '<h2 class="text-2xl font-bold text-blue-400 mb-6">All Profiles</h2>';
    container.appendChild(allProfilesContainer);

    try {
        const allProfilesData = await getAllProfiles();
        const profilesGrid = document.createElement('div');
        profilesGrid.className = 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4';

        allProfilesData.data.forEach(profile => {
            const profileCard = document.createElement('div');
            profileCard.className = 'bg-gray-800 rounded-lg shadow-md p-3 hover:shadow-xl transition-shadow flex flex-col items-center';
            profileCard.innerHTML = `
                <div class="flex flex-col items-center text-center">
                    <div class="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden mb-2">
                        ${profile.avatar?.url ? 
                            `<img 
                                src="${profile.avatar.url}" 
                                alt="${profile.name}'s avatar" 
                                class="w-full h-full object-cover"
                            >` :
                            `<div class="text-xl text-blue-400">${profile.name.charAt(0).toUpperCase()}</div>`
                        }
                    </div>
                    <div class="text-center">
                        <h3 class="font-semibold text-gray-100">${profile.name}</h3>
                        <p class="text-sm text-gray-400">Following: ${profile._count?.following || 0}</p>
                    </div>
                </div>
            `;
        
            if (profile.name !== currentUserName) {
                const followBtn = createFollowBtn(profile.name, profile.isFollowing);
                followBtn.className = 'mt-2 w-1/2 bg-blue-400 hover:bg-blue-500 text-gray-900 font-semibold py-1.5 px-3 rounded-md transition-colors text-sm';
                profileCard.appendChild(followBtn);
            }
        
            profilesGrid.appendChild(profileCard);
        });
        
        allProfilesContainer.appendChild(profilesGrid);
    } catch (error) {
        console.error("Error loading all profiles:", error);
        allProfilesContainer.innerHTML += `
            <p class="text-red-500 mt-4">Error loading profiles. Please try again later.</p>
        `;
    }
}
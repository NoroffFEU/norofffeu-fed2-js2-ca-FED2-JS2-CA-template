import NoroffAPI from "../api";
const api = new NoroffAPI()

async function fetchProfilesAndCache() {
    try {
        const response = await api.getProfiles();
        const profiles = response.data;
        
        // Cache profiles data in localStorage
        localStorage.setItem('profiles', JSON.stringify(profiles));
        
        return profiles;
    } catch (error) {
        console.error('Error fetching profiles:', error);
        throw new Error(`Failed to fetch profiles: ${error.message}`);
    }
}

async function getProfilesFromCache() {
    const cachedProfiles = localStorage.getItem('profiles');

    if (cachedProfiles) {
        try {
            // Parse and return cached profiles
            return JSON.parse(cachedProfiles);
        } catch (error) {
            console.error('Error parsing profiles from localStorage:', error);
            localStorage.removeItem('profiles'); // Remove corrupted data
        }
    }

    // Fetch profiles from API and cache them if not in localStorage
    return await fetchProfilesAndCache();
}

function renderProfiles(profiles) {
    const profilesCon = document.getElementById('getAllProfiles');
    if (!profilesCon) {
        console.error('Error: Element with id "getAllProfiles" not found in the DOM.');
        return;
    }

    if (!Array.isArray(profiles)) {
        console.error("Error: Profiles data is not an array");
        return;
    }

    const profilesHTML = profiles.map(profile => `
        <div class="profiles" onclick="window.location.href='/profile/detail/?name=${profile.name}'">
            <img src="${profile.avatar.url}" alt="${profile.avatar.alt || 'profile avatar'}">
            <img src="${profile.banner.url}" alt="${profile.banner.alt || 'profile banner'}">
            <h2>${profile.name}</h2>
            <h2>${profile.email}</h2>
        </div>
    `).join('');

    profilesCon.innerHTML = profilesHTML;
}
export async function getAllProfiles(profiles) {
    try {
        const profiles = await getProfilesFromCache();
        renderProfiles(profiles);
    } catch (error) {
        console.error(`Error displaying profile: ${error.message}`);
    }
}


async function fetchPostsAndCache() {
    try {
        const response = await api.getPosts(); // Assume this fetches posts data from your API
        const posts = response.data;
        
        // Cache posts data in localStorage
        localStorage.setItem('posts', JSON.stringify(posts));
        
        return posts;
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw new Error(`Failed to fetch posts: ${error.message}`);
    }
}

// Function to retrieve posts from localStorage or fetch and cache them if not present
async function getPostsFromCache() {
    const cachedPosts = localStorage.getItem('posts');
    if (cachedPosts) {
        try {
            // Parse cached data
            return JSON.parse(cachedPosts);
        } catch (error) {
            console.error('Error parsing posts from localStorage:', error);
            localStorage.removeItem('posts'); // Remove corrupted data
        }
    }
    // Fetch and cache fresh data if no valid cache is present
    return await fetchPostsAndCache();
}


function renderPosts(posts) {
    const postsContainer = document.getElementById("postsContainer");
    if (!postsContainer) {
        console.error('Error: Element with id "postsContainer" not found in the DOM.');
        return;
    }

    if (!Array.isArray(posts)) {
        console.error("Error: posts data is not an array");
        return;
    }

    const postsHTML = posts.map(post =>
        `
        <div class="post" onclick="window.location.href='/post/detail/?id=${post.id}'">
             <h2>${post.title}</h2>
             <p>${post.body}</p>
             <p><strong>Tags:</strong> ${post.tags.join(", ")}</p>
             ${post.media && post.media.url ? `<img src="${post.media.url}" alt="${post.media.alt || 'Post Media'}">` : ""}
        </div>
        `
    ).join('');

    postsContainer.innerHTML = postsHTML;
}


export async function displayPosts() {
    try {
        const posts = await getPostsFromCache();
        renderPosts(posts);
    } catch (error) {
        console.log(`Error displaying posts: ${error.message}`);
    }
}
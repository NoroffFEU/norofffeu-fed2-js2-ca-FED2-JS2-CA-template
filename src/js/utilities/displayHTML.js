import NoroffAPI from "../api";
const api = new NoroffAPI()


export async function getAllProfiles(){
    
    try{

        
        const profilesCon = document.getElementById('getAllProfiles');
        if (!profilesCon) {
            console.error('Error: Element with id "getAllProfiles" not found in the DOM.');
            return;
        }
        
        const cachedProfiles = localStorage.getItem('profiles');
        let profiles;

        if (cachedProfiles) {
            try {
                // Parse cached data
                profiles = JSON.parse(cachedProfiles);
                console.log('Loaded profiles from localStorage');

            } catch (error) {
                console.error('Error parsing profiles from localStorage:', error);
                localStorage.removeItem('profiles'); // Remove corrupted data
                profiles = await fetchProfilesAndCache(); // Fetch fresh data
            }
        } else {
            // Fetch profiles and cache if not available in localStorage
            profiles = await fetchProfilesAndCache();
        }

        if (!Array.isArray(profiles)) {
            throw new Error("Profiles data is not an array");
        }
        
        const profilesHTML = profiles.map(profiles =>
            `
            <div class="profiles" onclick="window.location.href='/profile/detail/?name=${profiles.name}'">
            <img src="${profiles.avatar.url}" alt="${profiles.avatar.alt || 'profile avatar'}></img>
            <img src="${profiles.banner.url}" alt="alt="${profiles.banner.alt || 'profile banner'}></img>
            <h2>${profiles.name}</h2>
            <h2>${profiles.email}</h2>
            </div>
            `
        ).join('');
        
        profilesCon.innerHTML = profilesHTML
        
    }catch(error){
        console.log(`Error displaying profile: ${error.message}`);
    }
    
}

export async function displayPosts(){
    
    try
    {
        const postsContainer = document.getElementById("postsContainer");
        if (!postsContainer) {
            console.error('Error: Element with id "postsContainer" not found in the DOM.');
            return;
        }
        
        const cachedPosts = localStorage.getItem('posts');
        let posts;

        if (cachedPosts) {
            try {
                // Parse cached data
                posts = JSON.parse(cachedPosts);
                console.log('Loaded posts from localStorage');
            } catch (error) {
                console.error('Error parsing posts from localStorage:', error);
                localStorage.removeItem('posts'); // Remove corrupted data
                posts = await fetchPostsAndCache(); // Fetch fresh data
            }
        } else {
            // Fetch posts and cache if not available in localStorage
            posts = await fetchPostsAndCache();
        }

        if (!Array.isArray(posts)) {
            throw new Error("posts data is not an array");
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
           
            postsContainer.innerHTML = postsHTML
       
    }catch (error){
        console.log(`Error displaying posts: ${error.message}`);
    }
}


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


async function fetchPostsAndCache() {
    try {
        const response = await api.getPosts();
        const Posts = response.data;
        
        // Cache Posts data in localStorage
        localStorage.setItem('Posts', JSON.stringify(Posts));
        
        return Posts;
    } catch (error) {
        console.error('Error fetching Posts:', error);
        throw new Error(`Failed to fetch Posts: ${error.message}`);
    }
}
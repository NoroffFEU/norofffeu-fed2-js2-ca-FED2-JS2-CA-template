import { authGuard } from "../../utilities/authGuard";
// import { onLogout } from "../../ui/auth/logout";
authGuard();
import NoroffAPI from "../../api";
import { readPostsByUser } from "../../api/post/read";
import { renderProfilesPagination } from "../../utilities/pagination";

const api = new NoroffAPI();


async function getAllProfiles(profile){
    
    try{
        const profilesCon = document.getElementById('getAllProfiles');
        
        const response = await api.getProfiles();
        console.log(response)
        
        const profiles = response.data;
        
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
        console.log(`Error displaying posts: ${error.message}`);
    }
    
}

export async function searchProfile(){
    const query = document.getElementById('searchQueryProfile').value.trim();
    if(!query){
        alert("Emty text box, please search..");
        return;
    }
    
    try{
        const profiles  = await api.search.readProfile(query);
        const profileData = profiles.data
        getAllProfiles(profileData); 
        
        
    } catch(error){
        alert("Failed to search Profile", error)
    }
}



export async function loadProfiles(page = 1){
    
    try{
        const {profiles, currentPage, totalPages} = await  readPostsByUser (12, page)
        
        getAllProfiles(profiles);
        
        renderProfilesPagination (totalPages, currentPage)
        
    }catch(error){
        alert("Error loading profiles", error.message)
    }
}

// const searchBtn = document.getElementById('searchProfileSubmitBtn')
// searchBtn.addEventListener('click', searchProfile)


// const logoutButton = document.getElementById("logoutButton");
// logoutButton.addEventListener("click", onLogout);

loadProfiles()


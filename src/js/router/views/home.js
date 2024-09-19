import { authGuard } from "../../utilities/authGuard";
import { onLogout } from "../../ui/auth/logout";
authGuard();
import NoroffAPI from "../../api";

const api = new NoroffAPI();

const logoutButton = document.getElementById("logoutButton");
logoutButton.addEventListener("click", onLogout);

async function getAllProfiles(){

    try{
        const profilesCon = document.getElementById('getAllProfiles');
    
        const response = await api.profile.read();
        console.log(response)

        const profiles = response.data;

        if (!Array.isArray(profiles)) {
            throw new Error("Profiles data is not an array");
        }
    
        const profilesHTML = profiles.map(profiles =>
            `
            <div class="profiles">
            <img src="${profiles.avatar.url}" alt="${profiles.avatar.alt || 'profile avatar'}></img>
            <img src="${profiles.banner.url}" alt="alt="${profiles.avatar.alt || 'profile avatar'}></img>
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

getAllProfiles()


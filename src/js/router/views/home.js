import { authGuard } from "../../utilities/authGuard";
import { onLogout } from "../../ui/auth/logout";
authGuard();
import NoroffAPI from "../../api";
import { readPostsByUser } from "../../api/post/read";
import { renderProfilesPagination } from "../../utilities/pagination";
import { getAllProfiles } from "../../utilities/displayHTML";
import { searchProfile } from "../../utilities/search";

const api = new NoroffAPI();


export async function loadProfiles(limit=12,page = 1){
    
    try{
        const {profiles, currentPage, totalPages} = await  readPostsByUser (limit, page)
        
        getAllProfiles();
        
        renderProfilesPagination (totalPages, currentPage)
        
    }catch(error){
        alert("Error loading profiles", error.message)
    }
}
document.addEventListener("DOMContentLoaded", () => {
    const searchBtn = document.getElementById('searchProfileSubmitBtn');
    const logoutButton = document.getElementById("logoutButton");

    // Check if the element exists before adding the event listener
    if (searchBtn) {
        searchBtn.addEventListener('click', searchProfile);
    } else {
        console.error('Search button not found');
    }

    if (logoutButton) {
        searchBtn.addEventListener('click', onLogout);
    } else {
        console.error('onLogout button not found');
    }
});


loadProfiles()


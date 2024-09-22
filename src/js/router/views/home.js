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
    const cacheKey = `profiles_${limit}_${page}`;
    const cachedProfiles = localStorage.getItem(cacheKey);
    let currentPage, totalPages, profiles;

    if (cachedProfiles) {
        try {
            const parsedProfiles = JSON.parse(cachedProfiles);
            profiles = parsedProfiles.data; // Extract profiles
            currentPage = parsedProfiles.meta.currentPage; // Get current page
            totalPages = parsedProfiles.meta.pageCount; // Get total pages
            console.log('Loaded profiles from localStorage');
        } catch (error) {
            console.error('Error parsing cached profiles:', error);
            localStorage.removeItem(cacheKey); // Remove corrupted data
        }
    }

    if (!profiles) {
        try {
            const result = await readPostsByUser(limit, page); // Make sure to pass the username
            profiles = result.profiles;
            currentPage = result.currentPage;
            totalPages = result.totalPages;

            // Cache the fetched profiles
            localStorage.setItem(cacheKey, JSON.stringify({ data: profiles, meta: { currentPage, totalPages } }));
        } catch (error) {
            console.log("Error loading profiles", error);
            return; 
        }
    }

        getAllProfiles(profiles);
        renderProfilesPagination (totalPages, currentPage)    
}

// const searchBtn = document.getElementById('searchProfileSubmitBtn');
// const logoutButton = document.getElementById("logoutButton");
// searchBtn.addEventListener('click', searchProfile);
// searchBtn.addEventListener('click', onLogout);



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


import { authGuard } from "../../utilities/authGuard";
authGuard();

import NoroffAPI from "../../api";
import { renderPagination } from "../../utilities/pagination";


const api = new NoroffAPI();

async function fetchProfiles() {
  const profiles = await api.profile.readProfiles();
  return profiles;
}
const data = await fetchProfiles();

async function displayAllProfiles(profiles) {
  const profileContainer = document.getElementById("getAllProfiles");
  profileContainer.innerHTML = "";
  const profilesHTML = profiles
    .map(
      (profile) => `
        <div class="profiles" onclick="window.location.href='/profile/detail/?name=${profile.name}'">
        <h2>${profile.name}</h2>
        <h2>${profile.email}</h2>
        </div>
        `
    )
    .join("");

  profileContainer.innerHTML = profilesHTML;
}

async function onPageChange(page) {
  const data = await api.Pagination.readProfiles(12, page); 
  const { profiles, totalPages, currentPage } = data;
  displayAllProfiles(profiles);
  renderPagination(totalPages, currentPage, onPageChange);
}

async function displayPagination(page= 1) {
  
  try{
    const data = await api.Pagination.readProfiles(12, page); 
    const {profiles, totalPages, currentPage } =data;
    
    displayAllProfiles(profiles);
    renderPagination(totalPages, currentPage, onPageChange);
  }
  catch (error) {
    console.error("Error fetching profiles or rendering pagination:", error);
  }
}

async function onLogout() {
  alert ("You are now logged out")
  const data = await api.auth.logout()
  return data; 
}

const logoutButton = document.getElementById('logoutButton');
console.log(logoutButton)
logoutButton.addEventListener('click', onLogout);

displayPagination();


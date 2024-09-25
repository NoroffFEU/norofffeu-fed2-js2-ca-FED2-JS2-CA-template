import { authGuard } from "../../utilities/authGuard";
// import { onLogout } from "../../ui/auth/logout";
authGuard();
import NoroffAPI from "../../api";
import { renderPagination } from "../../utilities/pagination";

const api = new NoroffAPI();

async function fetchProfiles() {
  const profiles = await api.getProfiles();
  return profiles;
}
// กด
async function displayAllProfiles(profiles) {
  const profileContainer = document.getElementById("getAllProfiles");
  profileContainer.innerHTML = "";
  console.log("inject data both first render and re-render", profiles);
  const profilesHTML = profiles.data
    .map(
      (profile) => `
        <div class="profiles" onclick="window.location.href='/profile/detail/?name=${profile.name}'">
        <h2>${profile.name}</h2>
        <h2>${profile.email}</h2>
        </div>
        `
      // <img src="${profile.banner.url}" alt="${
      //   profile.banner.alt || "profile banner"
      // }">
      //       <img src="${profile.avatar.url}" alt="${
      //   profile.avatar.alt || "profile avatar"
      // }">
    )
    .join("");

  profileContainer.innerHTML = profilesHTML;
}

const data = await fetchProfiles();
displayAllProfiles(data);

// fetch data for specific page
async function fetchProfileByPage(page) {
  const token = localStorage.getItem("token");
  // Example: Fetching posts with a query string for pagination
  // You can replace this with an actual API call
  const response = await fetch(`${api.apiSocialPath}?page=${page}&limit=10`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-Key": `f57a803f-3207-48e6-ab86-9fea1dfea2a0`,
    },
    method: "get",
  }); // Adjust URL and query params as needed
  console.log(3214, response);
  const data = await response.json();
  return data; // Return the posts (or profiles) data
}

/**
 * Callback function to handle page change
 * @param {number} page - Page number to load
 */
async function handlePageChange(page) {
  console.log("Loading posts for page:", page);

  // Fetch data for the new page
  const data = await fetchProfileByPage(page);

  // Update the posts (or profiles) container with the new content
  // fetch เพื่อ render หน้าใหม่
  console.log(data);
  displayAllProfiles(data);

  // Optionally, re-render the pagination buttons to reflect the current page
  console.log("before render pagination", data);
  console.log("before render pagination", data.meta);

  displayPagination(data);
}

async function displayPagination(data) {
  // เอา totalPages = pageCount กับ currentPage = currentPage
  // ลองกดหน่อย
  console.log(222, data);
  const { pageCount, currentPage } = await data.meta;
  console.log(pageCount, currentPage);
  renderPagination(pageCount, currentPage, handlePageChange);
}

// Example usage for posts
// ขอลองก่อนนะ
export function updatePostsForPage(page) {
  console.log("Fetching and displaying posts for page:", page);
  // Implement your logic for fetching and displaying posts for the current page
  return page;
}

displayPagination(data);
// ลองใหม่

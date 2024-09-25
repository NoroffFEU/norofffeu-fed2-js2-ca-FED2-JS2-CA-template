import { authGuard } from "../../utilities/authGuard";
// import { onLogout } from "../../ui/auth/logout";
authGuard();
import NoroffAPI from "../../api";
import { renderPagination } from "../../utilities/pagination";
const api = new NoroffAPI();

async function fetchProfiles() {
  const profiles = await api.getProfiles();
  return profiles;
} // corrected

async function displayAllProfiels(profiles) {
  const profileContainer = document.getElementById("getAllProfiles");
  const profilesHTML = profiles.data
    .map(
      (profile) => `
        <div class="profiles" onclick="window.location.href='/profile/detail/?name=${
          profile.name
        }'">
            <img src="${profile.avatar.url}" alt="${
        profile.avatar.alt || "profile avatar"
      }">
            <img src="${profile.banner.url}" alt="${
        profile.banner.alt || "profile banner"
      }">
            <h2>${profile.name}</h2>
            <h2>${profile.email}</h2>
        </div>
    `
    )
    .join("");

  profileContainer.innerHTML = profilesHTML;
}

const data = await fetchProfiles();
displayAllProfiels(data);

// fetch data for specific page
async function fetchData(page) {
    cpnst token = localStorage.getItem('token');
    console.log(token)
    // Example: Fetching posts with a query string for pagination
    // You can replace this with an actual API call
    const response = await fetch(`${api.apiSocialPath}?page=${page}&limit=10`,
        headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
         "X-Noroff-API-Key": 'f57a803f-3207-48e6-ab86-9fea1dfea2a0'
      },method:"get",); // Adjust URL and query params as needed
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
    const data = await fetchData(page);

    // Update the posts (or profiles) container with the new content
    renderPosts(data.posts);

    // Optionally, re-render the pagination buttons to reflect the current page
    renderPagination(data.totalPages, page, handlePageChange);
}

async function displayPagination(data) {
  // เอา totalPages = pageCount กับ currentPage = currentPage
  console.log(data);
  const { pageCount, currentPage } = data.meta;
  console.log(pageCount, currentPage);
  renderPagination(pageCount, currentPage, handlePageChange);
}

  // Example usage
// const totalPages = 10;
// const currentPage = 1;


// Example usage for posts
// ขอลองก่อนนะ
export function updatePostsForPage(page) {
  console.log("Fetching and displaying posts for page:", page);
  // Implement your logic for fetching and displaying posts for the current page
  return page;
}

displayPagination(data);

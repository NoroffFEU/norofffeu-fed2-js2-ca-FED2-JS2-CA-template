// import NoroffAPI from "../../api";
// const api = new NoroffAPI();

/**
 * Render pagination buttons and handle page changes.
 * @param {number} totalPages - Total number of pages.
 * @param {number} currentPage - The current active page.
 * @param {function} onPageChange - Callback function to handle page change.
 */
export function renderPagination(totalPages, currentPage, onPageChange) {
  const paginationContainer = document.getElementById("paginationContainer");
  paginationContainer.innerHTML = ""; // Clear any existing buttons

  // Helper function to create and append page buttons
  const createPageButton = (page, isCurrent = false) => {
      const pageButton = document.createElement("button");
      pageButton.innerText = page;
      pageButton.disabled = isCurrent; // Disable the button if it's the current page
      pageButton.addEventListener("click", () => onPageChange(page)); // Handle page click
      paginationContainer.appendChild(pageButton);
  };

  // Helper to add an ellipsis
  const appendEllipsis = () => {
      const ellipsis = document.createElement("span");
      ellipsis.innerText = "...";
      paginationContainer.appendChild(ellipsis);
  };

  // Previous button
  if (currentPage > 1) {
      const prevButton = document.createElement("button");
      prevButton.innerHTML = "&lt;";
      prevButton.addEventListener("click", () => onPageChange(currentPage - 1));
      paginationContainer.appendChild(prevButton);
  }

  // First few pages
  for (let page = 1; page <= Math.min(3, totalPages); page++) {
      createPageButton(page, page === currentPage);
  }

  // Ellipsis before middle pages
  if (currentPage > 5) {
      appendEllipsis();
  }

  // Pages around the current page
  const startPage = Math.max(currentPage - 2, 4);
  const endPage = Math.min(currentPage + 2, totalPages - 3);
  for (let page = startPage; page <= endPage; page++) {
      createPageButton(page, page === currentPage);
  }

  // Ellipsis after middle pages
  if (currentPage < totalPages - 4) {
      appendEllipsis();
  }

  // Last few pages
  for (let page = Math.max(totalPages - 2, endPage + 1); page <= totalPages; page++) {
      createPageButton(page, page === currentPage);
  }

  // Next button
  if (currentPage < totalPages) {
      const nextButton = document.createElement("button");
      nextButton.innerHTML = "&gt;";
      nextButton.addEventListener("click", () => onPageChange(currentPage + 1));
      paginationContainer.appendChild(nextButton);
  }
}

// /**
// * Callback function to handle page change
// * @param {number} page - Page number to load
// */
// function handlePageChange(page) {
//   console.log("Loading posts for page:", page);
//   // Add your logic to fetch and update the content for the selected page.
// }



// // Utility function to create a debounce function
// const debounce = (func, delay) => {
//   let timeout;
//   return (...args) => {
//     clearTimeout(timeout);
//     timeout = setTimeout(() => func(...args), delay);
//   };
// };

// // Function to create and append a page button
// const createPageButton = (
//   paginationContainer,
//   page,
//   isCurrent,
//   onPageChange
// ) => {
//   const pageButton = document.createElement("button");
//   pageButton.innerText = page;
//   pageButton.disabled = isCurrent; // Disable button if it's the current page
//   pageButton.addEventListener("click", () => onPageChange(page));
//   paginationContainer.appendChild(pageButton);
// };

// // Function to append ellipsis
// const appendEllipsis = (paginationContainer) => {
//   const ellipsis = document.createElement("span");
//   ellipsis.innerText = "...";
//   paginationContainer.appendChild(ellipsis);
// };

// // Main pagination rendering function
// export function renderPagination(
//   totalPages,
//   currentPage,
//   onPageChange,
//   containerId
// ) {
//   const paginationContainer = document.getElementById(containerId);
//   paginationContainer.innerHTML = ""; // Clear existing pagination buttons

//   // Previous button
//   if (currentPage > 1) {
//     const prevButton = document.createElement("button");
//     prevButton.innerHTML = "&lt;";
//     prevButton.addEventListener("click", () => onPageChange(currentPage - 1));
//     paginationContainer.appendChild(prevButton);
//   }

//   // First few pages
//   for (let page = 1; page <= Math.min(3, totalPages); page++) {
//     createPageButton(
//       paginationContainer,
//       page,
//       page === currentPage,
//       onPageChange
//     );
//   }

//   // Ellipsis before middle pages
//   if (currentPage > 5) {
//     appendEllipsis(paginationContainer);
//   }

//   // Pages around the current page
//   const startPage = Math.max(currentPage - 2, 4);
//   const endPage = Math.min(currentPage + 2, totalPages - 3);
//   for (let page = startPage; page <= endPage; page++) {
//     createPageButton(
//       paginationContainer,
//       page,
//       page === currentPage,
//       onPageChange
//     );
//   }

//   // Ellipsis after middle pages
//   if (currentPage < totalPages - 4) {
//     appendEllipsis(paginationContainer);
//   }

//   // Last few pages
//   for (
//     let page = Math.max(totalPages - 2, endPage + 1);
//     page <= totalPages;
//     page++
//   ) {
//     createPageButton(
//       paginationContainer,
//       page,
//       page === currentPage,
//       onPageChange
//     );
//   }

//   // Next button
//   if (currentPage < totalPages) {
//     const nextButton = document.createElement("button");
//     nextButton.innerHTML = "&gt;";
//     nextButton.addEventListener("click", () => onPageChange(currentPage + 1));
//     paginationContainer.appendChild(nextButton);
//   }
// }

// // // Initialize pagination with debounce
// // const debouncedUpdatePosts = debounce(updatePostsForPage, 300);

// // // Example function to render pagination
// // export function renderPostsPagination(totalPages, currentPage) {
// //   renderPagination(totalPages, currentPage, debouncedUpdatePosts, "paginationContainer");
// // }

// // // Example for rendering profiles (you can reuse this)
// // export function renderProfilesPagination(totalPages, currentPage) {
// //   renderPagination(totalPages, currentPage, debouncedUpdateProfiles, "paginationProfileCon");
// // }

// // // Mock function to simulate updating profiles
// // const debouncedUpdateProfiles = debounce((page) => {
// //   console.log("Fetching and displaying profiles for page:", page);
// //   // Implement your logic for fetching and displaying profiles for the current page

// // }, 300);

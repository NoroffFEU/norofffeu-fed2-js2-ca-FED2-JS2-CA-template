import { loadPost } from "../router/views/post";
import { loadProfiles } from "../router/views/home";

export function renderPagination(totalPages, currentPage) {
  const paginationCon = document.getElementById("paginationContainer");
  paginationCon.innerHTML = "";

  const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  };
  const debouncedLoadPost = debounce(loadPost, 300);

  // Function to create and append a page button
  const createPageButton = (page, isCurrent = false) => {
    const pageButton = document.createElement("button");
    pageButton.innerText = page;
    pageButton.disabled = isCurrent; // Disable button if it's the current page
    pageButton.addEventListener("click", () => debouncedLoadPost(page));
    paginationCon.appendChild(pageButton);
  };

  // Function to append ellipsis
  const appendEllipsis = () => {
    const ellipsis = document.createElement("span");
    ellipsis.innerText = "...";
    paginationCon.appendChild(ellipsis);
  };

  // Previous button
  if (currentPage > 1) {
    const prevButton = document.createElement("button");
    prevButton.innerHTML = "&lt;";
    prevButton.addEventListener("click", () =>
      debouncedLoadPost(currentPage - 1)
    );
    paginationCon.appendChild(prevButton);
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
  for (
    let page = Math.max(totalPages - 2, endPage + 1);
    page <= totalPages;
    page++
  ) {
    createPageButton(page, page === currentPage);
  }

  // Next button
  if (currentPage < totalPages) {
    const nextButton = document.createElement("button");
    nextButton.innerHTML = "&gt;";
    nextButton.addEventListener("click", () =>
      debouncedLoadPost(currentPage + 1)
    );
    paginationCon.appendChild(nextButton);
  }
}

export function renderProfilesPagination(totalPages, currentPage) {
    const paginationCon = document.getElementById("paginationProfileCon");
    paginationCon.innerHTML = "";
  
    // Utility function to debounce calls to loadProfiles
    const debounce = (func, delay) => {
      let timeout;
      return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), delay);
      };
    };
  
    const debouncedLoadProfiles = debounce(loadProfiles, 300);
  
    // Function to create and append a page button
    const createPageButton = (page, isCurrent = false) => {
      const pageButton = document.createElement("button");
      pageButton.innerText = page;
      pageButton.disabled = isCurrent; // Disable button if it's the current page
      pageButton.addEventListener("click", () => debouncedLoadProfiles(page));
      paginationCon.appendChild(pageButton);
    };
  
    // Function to append ellipsis
    const appendEllipsis = () => {
      const ellipsis = document.createElement("span");
      ellipsis.innerText = "...";
      paginationCon.appendChild(ellipsis);
    };
  
    // Append Previous button if not on the first page
    if (currentPage > 1) {
      const prevButton = document.createElement("button");
      prevButton.innerHTML = "&lt;";
      prevButton.addEventListener("click", () => debouncedLoadProfiles(currentPage - 1));
      paginationCon.appendChild(prevButton);
    }
  
    // First few pages (always shown)
    for (let page = 1; page <= Math.min(3, totalPages); page++) {
      createPageButton(page, page === currentPage);
    }
  
    // Ellipsis before the middle range of pages
    if (currentPage > 5) {
      appendEllipsis();
    }
  
    // Pages around the current page (dynamic range)
    const startPage = Math.max(currentPage - 2, 4);
    const endPage = Math.min(currentPage + 2, totalPages - 3);
    for (let page = startPage; page <= endPage; page++) {
      createPageButton(page, page === currentPage);
    }
  
    // Ellipsis after the middle range of pages
    if (currentPage < totalPages - 4) {
      appendEllipsis();
    }
  
    // Last few pages (always shown)
    for (let page = Math.max(totalPages - 2, endPage + 1); page <= totalPages; page++) {
      createPageButton(page, page === currentPage);
    }
  
    // Append Next button if not on the last page
    if (currentPage < totalPages) {
      const nextButton = document.createElement("button");
      nextButton.innerHTML = "&gt;";
      nextButton.addEventListener("click", () => debouncedLoadProfiles(currentPage + 1));
      paginationCon.appendChild(nextButton);
    }
  }
  
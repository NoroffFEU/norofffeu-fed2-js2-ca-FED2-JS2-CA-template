import router from "./js/router/index.js";
import { onLogout } from "./js/ui/auth/logout.js";
import { setupCreatePostFunctionality, showCreatePostForm, hideCreatePostForm } from "./js/ui/post/create.js";
import { setupHomePage, displaySinglePost } from "./js/ui/post/list.js";

// Mobile menu functionality
function setupMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileLoginLink = document.getElementById('login-link-mobile');
    const mobileRegisterLink = document.getElementById('register-link-mobile');
    const mobileLogoutBtn = document.getElementById('logout-btn-mobile');
    const mobileProfileLink = document.getElementById('profile-link-mobile');

    if (menuToggle && mobileNav) {
        menuToggle.addEventListener('click', () => {
            mobileNav.classList.toggle('hidden');
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (event) => {
            if (!mobileNav.contains(event.target) && !menuToggle.contains(event.target)) {
                mobileNav.classList.add('hidden');
            }
        });

        // Close mobile menu when window is resized
        window.addEventListener('resize', () => {
            if (window.innerWidth >= 768) {
                mobileNav.classList.add('hidden');
            }
        });

        // Add logout functionality to mobile logout button
        if (mobileLogoutBtn) {
            mobileLogoutBtn.addEventListener('click', onLogout);
        }
    }
}

function updateNavigation() {
  const token = localStorage.getItem('token');
  
  // Desktop navigation elements
  const loginLink = document.getElementById('login-link');
  const registerLink = document.getElementById('register-link');
  const logoutBtn = document.getElementById('logout-btn');
  const profileLink = document.getElementById('profile-link');
  const createPostLink = document.getElementById('createPostLink');

  // Mobile navigation elements
  const loginLinkMobile = document.getElementById('login-link-mobile');
  const registerLinkMobile = document.getElementById('register-link-mobile');
  const logoutBtnMobile = document.getElementById('logout-btn-mobile');
  const profileLinkMobile = document.getElementById('profile-link-mobile');
  const createPostLinkMobile = document.getElementById('createPostLink-mobile');

  if (token) {
      // User is logged in
      // Desktop nav
      [loginLink, registerLink].forEach(el => el?.classList.add('hidden'));
      [logoutBtn, profileLink, createPostLink].forEach(el => el?.classList.remove('hidden'));
      
      // Mobile nav
      [loginLinkMobile, registerLinkMobile].forEach(el => el?.classList.add('hidden'));
      [logoutBtnMobile, profileLinkMobile, createPostLinkMobile].forEach(el => el?.classList.remove('hidden'));
      
      // Add logout event listeners
      [logoutBtn, logoutBtnMobile].forEach(btn => {
          if (btn) {
              btn.removeEventListener('click', onLogout);
              btn.addEventListener('click', onLogout);
          }
      });

  } else {
      // User is logged out
      // Desktop nav
      [loginLink, registerLink].forEach(el => el?.classList.remove('hidden'));
      [logoutBtn, profileLink, createPostLink].forEach(el => el?.classList.add('hidden'));
      
      // Mobile nav
      [loginLinkMobile, registerLinkMobile].forEach(el => el?.classList.remove('hidden'));
      [logoutBtnMobile, profileLinkMobile, createPostLinkMobile].forEach(el => el?.classList.add('hidden'));
  }

  // Setup mobile menu toggle
  const menuToggle = document.getElementById('menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');

  if (menuToggle && mobileNav) {
      menuToggle.addEventListener('click', () => {
          mobileNav.classList.toggle('hidden');
      });

      // Close mobile menu when clicking outside
      document.addEventListener('click', (event) => {
          if (!mobileNav.contains(event.target) && !menuToggle.contains(event.target)) {
              mobileNav.classList.add('hidden');
          }
      });

      // Close mobile menu on window resize
      window.addEventListener('resize', () => {
          if (window.innerWidth >= 768) {
              mobileNav.classList.add('hidden');
          }
      });
  }
}

function isAuthenticated() {
  const token = localStorage.getItem('token');
  console.log('Checking authentication. Token:', token);
  return !!token;
}

function isProtectedRoute(path) {
  const protectedRoutes = ['/profile/', '/post/create/', '/post/edit/'];
  return protectedRoutes.some(route => path.startsWith(route));
}

function handleRoute(path) {
  console.log('Handling route:', path);
  const token = localStorage.getItem('token');
  
  if (!token && isProtectedRoute(path)) {
    console.log('Unauthenticated user trying to access protected route');
    sessionStorage.setItem('intendedPath', path);
    window.location.href = '/auth/login/';
  } else if (path === '/auth/login/' && token) {
    console.log('Authenticated user trying to access login page, redirecting to home');
    window.location.href = '/';
  } else {
    console.log('Routing to:', path);
    router(path);
    updateNavigation();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  console.log('App loaded');
  console.log('Current pathname:', window.location.pathname);
  console.log('Token:', localStorage.getItem('token'));


  setupMobileMenu();
  updateNavigation();

  if (document.getElementById('create-post-form')) {
    setupCreatePostFunctionality();
  }

  if (document.getElementById('posts-container')) {
    setupHomePage();
  }

  // Add this event listener for post clicks
  document.addEventListener('click', async (event) => {
    const postElement = event.target.closest('.post');
    if (postElement && !event.target.closest('a, button')) {
      const postId = postElement.dataset.postId;
      console.log('Post clicked, ID:', postId);
      await displaySinglePost(postId);
    }
  });

  // Handle initial route
  handleRoute(window.location.pathname);

  // Handle navigation
  window.addEventListener('popstate', () => {
    console.log('Navigation occurred');
    handleRoute(window.location.pathname);
  });
});

export { updateNavigation };
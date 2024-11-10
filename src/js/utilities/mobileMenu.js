export function initMobileMenu() {
    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLogoutBtn = document.getElementById('mobileLogoutBtn');
    
    if (!menuBtn || !mobileMenu) {
        console.error('Mobile menu elements not found');
        return;
    }

    // Toggle menu
    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Handle mobile logout
    if (mobileLogoutBtn) {
        mobileLogoutBtn.addEventListener('click', () => {
            localStorage.removeItem("token");
            localStorage.removeItem("postId");
            window.location.href = "/auth/login/";
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!menuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
            mobileMenu.classList.add('hidden');
        }
    });
}
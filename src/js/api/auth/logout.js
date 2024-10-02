function logoutUser() {
    localStorage.removeItem('jwtToken'); // Remove token from localStorage
    alert('You have been logged out.');
    window.location.href = 'index.html'; // Redirect to login page
}

document.getElementById('logoutButton')?.addEventListener('click', () => {
    logoutUser();
});

function logoutUser() {
    localStorage.removeItem('jwtToken'); 
    alert('You have been logged out.');
    window.location.href = 'index.html';
}

document.getElementById('logoutButton')?.addEventListener('click', () => {
    logoutUser();
});

import { readProfile } from '../../api/profile.js';

document.addEventListener('DOMContentLoaded', async () => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) {
    alert('User not found. Please login again.');
    window.location.href = '/auth/login/index.html';
    return;
  }

  try {
    const profile = await readProfile(user.name);
    document.getElementById('username').textContent = profile.name;
    document.getElementById('email').textContent = profile.email;
  } catch (error) {
    console.error('Failed to load profile:', error);
    alert('Failed to load profile');
  }
});

import { register } from '../../api/auth.js';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registerForm');
  if (form) {
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const userData = Object.fromEntries(data.entries());

      try {
        const user = await register(userData);
        localStorage.setItem('token', user.token);
        localStorage.setItem('user', JSON.stringify(user.user));
        window.location.href = '/auth/login.html';
      } catch (error) {
        console.error(error);
        alert('Failed to register');
      }
    });
  }
});

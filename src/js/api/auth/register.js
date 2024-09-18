import { API_AUTH_REGISTER } from '../../api/constants.js';

export function setupRegisterForm() {
  const form = document.querySelector('#register-form');
  
  if (form) {
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      
      const userData = {
        name: form.querySelector('#name').value,
        email: form.querySelector('#email').value,
        password: form.querySelector('#password').value,
      };

      try {
        const response = await fetch(API_AUTH_REGISTER, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });

        if (!response.ok) {
          throw new Error('Registration failed');
        }

        const result = await response.json();
        console.log('Registration successful:', result);
        // Handle successful registration (e.g., show success message, redirect to login)
        alert('Registration successful! Please log in.');
        window.location.href = '/auth/login/';
      } catch (error) {
        console.error('Registration failed:', error);
        // Handle registration error (e.g., show error message to user)
        alert('Registration failed. Please try again.');
      }
    });
  }
}
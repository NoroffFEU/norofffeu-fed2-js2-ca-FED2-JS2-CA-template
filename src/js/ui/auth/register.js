import { API_AUTH_REGISTER } from '../../api/constants.js';

export function setupRegisterForm() {
  console.log('Setting up register form');
  const form = document.querySelector('#register-form');
  
  if (form) {
    console.log('Register form found');
    form.addEventListener('submit', handleSubmit);
  } else {
    console.error('Register form not found');
  }
}

async function handleSubmit(event) {
  event.preventDefault();
  console.log('Form submitted');

  const form = event.target;
  const userData = {
    name: form.name.value,
    email: form.email.value,
    password: form.password.value,
  };

  console.log('Sending registration data:', userData);

  try {
    const response = await fetch(API_AUTH_REGISTER, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    console.log('Response received:', response);

    if (!response.ok) {
      throw new Error('Registration failed');
    }

    const result = await response.json();
    console.log('Registration successful:', result);
    alert('Registration successful! Please log in.');
    window.location.href = '/auth/login/';
  } catch (error) {
    console.error('Registration failed:', error);
    alert('Registration failed. Please try again.');
  }
}

// Add this line at the end of the file
export default setupRegisterForm;
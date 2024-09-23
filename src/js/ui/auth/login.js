import { login } from '../../api/auth/login.js';

export function setupLoginForm() {
  console.log('Setting up login form');
  const form = document.querySelector('#login-form');
  
  if (form) {
    console.log('Login form found');
    form.addEventListener('submit', onLogin);
  } else {
    console.error('Login form not found');
  }
}

async function onLogin(event) {
    console.log('onLogin function called');
    event.preventDefault();
    console.log('Login form submitted');

    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
        console.log('Attempting to log in with:', { email });
        const data = await login(email, password);

        const accessToken = data.accessToken || data.data?.accessToken;
        if (!accessToken) {
            console.error('Response structure:', JSON.stringify(data, null, 2));
            throw new Error('No access token received in the expected format');
        }

        localStorage.setItem('token', accessToken);
        localStorage.setItem('user', JSON.stringify(data.user || data.data?.user || data));

        console.log('Token stored in localStorage:', localStorage.getItem('token'));
        console.log('User stored in localStorage:', localStorage.getItem('user'));

        window.location.href = '/';
    } catch (error) {
        console.error('Login failed:', error);
        alert(`Login failed: ${error.message}`);
    }
}

export default setupLoginForm;
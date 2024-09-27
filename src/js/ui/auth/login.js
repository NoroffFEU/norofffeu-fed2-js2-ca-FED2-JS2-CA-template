import { loginUser } from '../../api/auth/login';

document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const result = await loginUser(email, password);
        if (result) {
            alert('Login successful!'); // Provide feedback to the user
            window.location.href = '/home'; // Redirect to home page after successful login
        }
    } catch (error) {
        alert(`Error: ${error.message}`);
    }
});

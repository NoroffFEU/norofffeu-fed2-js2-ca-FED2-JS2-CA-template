import { registerUser } from '../../api/auth/register';

document.getElementById('registerForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const result = await registerUser(username, email, password);
        if (result) {
            alert('Registration successful!'); // Provide feedback to the user
            window.location.href = '/login'; // Redirect to login page after success
        }
    } catch (error) {
        alert(`Error: ${error.message}`);
    }
});


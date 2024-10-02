export async function register({
  name,
  email,
  password,
  bio,
  banner,
  avatar,
}) {}

const apiUrl = "https://api.noroff.dev"; // Base URL of the API

// Register User
async function registerUser(username, email, password) {
    try {
        const response = await fetch(`${apiUrl}/social/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password,
            }),
        });

        const data = await response.json();
        if (response.ok) {
            console.log('User registered:', data);
            alert('Registration successful! You can now log in.');
            window.location.href = 'index.html'; // Redirect to login page
        } else {
            console.error('Registration failed:', data);
            alert(`Error: ${data.message}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred during registration.');
    }
}

// Login User
async function loginUser(email, password) {
    try {
        const response = await fetch(`${apiUrl}/social/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        });

        const data = await response.json();
        if (response.ok) {
            console.log('Login successful:', data);
            // Store the token in localStorage for future requests
            localStorage.setItem('jwtToken', data.token);
            alert('Login successful!');
            window.location.href = 'posts.html'; // Redirect to posts page
        } else {
            console.error('Login failed:', data);
            alert(`Error: ${data.message}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred during login.');
    }
}

// Logout User
function logoutUser() {
    localStorage.removeItem('jwtToken'); // Remove token from localStorage
    alert('You have been logged out.');
    window.location.href = 'index.html'; // Redirect to login page
}

// Register form handler
document.getElementById('registerForm')?.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent form from submitting normally
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    registerUser(username, email, password);
});

// Login form handler (for index.html)
document.getElementById('loginForm')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    loginUser(email, password);
});

// Logout button handler (for posts.html)
document.getElementById('logoutButton')?.addEventListener('click', () => {
    logoutUser();
});

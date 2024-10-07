const apiUrl = "https://api.noroff.dev"; // Base URL of the API
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
            window.location.href = 'index.html';
        } else {
            console.error('Registration failed:', data);
            alert(`Error: ${data.message}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred during registration.');
    }
}

document.getElementById('registerForm')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    registerUser(username, email, password);
});

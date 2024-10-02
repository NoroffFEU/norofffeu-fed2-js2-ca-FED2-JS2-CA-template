const apiUrl = "https://api.noroff.dev"; // Base URL of the API

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
            localStorage.setItem('jwtToken', data.token);
            alert('Login successful!');
            window.location.href = 'posts.html';
        } else {
            console.error('Login failed:', data);
            alert(`Error: ${data.message}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred during login.');
    }
}

document.getElementById('loginForm')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    loginUser(email, password);
});

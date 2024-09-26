/**
 * 
 * @param {*} param0 
 */
export async function login({ email, password }) {
    const response = await fetch('https://v2.api.noroff.dev/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
        throw new Error('Login failed');
    }

    const result = await response.json();

    // Save the token to the local storage
    localStorage.setItem("token", result.data.accessToken);

    return result; // Optionally return the result
}

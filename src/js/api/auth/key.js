export async function getKey(name) {}

const API_URL = 'https://docs.noroff.dev/docs/v2/auth/api-key'; 

export const registerUser = async (email, password) => {
    const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
    }

    return await response.json();
};


export const loginUser = async (email, password) => {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message); 
    }

    return await response.json(); 
};

const options = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": apiKey.data.key
    }
  }
   
  const response = await fetch(`${NOROFF_API_URL}/social/posts`, options)
  const data = await response.json()
export function headers() {
  const accessToken = localStorage.getItem('jwtToken'); // Retrieve the JWT token
  const apiKey = localStorage.getItem('apiKey'); // Retrieve the API key
  
  return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`, // Use the stored JWT token
      'X-Noroff-API-Key': apiKey // Use the stored API key
  };
}
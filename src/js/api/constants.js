// Use Postman, or JavaScript to get your API key
// In Workflow we will learn how to secure this information
import NoroffAPI from ".";
export async function initializeAPI() {
  const api = new NoroffAPI();
  try {
    const API_KEY = await api.options.apiKey();
    console.log(API_KEY); // Use the API key here
  } catch (error) {
    console.error("Error fetching API key:", error);
  }
}

// export const API_KEY = await api.options.apiKey();

export const API_BASE = "https://v2.api.noroff.dev";

export const API_AUTH = `${API_BASE}/auth`;

export const API_AUTH_LOGIN = `${API_AUTH}/login`;

export const API_AUTH_REGISTER = `${API_AUTH}/register`;

export const API_AUTH_KEY = `${API_AUTH}/create-api-key`;

export const API_SOCIAL = `${API_BASE}/social`;

export const API_SOCIAL_POSTS = `${API_SOCIAL}/posts`;

export const API_SOCIAL_PROFILES = `${API_SOCIAL}/profiles`;



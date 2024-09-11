import "./css/style.css";
import { API_KEY } from "./js/api/constants.js";
import NoroffAPI from "./js/api/index.js";

import router from "./js/router/index.js";

await router(window.location.pathname);



async function allProfiles() {
  try {
    const response = await fetch("https://v2.api.noroff.dev/social/profiles", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Noroff-API-Key": API_KEY,
        "Authorization": `Bearer ${localStorage.token}`,
      }
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const json = await response.json();
    console.log(json);

    return json;
  } catch (error) {
    console.error("Failed to fetch profiles:", error);
    throw error;  // Optionally, re-throw the error to handle it elsewhere
  }
}

allProfiles();
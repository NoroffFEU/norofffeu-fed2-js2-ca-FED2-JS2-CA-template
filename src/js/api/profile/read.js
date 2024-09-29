import { API_SOCIAL_PROFILES } from "../constants";
import { headers } from "../headers";

/**
 *
 * @param {string} username - name of the user
 * @returns {Promise} - user info
 * @example
 * ```js
 * readProfile("Finn")
 * ```
 */

export async function readProfile(username) {
  try {
    const response = await fetch(API_SOCIAL_PROFILES + "/" + username, {
      method: "GET",
      headers: headers(),
    });
    if (response.ok) {
      const profileData = await response.json();

      return profileData.data;
    }
  } catch (error) {
    alert("something went wrong trying to get your profile information");
  }
}

export async function readProfiles(limit, page) {}

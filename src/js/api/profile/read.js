import { API_SOCIAL_PROFILES } from "../constants";
import { headers } from "../headers";

export async function readProfile(username) {
  try {
    const response = await fetch(API_SOCIAL_PROFILES + "/" + username, {
      method: "GET",
      headers: headers(),
    });
    if (response.ok) {
      const profileData = await response.json();
      console.log(profileData.data);
      return profileData.data;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function readProfiles(limit, page) {}

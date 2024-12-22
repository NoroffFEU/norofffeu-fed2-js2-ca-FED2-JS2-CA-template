import { API_SOCIAL_PROFILES } from "../constants";
import { headers } from "../headers";

// Gets specific profile from API by username.
export async function readProfile(username) {
    try {
        const response = await fetch(`${API_SOCIAL_PROFILES}/${username}`, {
            method: 'GET',
            headers: headers(),
        });

        const data = await response.json();
        console.log(data);
        return data;
    }
    catch (error) {
        alert(error.message);
        console.error('An error occurred while reading a profile:', error);
        throw error;
}}

export async function readProfiles(limit, page) {
    try {
        const response = await fetch(`${API_SOCIAL_PROFILES}?limit=${limit}&page=${page}`, {
            method: 'GET',
            headers: headers(),
        });

        const data = await response.json();
        console.log(data);
        return data;
    }
    catch (error) {
        alert(error.message);
        console.error('An error occurred while reading profiles:', error);
        throw error;
    }
}

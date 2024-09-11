import { APIError, Params, ProfileResponse } from "@/types/types";
import { API_SOCIAL_PROFILES } from "@api/constants";
import { headers } from "@api/headers";

export async function readProfile(username: string) {
  try {
    const response = await fetch(
      `${API_SOCIAL_PROFILES}/${username}?_following=true&_followers=true&_posts=true`,
      {
        method: "GET",
        headers: headers(localStorage.token),
      }
    );

    if (!response.ok) {
      const { errors }: { errors: APIError[] } = await response.json();
      const errorMessage =
        errors?.[0]?.message || "Something went wrong reading the profile.";
      throw new Error(errorMessage);
    }

    const { data }: { data: ProfileResponse } = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function readProfiles({ limit, page }: Params) {
  try {
    const response = await fetch(
      `${API_SOCIAL_PROFILES}?limit=${limit}&page=${page}&_following=true&_followers=true&_posts=true`,
      {
        method: "GET",
        headers: headers(localStorage.token),
      }
    );

    if (!response.ok) {
      const { errors }: { errors: APIError[] } = await response.json();
      const errorMessage =
        errors?.[0]?.message || "Something went wrong reading the profiles.";
      throw new Error(errorMessage);
    }

    const { data }: { data: ProfileResponse[] } = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
}

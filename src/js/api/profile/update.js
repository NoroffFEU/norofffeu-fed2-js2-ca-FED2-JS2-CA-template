import { API_SOCIAL_PROFILES } from "../constants";
import { headers } from "../headers";

/**
 *
 * @param {string} username
 * @param {object} profileInfo - object that contains info about the profile - {avatar, banner, bio}
 * @param {object} profileInfo.avatar - object that contains url, and alt of the avatar (profile picture)
 * @param {object} profileInfo.banner . object that contains url, and alt of the banner (cover picture)
 * @param {string} profileInfo.bio - text that contains the bio of the profile
 *
 * @example
 * ```js
 * userProfile("Finn", {{url:"string",alt:"string"}, {url:"string", alt:"string"}, "Bio Text"})
 * ```
 */

export async function updateProfile(username, { avatar, banner, bio }) {
  try {
    const blob = { avatar: avatar, banner: banner, bio: bio };
    console.log(blob);

    const response = await fetch(API_SOCIAL_PROFILES + "/" + username, {
      method: "PUT",
      headers: headers(),
      body: JSON.stringify({
        avatar: avatar,
        banner: banner,
        bio: bio,
      }),
    });
    if (response.ok) {
      alert("You updated your profile!");
      const data = await response.json();
      localStorage.setItem("userInfo", json.stringify(data));
      // window.location.reload
    }
  } catch (error) {
    alert("something went wrong trying to update your profile");
    console.log(error);
  }
}

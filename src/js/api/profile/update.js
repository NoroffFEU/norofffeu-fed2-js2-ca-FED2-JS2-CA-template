import { API_SOCIAL_PROFILES } from "../constants";
import { headers } from "../headers";

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

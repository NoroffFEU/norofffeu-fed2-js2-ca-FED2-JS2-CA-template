import { readPostsByUser } from "../../api/post/read";
import { readProfile } from "../../api/profile/read";
import { setLogoutListener } from "../../ui/global/logout";
import { makePost } from "../../ui/post/makePost";
import { onUpdateProfile } from "../../ui/profile/update";
import { authGuard } from "../../utilities/authGuard";

const form = document.forms.updateProfile;

form.addEventListener("submit", onUpdateProfile);

authGuard();

setLogoutListener();

/**
 * Fetches the logged in user info and Creates the HTML for profile page
 *
 * @example
 * ```js
 * readProfileInfo()
 * ```
 */
const readProfileInfo = async () => {
  const username = JSON.parse(localStorage.getItem("userInfo"));
  const data = await readProfile(username.name);
  const userPosts = await readPostsByUser(username.name);
  console.log(data);

  const bannerDiv = document.getElementById("profileBanner");
  const profileImageDiv = document.getElementById("profileImage");
  const nameDiv = document.getElementById("username");
  const bioDiv = document.getElementById("bio");

  const banner = document.createElement("img");
  banner.src = data.banner.url;
  banner.alt = data.banner.alt;
  banner.className = "image";

  const profileImage = document.createElement("img");
  profileImage.src = data.avatar.url;
  profileImage.alt = data.avatar.alt;
  profileImage.className = "image";

  const name = document.createElement("h2");
  name.innerText = data.name;

  const bio = document.createElement("p");
  bio.innerText = data.bio;

  bannerDiv.appendChild(banner);
  profileImageDiv.appendChild(profileImage);
  nameDiv.appendChild(name);
  bioDiv.appendChild(bio);

  makePost(userPosts, "userPosts");
};

readProfileInfo();

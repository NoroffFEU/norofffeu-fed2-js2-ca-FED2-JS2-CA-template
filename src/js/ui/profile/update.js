import { updateProfile } from "../../api/profile/update";

export async function onUpdateProfile(event) {
  event.preventDefault();

  const userinfo = JSON.parse(localStorage.getItem("userInfo"));
  const username = userinfo.name;

  const formData = new FormData(event.target);

  const avatar = {
    url: formData.get("avatarUrl"),
    alt: formData.get("avatarAlt"),
  };

  const banner = {
    url: formData.get("bannerUrl"),
    alt: formData.get("bannerAlt"),
  };

  const updateData = {
    avatar: avatar,
    banner: banner,
    bio: formData.get("bio"),
  };

  updateProfile(username, updateData);
}

import { HomeProfile } from "@/components/profile/HomeProfile";
import { getUser } from "@/js/utilities/getUser";
import { readProfile } from "@/js/api/profile/read";

export async function renderProfile() {
  const user = getUser();
  const profileContainer = document.querySelector(
    ".profile__container"
  ) as HTMLElement;

  if (!customElements.get("home-profile")) {
    customElements.define("home-profile", HomeProfile);
  }

  const profileData = await readProfile(user);

  if (profileData) {
    const profile = document.createElement("home-profile") as HomeProfile;
    profile.data = profileData;
    profileContainer.append(profile);
  }
}

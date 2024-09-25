import { updateProfile } from "@/js/api/profile/update";
import { uploadImage } from "@/js/api/imgur/imgur";
import { getUser } from "@/js/utilities/getUser";

export async function onUpdateProfile(event: Event) {
  event.preventDefault();

  const user = getUser();

  const form = event.target as HTMLFormElement;
  const formData = new FormData(form);
  const userData = Object.fromEntries(formData);

  const bioInput = form.elements.namedItem("bio") as HTMLTextAreaElement;

  const avatarInput = form.elements.namedItem(
    "profile-avatar"
  ) as HTMLInputElement;

  const bannerInput = form.elements.namedItem(
    "profile-banner"
  ) as HTMLInputElement;

  let bio = bioInput.value;
  let avatar: { url: string; alt: string } | undefined = undefined;
  let banner: { url: string; alt: string } | undefined = undefined;

  if (avatarInput.files && avatarInput.files.length > 0) {
    const file = avatarInput.files[0];
    try {
      const avatarUrl = await uploadImage(file);
      const altText = `Image for ${user} avatar`;
      avatar = { url: avatarUrl, alt: altText };
    } catch (error) {
      console.error("Error uploading avatar:", error);
      alert("There was an issue uploading the avatar. Please try again.");
      return;
    }
  }

  if (bannerInput.files && bannerInput.files.length > 0) {
    const file = bannerInput.files[0];
    try {
      const bannerUrl = await uploadImage(file);
      const altText = `Image for ${user} banner`;
      banner = { url: bannerUrl, alt: altText };
    } catch (error) {
      console.error("Error uploading banner:", error);
      alert("There was an issue uploading the banner. Please try again.");
      return;
    }
  }

  try {
    await updateProfile(user, { bio, avatar, banner });
    alert("Profile updated successfully!");
    window.location.href = `/profile/?username=${user}`;
  } catch (error) {
    console.error(error);
  }
}

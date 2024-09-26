import { readProfile } from "@/js/api/profile/read";
import { getUser } from "@/js/utilities/getUser";
import { onUpdateProfile } from "@/js/ui/profile/update";

async function loadProfileEditPage() {
  try {
    const editProfileForm = document.forms.namedItem("editProfile");

    if (editProfileForm instanceof HTMLFormElement) {
      editProfileForm.addEventListener("submit", onUpdateProfile);
    }

    populateBio();
  } catch (error) {
    console.error(error);
  }
}

async function populateBio() {
  const bioInput = document.querySelector("#bio") as HTMLTextAreaElement;

  const user = getUser();
  try {
    const userProfile = await readProfile(user);
    if (userProfile) {
      bioInput.value = userProfile.bio;
    }
  } catch (error) {
    console.error(error);
  }
}

loadProfileEditPage();

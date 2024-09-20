import { onCreatePost } from "@ui/post/create";
import { authGuard } from "@utilities/authGuard";
import { findForm } from "@utilities/findForm";
import { renderProfile } from "@/js/ui/profile/renderUserProfile";

function loadPostCreatePage() {
  renderProfile();
  const createPostForm = findForm("createPost");
  if (createPostForm instanceof HTMLFormElement) {
    const formTitleInput = createPostForm.elements.namedItem(
      "title"
    ) as HTMLInputElement;
    formTitleInput.focus();
    createPostForm.addEventListener("submit", onCreatePost);
  }
}

authGuard();
loadPostCreatePage();

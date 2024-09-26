import { readPost } from "@/js/api/post/read";
import { authGuard } from "@utilities/authGuard";
import { findForm } from "@utilities/findForm";
import { getInput } from "@utilities/getInput";
import { onUpdatePost } from "@ui/post/update";

async function loadPostEditPage() {
  const editPostForm = findForm("editPost");

  try {
    if (editPostForm instanceof HTMLFormElement) {
      fetchAndPopulateForm(editPostForm);
      editPostForm.addEventListener("submit", onUpdatePost);
    }
  } catch (error) {
    console.error(error);
  }
}

async function fetchAndPopulateForm(editPostForm: HTMLFormElement) {
  const id = Number(new URLSearchParams(window.location.search).get("id"));

  const titleInput = getInput(editPostForm, "title");
  const bodyInput = getInput(editPostForm, "body");
  const tagsInput = getInput(editPostForm, "tags");

  try {
    const post = await readPost(id);

    if (!post) {
      return;
    } else {
      titleInput.value = post.title || "";
      bodyInput.value = post.body || "";
      tagsInput.value = post.tags.join(", ") || "";
    }
  } catch (error) {
    console.error(error);
  }
}

authGuard();
loadPostEditPage();

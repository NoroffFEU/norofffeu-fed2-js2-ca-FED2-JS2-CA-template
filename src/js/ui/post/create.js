import { createPost } from "../../api/post/create.js";

// Creates new post
// Gets values from form, uses POST method in createPost to push new post to API.
export async function onCreatePost(event) {
  event.preventDefault();

  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;

  const postData = {
    title: title,
    content: content,
  };

  try {
    const response = await createPost(postData);
    console.log(response);
    window.location.href = '/post/?id=' + response.id;
  } catch (error) {
    console.error('An error occurred during post creation:', error);
    alert(error.message);
  }
}
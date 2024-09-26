import { createPost } from "../../api/post/create.js";

export async function onCreatePost(event) {
  event.preventDefault();

  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;
//   const tags = document.getElementById('tags').value;
//   const media = document.getElementById('media').value;

  const postData = {
    title: title,
    content: content,
    // tags: tags,
    // media: media,
  };

  try {
    const response = await createPost(postData);
    console.log(response);
    window.location.href = '/';
  } catch (error) {
    console.error('An error occurred during post creation:', error);
    alert(error.message);
  }
}
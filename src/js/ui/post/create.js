import api from "../../api/instance.js";

export async function onCreatePost(event) {
  event.preventDefault();
  
  const titleInput = document.getElementById("title");
  const imageInput = document.getElementById('img-url');
  const imageAltInput = document.getElementById('img-alt');
  const tagsInput = document.getElementById('tags')
  const contentInput = document.getElementById('content');

  const title = titleInput.value;
  const imageUrl = imageInput.value;
  const imageAlt = imageAltInput.value;
  const tags = tagsInput.value;
  let tagsArray = tags.split(',');
  tagsArray = tagsArray.map(tag => tag.trim());
  const body = contentInput.value;

  titleInput.value = '';
  imageInput.value = '';
  imageAltInput.value = '';
  tagsInput.value = '';
  contentInput.value = '';

  console.log(title);
  console.log(imageUrl);
  console.log(body);

  try {
    await api.post.create({ 
      title,
      body,
      tags: tagsArray,
      media: {
        url: imageUrl,
        alt: imageAlt,
      }
    })
  } catch(error) {
    alert(error.message);
  }
}

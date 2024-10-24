import { postService } from "../../api/index";

export async function onCreatePost(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  if (data.tags) {
    data.tags = data.tags.split(',').map(tag => tag.trim());
   }

  if (data.media){
    data.media = {
      url: data.media,
      alt: data.alt || ''
    };

  if (!data.title || !data.body || data.tags.length === 0){
    console.error('Please fill out all fields.');
    return;
  }
  }

  try {
    const result = await postService.create(data);

    if (result){
      console.log('Post Created successfully:', result);
    }else {
      console.error('Failed to create post:', result.message);
    }
    window.location.href = "/";
  } catch (error) {
    console.error('Error creating post:', error);
  }
}

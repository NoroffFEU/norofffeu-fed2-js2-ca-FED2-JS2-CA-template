import { API_SOCIAL_POSTS, API_KEY } from '../../api/constants.js';

export function setupCreatePostFunctionality() {
  console.log('Setting up create post functionality');
  const form = document.querySelector('form[name="createPost"]');
  if (form) {
    console.log('Create post form found, adding event listener');
    form.addEventListener('submit', onCreatePost);
  } else {
    console.error("Create post form not found");
  }
}

export function showCreatePostForm() {
  const form = document.querySelector('form[name="createPost"]');
  if (form) {
    form.style.display = 'block';
  }
}

export function hideCreatePostForm() {
  const form = document.querySelector('form[name="createPost"]');
  if (form) {
    form.style.display = 'none';
  }
}


function isTokenExpired(token) {
  if (!token) return true;
  const payloadBase64 = token.split('.')[1];
  const decodedJson = atob(payloadBase64);
  const decoded = JSON.parse(decodedJson);
  const exp = decoded.exp;
  return Date.now() >= exp * 1000;
}  

export async function onCreatePost(event) {
  event.preventDefault();
  console.log('Form submission started');

  const form = event.target;
  const submitButton = form.querySelector('button[type="submit"]');
  const formData = new FormData(form);


  // Basic form validation
  if (!formData.get('title').trim()) {
    displayMessage(form, 'Please enter a title for your post.', 'red');
  const mediaInput = form.querySelector('input[name="media"]');

  console.log('Form elements:', { 
    submitButton, 
    titleInput, 
    contentInput, 
    tagsInput, 
    mediaInput 
  });

  if (!titleInput) {
    console.error('Title input not found');
    return;
  }
  const postData = {
    title: titleInput.value.trim(),
    body: contentInput.value.trim(),
    tags: tagsInput.value ? tagsInput.value.split(',').map(tag => tag.trim()).filter(Boolean) : [],
    media: mediaInput.value ? mediaInput.value.trim() : null
  };

  console.log('Post data:', postData);

  try {
    const token = localStorage.getItem('token');
    console.log('Token being sent:', token);

    if (!token || isTokenExpired(token)) {
      displayMessage(form, 'Your session has expired. Please log in again.', 'red');
      setTimeout(() => {
        window.location.href = '/auth/login/';
      }, 3000);
      return;
    }

    // Set loading state
    submitButton.disabled = true;
    submitButton.textContent = 'Creating post...';

    console.log('Sending request to:', API_SOCIAL_POSTS);
    console.log('Headers:', {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'X-Noroff-API-Key': API_KEY
    });

    const response = await fetch(API_SOCIAL_POSTS, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'X-Noroff-API-Key': API_KEY
      },
      body: JSON.stringify(postData)
    });

    console.log('Response status:', response.status);
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error response:', errorData);
      console.error('Response headers:', response.headers);
      throw new Error(errorData.message || `Failed to create post: ${response.statusText}`);
    }

    const result = await response.json();
    console.log('Post created:', result);

    form.reset();
    displayMessage(form, 'Post created successfully!', 'green');

    // Redirect to home page after successful post creation
    setTimeout(() => {
      window.location.href = '/';
    }, 2000);

  } catch (error) {
    console.error('Error creating post:', error);
    displayMessage(form, `Failed to create post: ${error.message}`, 'red');
  } finally {
    // Reset loading state
    submitButton.disabled = false;
    submitButton.textContent = 'Create Post';
  }
}

function displayMessage(form, message, color) {
  const messageElement = document.createElement('div');
  messageElement.textContent = message;
  messageElement.style.color = color;
  messageElement.style.marginTop = '10px';
  form.appendChild(messageElement);

  // Remove the message after 5 seconds
  setTimeout(() => {
    messageElement.remove();
  }, 5000);
}
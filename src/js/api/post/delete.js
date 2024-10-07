const BASE_URL = 'https://v2.api.noroff.dev/posts';

export async function deletePost(postId, token) {
    try {
        const response = await fetch(`${BASE_URL}/${postId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`, // Include the user's access token
            },
        });

        if (!response.ok) {
            throw new Error('Failed to delete post');
        }

        return true; 
    } catch (error) {
        console.error('Error deleting post:', error);
        throw error; 
    }
}

export async function deletePost(id) {
    const token = getMyToken();
    const confirmed = confirm("Are you sure you want to delete this post?");
  
    if (!confirmed) {
      return;
    }
  
    fetch(`${API_SOCIAL_POSTS}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-Noroff-API-Key": API_KEY,
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.status === 204) {
          alert("Post deleted");
          return;
        }
  
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
  
        return response.json();
      })
      .then(() => {
        location.reload();
      })
      .catch((error) => {
        throw new Error("Error deleting post: " + error.message);
      });
  }
  
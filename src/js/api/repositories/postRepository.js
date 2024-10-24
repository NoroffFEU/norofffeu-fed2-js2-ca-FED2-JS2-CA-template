import { API_SOCIAL_POSTS } from "../constants";
import { headers } from "../headers";

//payload - data
class PostRepository {
  async create({ title, body, tags, media }) {
    try {
      const payload = JSON.stringify({ title, body, tags, media });
      const response = await fetch(API_SOCIAL_POSTS, {
        method: "POST",
        headers: headers(),
        body: payload,
      });
      if (!response.ok) throw new Error(`Error: ${response.statusText}`);
      return await response.json();
    } catch (error) {
      console.error("Create Post Error:", error);
      throw error;
    }
  }

  async getAll(page = 1) {
    try {
      const response = await fetch(
        `${API_SOCIAL_POSTS}?limit=12&_author=true&page=${page}`,
        {
          method: "GET",
          headers: headers(),
        }
      );
      if (!response) throw new Error(`Error: ${response.statusText}`);
      return await response.json();
    } catch (error) {
      console.error("Get All Posts Error:", error);
      throw error;
    }
  }
  // Get a post by ID
  async post(id) {
    try{
      const response = await fetch(`${API_SOCIAL_POSTS}/${id}?_author=true`,{
        method:'GET',
        headers: headers(),
      });
      if(!response.ok) throw new Error (`Error: ${response.statusText}`);
      return await response.json();
    }catch(error){
      console.log(`${API_SOCIAL_POSTS}/${id}`);
      console.error('Get Post Error:', error);
      throw error;
    }
  }

  async delete(id){
    try{
      const response = await fetch (`${API_SOCIAL_POSTS}/${id}`,{
        method: 'DELETE',
        headers: headers(),
      })

      if (response.stastus === 204){
        return { message: 'Post deleted successfully.' };
      }

      if (!response.ok) throw new Error(`Error: ${response.statusText}`);
      return await response.json()
    }catch(error){
      console.error('Delete Post Error:', error);
      throw error;
    }
  }

  async update (id, {title, body, tags, media}){
    try{
      const payload = JSON.stringify({title, body, tags, media});
      const response = await fetch (`${API_SOCIAL_POSTS}/${id}`, {
        method: 'PUT',
        headers: headers(),
        body: payload,
      });
      if(!response.ok) throw new Error(`Error: ${response.statusText}`);
      return await response.json();
    }catch(error){
      console.error('Update Post Error:', error);
      throw error;
    }
  }
}

export default new PostRepository();

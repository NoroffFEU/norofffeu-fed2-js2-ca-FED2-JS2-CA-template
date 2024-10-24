import {postRepository} from "../index/";

class PostService {
    async create(postData){
        try{
            const response = await postRepository.create(postData)
            return response.data
        }catch(error){
            console.error('Error in PostService (create):', error);
            return error.message
        }
    }
    async getAll (page=1){
        try{
            const response = await postRepository.getAll(page)
            return response.data
        }catch(error){
            console.error('Error in PostService (getAll):', error);
            return error.message
        }
    }
    // Get a post by ID
    async post(id){
        try{
            const response = await postRepository.post(id)
            return response.data
        }catch(error){
            console.error('Error in PostService (post):', error);
            return error.message
        }
    }
    async delete(id){
        try{
            const response = await postRepository.delete(id);
            return response.data
        }catch(error){
            console.error('Error in PostService (delete):', error);
      return error.message
        }
    }

    async update (id, postData){
        try{
            const response = await postRepository.update(id, postData);
            return response
        }catch(error){
            console.error('Error in PostService (update):', error);
            return error.message 
        }
    }
} 

export default new PostService();
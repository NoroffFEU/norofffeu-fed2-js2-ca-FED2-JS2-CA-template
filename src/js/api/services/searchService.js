import {searchRepository} from "../index";

class SearchService {
    async post (query, page=1, limit=12){
        try{
            const response = await searchRepository.post(query, limit, page);
            return response.data || [];
        }catch(error){
            console.error('Error in SearchService (search):', error);
             return error.message
        }
    }
}
export default new SearchService();
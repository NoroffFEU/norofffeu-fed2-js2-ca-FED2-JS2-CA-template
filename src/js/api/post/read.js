import { API_SOCIAL_POSTS } from "../constants";
import { getCurrentUser } from "../../utilities/currentUser";
import NoroffAPI from "..";
import { API_SOCIAL_PROFILES } from "../constants";

const api = new NoroffAPI()

export async function readPost(id) {}

export async function readPosts(limit = 12, page = 1, tag) {

    const url = new URL(API_SOCIAL_POSTS)
    const {token} = getCurrentUser()

    const apiKeyData = await api.options.apiKey();
    
    url.searchParams.append("limit", limit)
    url.searchParams.append("page", page)
    if (tag) {
        url.searchParams.append("_tag", tag);
    }
    try{
        const response = await fetch(url,{
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
                "X-Noroff-API-Key": `${apiKeyData.data.key}`
            }
        });

        if(response.ok){
            const {data, meta}= await response.json()
            
            return { posts: data, totalPages: meta.pageCount, currentPage: meta.currentPage };
        }else {
            throw new Error(`Failed to fetch: ${response.statusText}`);
        }
    }catch (error){
        console.error("Error fetching posts:", error);
        alert(`Error fetching posts: ${error.message}`);

    }
}

export async function readPostsByUser(username, limit = 12, page = 1, tag) {
    const {token} = getCurrentUser()
    const apiKeyData = await api.options.apiKey();
    
    const url = new URL(API_SOCIAL_PROFILES)
    url.searchParams.append("limit", limit)
    url.searchParams.append("page", page)
    // url.searchParams.append("name", username)
    if (tag) {
        url.searchParams.append("_tag", tag);
    }
    try{
        const response = await fetch(url,{
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
                "X-Noroff-API-Key": `${apiKeyData.data.key}`
            }
        });

        if(response.ok){
            const {data, meta}= await response.json()
            // console.log(data)
            return { profiles: data, totalPages: meta.pageCount, currentPage: meta.currentPage };
        }else {
            throw new Error(`Failed to fetch: ${response.statusText}`);
        }
    }catch (error){
        console.error("Error fetching posts:", error);
        alert(`Error fetching posts: ${error.message}`);

    }
}

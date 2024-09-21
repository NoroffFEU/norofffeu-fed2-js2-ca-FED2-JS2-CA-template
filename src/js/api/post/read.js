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

    const cacheKey = `_posts_${limit}_${page}_${tag || 'all'}`;
    const cachedPosts = getCachedPosts(cacheKey)
    if(cachedPosts){
        return cachedPosts;
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
             setCachedPosts(cacheKey, { data, meta });

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

    const cacheKey = `${username}_posts_${limit}_${page}_${tag || 'all'}`;
    const cachedProfiles = localStorage.getItem(cacheKey)
    if(cachedProfiles){
        try{
            const parsedProfiles = JSON.parse(cachedProfiles);
            return { profiles: parsedProfiles.data, totalPages: parsedProfiles.meta.pageCount, currentPage: parsedProfiles.meta.currentPage };
        }catch(error){
            console.error("Error parsing cached profiles:", error);
            localStorage.removeItem(cacheKey); 
        }
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
            localStorage.setItem(cacheKey, JSON.stringify({ data, meta }));

            return { profiles: data, totalPages: meta.pageCount, currentPage: meta.currentPage };
        }else {
            throw new Error(`Failed to fetch: ${response.statusText}`);
        }
    }catch (error){
        console.error("Error fetching posts:", error);
        alert(`Error fetching posts: ${error.message}`);

    }
}

function getCachedPosts(cacheKey, expiryMinutes = 30) {
    const cachedItem = localStorage.getItem(cacheKey);
    if (!cachedItem) return null;

    try {
        const { data, meta, timestamp } = JSON.parse(cachedItem);
        const isExpired = (Date.now() - timestamp) > expiryMinutes * 60000;
        if (isExpired) {
            localStorage.removeItem(cacheKey);
            return null;
        }

        return { posts: data, totalPages: meta.pageCount, currentPage: meta.currentPage };
    } catch (error) {
        console.error("Error parsing cached data:", error);
        localStorage.removeItem(cacheKey);
        return null;
    }
}
function setCachedPosts(cacheKey, { data, meta }) {
    const cachedItem = JSON.stringify({ data, meta, timestamp: Date.now() });
    localStorage.setItem(cacheKey, cachedItem);
}

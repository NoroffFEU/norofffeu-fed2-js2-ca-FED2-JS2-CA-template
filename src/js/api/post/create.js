import { getCurrentUser } from "../../utilities/currentUser.js";
import { API_SOCIAL_POSTS } from "../constants.js";

export async function createPost({ title, body, tags, media }) {
    const {token, user} = getCurrentUser ();

    if(!token){
        throw new Error ("User must be logged in to create a post")
    }

    const postBody = JSON.stringify({title,body,tags,media})

    const response = await fetch (API_SOCIAL_POSTS(user.name),{
        method: "POST",
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: postBody
    });

    if (response.ok){
        const data = await response.json()
        return data
    }

    throw new Error ('Could not create post');
}

import NoroffAPI from "../api";
import { displayPosts } from "./displayHTML";
import { getAllProfiles } from "./displayHTML";
const api = new NoroffAPI()

export async function searchPosts(){
    const query = document.getElementById('searchQuery').value.trim();
    if(!query){
        alert("Emty text box, please search..");
        return;
    }

    try{
        const posts  = await api.search.read(query);
        const postData = posts.data

        displayPosts(postData); 

    
    } catch(error){
        console.log("Failed to search Posts", error)
    }
}

export async function searchProfile(){
    const query = document.getElementById('searchQueryProfile').value.trim();
    if(!query){
        alert("Emty text box, please search..");
        return;
    }
    
    try{
        const profiles  = await api.search.readProfile(query);
        const profileData = profiles.data
        
        getAllProfiles(profileData); 
        
        
    } catch(error){
        console.log("Failed to search Profile", error)
    }
}
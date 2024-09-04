alert("Single Post Page");
import NoroffAPI from "../../api";

const api = new NoroffAPI();

async function displayPosts(){
    
    try
    {const posts = await api.getPosts();
    const postsContainer = document.getElementById("postsContainer");

    posts.forEach((post) => {
        const postElement = document.createElement("div")
        postElement.classList.add("post");

        postElement.innerHTML = `
        <h2>${post.title}</h2>
        <p>${post.body}<p>
        <p><strong>Tags:<strong><${post.tags.join(" ,")}</p>
        ${post.media ? `<img src="${post.media}" alt="Post Media">` : ""}`
        
        postsContainer.appendChild(postElement)
    });
    }catch (error){
        alert("error displaying posts",error);
    }
}

displayPosts();


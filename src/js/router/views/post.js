alert("Single Post Page");
import NoroffAPI from "../../api";

const api = new NoroffAPI();

async function displayPosts(){
    
    try
    {
        
    const response = await api.getPosts();
    const posts = response.data;

    
    if (Array.isArray(posts)){
        const postsContainer = document.getElementById("postsContainer");
      
       
        const postsHTML = posts.map(post =>
            `
           <div class="post" onclick="window.location.href='/post/edit/?id=${post.id}'">
                <h2>${post.title}</h2>
                <p>${post.body}</p>
                <p><strong>Tags:</strong> ${post.tags.join(", ")}</p>
                ${post.media && post.media.url ? `<img src="${post.media.url}" alt="${post.media.alt || 'Post Media'}">` : ""}


           </div>
            `
        ).join('');
           
            
            postsContainer.innerHTML = postsHTML
       

    }else {
        alert("Error: Data is not in the expected format");
    }
    }catch (error){
        alert(`Error displaying posts: ${error.message}`);
    }
}

displayPosts();


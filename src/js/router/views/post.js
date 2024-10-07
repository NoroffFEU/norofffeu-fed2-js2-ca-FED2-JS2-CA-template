import { onDeletePost } from "../../ui/post/delete";
import { onReadSinglePost } from "../../ui/post/read";
alert("Single Post Page");

async function initializePost() {
    try {
      await onReadSinglePost();
  
      const postID = JSON.parse(localStorage.getItem("postID"));
  
      if (postID) {
        console.log("Post ID:", postID);
        localStorage.setItem("postID", JSON.stringify(postID));
      } else {
        console.error("No post ID found in local storage");
      }
    } catch (error) {
      console.error("Error initializing post:", error);
    }
  }
  
  initializePost();
  
  const postID = JSON.parse(localStorage.getItem("postID"));
  if (postID) {
    onDeletePost(postID);
  }
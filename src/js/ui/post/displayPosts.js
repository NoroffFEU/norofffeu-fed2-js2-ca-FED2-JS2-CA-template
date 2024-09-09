import { formatDate } from "../../utilities/authGuard";

export function generatePostHTML(post) {
  const postContainer = document.createElement('a');
  postContainer.classList.add('post-container');
  postContainer.id = post.id;
  //postContainer.href = ``;

  const thumbnail = document.createElement("img");
  thumbnail.classList.add("thumbnail");
  if(post.media?.url) {
    thumbnail.src = post.media.url;
    thumbnail.alt = post.media.alt;
  } else {
    thumbnail.src = "https://images.unsplash.com/photo-1500989145603-8e7ef71d639e?q=80&w=2976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    thumbnail.alt = "No Media Available";
  }
  
  const postTextContainer = document.createElement('div');
  postTextContainer.classList.add('post-text-container');

  const postUserDate = document.createElement('div');
  postUserDate.classList.add("post-user-date");
  const postUserContainer = document.createElement("div");
  postUserContainer.classList.add("user");
  const postUserIcon = document.createElement("i");
  postUserIcon.classList.add("fa-regular", "fa-user");
  postUserContainer.append(postUserIcon);

  const postDateContainer =  document.createElement("div");
  postDateContainer.classList.add("date");
  const postDateIcon = document.createElement("i");
  postDateIcon.classList.add("fa-regular", "fa-calendar");
  const postDate = document.createElement("p");
  postDate.textContent = formatDate(post.created);
  postDateContainer.append(postDateIcon, postDate);

  postUserDate.append(postUserContainer, postDateContainer);

  const postTagComment = document.createElement('div');
  postTagComment.classList.add("post-tag-comment");
  const tagList = document.createElement('ul');
  tagList.classList.add('tag-list');
  const tagsArray = post.tags;
  tagsArray?.forEach(tag => {
    const tagItem = document.createElement('li');
    tagItem.classList.add('tag-item');
    tagItem.textContent = tag;
    tagList.appendChild(tagItem);
  });
  postTagComment.append(tagList);

  const postTitle = document.createElement("p");
  postTitle.classList.add("post-title");
  postTitle.textContent = post.title;

  postTextContainer.append(postUserDate, postTagComment, postTitle);
  postContainer.append(thumbnail, postTextContainer);

  return postContainer;
}
import NoroffAPI from "../../api";
import { formatDate } from "../../utilities/authGuard";

export function generateSinglePostHTML(post) {
  const singlePostContainer = document.createElement("div");
  singlePostContainer.classList.add("single-post-container");

  const title = document.createElement("h1");
  title.textContent = post.title;
  const thumbnail = document.createElement("img");
  thumbnail.classList.add("thumbnail");
  if(post.media?.url) {
    thumbnail.src = post.media.url;
    thumbnail.alt = post.media.alt;
  } else {
    thumbnail.src = "../../../../public/images/default-thumbnail.jpg";
    thumbnail.alt = "No Media Available";
  }
  const postUserDate = document.createElement('div');
  postUserDate.classList.add("post-user-date");
  const postUserContainer = document.createElement("div");
  postUserContainer.classList.add("user");
  const postUserIcon = document.createElement("i");
  postUserIcon.classList.add("fa-regular", "fa-user");
  const userName = document.createElement("a");
  userName.textContent = post.author.name;
  userName.href = "#" //to profile page
  postUserContainer.append(postUserIcon, userName);

  const postDateContainer =  document.createElement("div");
  postDateContainer.classList.add("date");
  const postDateIcon = document.createElement("i");
  postDateIcon.classList.add("fa-regular", "fa-calendar");
  const postDate = document.createElement("p");
  postDate.textContent = formatDate(post.created);
  postDateContainer.append(postDateIcon, postDate);

  postUserDate.append(postUserContainer, postDateContainer);

  const tagList = document.createElement('ul');
  tagList.classList.add('tag-list', "single-post-tag-list");
  const tagsArray = post.tags;
  tagsArray?.forEach(tag => {
    const tagItem = document.createElement('li');
    tagItem.classList.add('tag-item');
    tagItem.textContent = tag;
    tagList.appendChild(tagItem);
  });

  const contentContainer = document.createElement("div");
  contentContainer.classList.add("content");
  const contentText = document.createElement("p");
  contentText.textContent = post.body;
  contentContainer.appendChild(contentText);

  const commentSection = document.createElement("div");
  commentSection.classList.add("comment-section")
  const sectionTitle = document.createElement("p")
  sectionTitle.classList.add("section-title");
  sectionTitle.textContent = `Comment (${post.comments.length})`;

  const commentList = document.createElement('ul');
  commentList.classList.add("comment-list");
  const commentsArray = post.comments;
  commentsArray?.forEach(comment => {
  const commentItem = document.createElement('li');
  commentItem.classList.add("comment-item");
  commentItem.textContent = comment;
  commentList.appendChild(commentItem);
  })

  const commentForm = document.createElement("form");
  commentForm.classList.add("comment-form");
  commentForm.name = "comment";
  const myUserName = document.createElement("p");
  myUserName.textContent = NoroffAPI.user;
  const commentTextArea = document.createElement("textarea");
  commentTextArea.placeholder = "Write comment here";
  const commentButton = document.createElement("button");
  commentButton.classList.add("submit-type-button");
  commentButton.type = "submit";
  commentButton.innerText = "Add comment";
  commentForm.append(myUserName, commentTextArea, commentButton)
  commentSection.append(sectionTitle, commentList, commentForm)

  singlePostContainer.append(title, thumbnail, postUserDate, tagList, contentContainer, commentSection);
  return singlePostContainer;
}
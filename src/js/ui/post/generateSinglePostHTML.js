import NoroffAPI from "../../api";
import { formatDate } from "../../utilities/formatDate";

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
    thumbnail.src = "../../../../images/default-thumbnail.jpg";
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
  userName.href = `/profile/?name=${post.author.name}`;
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
  tagsArray?.filter(tag => tag.trim().length > 0).forEach(tag => {
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
  for (let i = 0; i < commentsArray.length; i++) {
    const comment = commentsArray[i];
    const commentItem = document.createElement('li');
    commentItem.classList.add("comment-item");
    commentItem.id = comment.id;
    const commentContainer = document.createElement("div");
    commentContainer.classList.add("comment-container");
    const commentUser = document.createElement("a");
    commentUser.classList.add("comment-username");
    commentUser.href = `/profile/?name=${comment.author.name}`;
    commentUser.textContent = comment.author.name;
    const commentContent = document.createElement("p");
    commentContent.classList.add("comment-content");
    commentContent.textContent = comment.body;
    commentContainer.append(commentUser, commentContent);
    const commentDeleteButton = document.createElement("button");
    commentDeleteButton.classList.add("comment-delete-button");
    const commentDeleteIcon = document.createElement("i");
    commentDeleteIcon.classList.add("fa-solid", "fa-trash-can");
    commentDeleteButton.appendChild(commentDeleteIcon);
    commentItem.append(commentContainer, commentDeleteButton);
    commentList.appendChild(commentItem);
  }

  const commentForm = document.createElement("form");
  commentForm.classList.add("comment-form");
  commentForm.name = "comment";
  const myUserName = document.createElement("p");
  myUserName.textContent = NoroffAPI.user;
  const commentTextAreaLabel = document.createElement("label");
  commentTextAreaLabel.setAttribute('for', 'comment');

  const commentTextArea = document.createElement("textarea");
  commentTextArea.placeholder = "Write comment here";
  commentTextArea.name = "comment";
  commentTextArea.id = "comment";
  commentTextAreaLabel.appendChild(commentTextArea);

  const commentButton = document.createElement("button");
  commentButton.classList.add("submit-type-button", "comment-button");
  commentButton.type = "submit";
  commentButton.innerText = "Add comment";
  commentForm.append(myUserName, commentTextAreaLabel, commentButton)
  commentSection.append(sectionTitle, commentList, commentForm)

  singlePostContainer.append(title, thumbnail, postUserDate, tagList, contentContainer, commentSection);
  return singlePostContainer;
}
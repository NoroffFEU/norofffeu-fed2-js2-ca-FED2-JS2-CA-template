import { deleteComment } from "@/js/api/post/delete";
import { readProfile } from "@/js/api/profile/read";
import { name } from "@/js/router/views/notFound";
import { getTime } from "@/js/utilities/getTime";
import { getUser } from "@/js/utilities/getUser";
import { CommentResponse, ProfileResponse } from "@/types/types";

const commentTemplate = document.createElement("template");

commentTemplate.innerHTML = `
  <style>
    .comment__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 0.65rem;
    }

    .user-profile {
      display: flex;
      gap: 0.65rem;
      align-items: center;
      cursor: pointer;

     
    }

    .profile-info {
      display: flex;
      flex-direction: column;
      gap: 0.3rem;
    }

    ::slotted(.avatar) {
      aspect-ratio: 1;
      max-width: 50px;
      border-radius: 50%;
    }
      
    ::slotted(.name) {
      font-weight: bold;
      margin: 0;
    }

    ::slotted(.profile) {
      color: var(--text-color-secondary);
      margin: 0;
      font-size: 0.8rem;
    }

    ::slotted(.time) {
      color: var(--text-color-secondary);
      font-size: 0.8rem;
    }



  </style>
  <hr>
  <article class="comment">
    <div class="comment__header">
      <div class="user-profile">
        <div>
          <slot name="avatar"></slot>
        </div>
        <div class="profile-info">
          <slot name="name"></slot>
          <slot name="profile"></slot>
        </div>
      </div>
      <div>
        <slot name="time"></slot>
      </div>
    </div>
    <div> 
      <slot name="body"></slot>
    </div>
    <div class="comment-buttons">
      <button class="reply-btn">Reply</button>
      <button class="delete-btn">Delete</button>
    </div>
  </article>
`;

export class CommentTemplate extends HTMLElement {
  commentId: number;
  postId: number;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    if (this.shadowRoot) {
      this.shadowRoot.appendChild(commentTemplate.content.cloneNode(true));
    }

    const replyBtn = this.shadowRoot?.querySelector(
      ".reply-btn"
    ) as HTMLButtonElement;

    const deleteBtn = this.shadowRoot?.querySelector(
      ".delete-btn"
    ) as HTMLButtonElement;

    this.commentId = Number(this.getAttribute("data-comment-id"));
    this.postId = Number(this.getAttribute("data-post-id"));

    if (replyBtn && deleteBtn) {
      replyBtn.addEventListener("click", (e) => this.handleReplyComment(e));
      deleteBtn.addEventListener("click", (e) => this.handleDeleteComment(e));
    }
  }

  set commentData(commentData: CommentResponse) {
    const nameElement = document.createElement("p");
    nameElement.slot = "name";
    nameElement.innerText = commentData.owner;
    nameElement.classList.add("name");
    this.appendChild(nameElement);

    const profileElement = document.createElement("p");
    profileElement.slot = "profile";
    profileElement.classList.add("profile");
    profileElement.innerText = `@${commentData.owner}`;
    this.appendChild(profileElement);

    const timeElement = document.createElement("span");
    timeElement.slot = "time";
    timeElement.classList.add("time");
    timeElement.innerText = "now";
    this.appendChild(timeElement);

    const bodyElement = document.createElement("p");
    bodyElement.slot = "body";
    bodyElement.innerText = commentData.body;
    this.appendChild(bodyElement);
  }

  set commentUser(user: ProfileResponse) {
    const img = document.createElement("img");
    img.slot = "avatar";
    img.src = user.avatar.url;
    img.alt = user.name;
    img.classList.add("avatar");
    this.appendChild(img);
  }

  async handleDeleteComment(e: Event) {
    const confirmDelete = confirm(
      "Are you sure you want to delete this comment?"
    );

    if (confirmDelete) {
      try {
        const postId = Number(this.getAttribute("data-post-id"));
        const commentId = Number(this.getAttribute("data-comment-id"));

        await deleteComment(postId, commentId);
        this.remove();
      } catch (error) {
        console.error(error);
      }
    }
  }

  handleReplyComment(e: Event) {
    console.log("hola, reply button");
  }
}

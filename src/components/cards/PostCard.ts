import { PostResponse } from "@/types/types";
import { FollowButton } from "@/components/buttons/FollowButton";
import { LikeButton } from "@/components/buttons/LikeButton";
import { DeleteButton } from "@/components/buttons/DeleteButton";
import { FormattedDate } from "@/components/post/FormattedDate";
import { PostButtons } from "@/components/post/PostButtons";
import { CommentInput } from "@/components/post/CommentInput";
import { CommentTemplate } from "@/components/post/CommentTemplate";
import { getTime } from "@/js/utilities/getTime";

import { getUser } from "@/js/utilities/getUser";

export function createPostHTML(
  post: PostResponse,
  isFollowing: boolean,
  isLiked: boolean,
  isUserPost: boolean,
  isViewPost: boolean
) {
  if (!customElements.get("follow-button")) {
    customElements.define("follow-button", FollowButton);
  }

  if (!customElements.get("like-button")) {
    customElements.define("like-button", LikeButton);
  }

  if (!customElements.get("delete-button")) {
    customElements.define("delete-button", DeleteButton);
  }

  if (!customElements.get("formatted-date")) {
    customElements.define("formatted-date", FormattedDate);
  }

  if (!customElements.get("post-buttons")) {
    customElements.define("post-buttons", PostButtons);
  }

  if (!customElements.get("comment-input")) {
    customElements.define("comment-input", CommentInput);
  }

  if (!customElements.get("comment-template")) {
    customElements.define("comment-template", CommentTemplate);
  }

  return `
  <li class="post" data-post-id="${post.id}">
    <div class="post__header">
        <div>
            <div>
               
            </div>
            <div class="post__header__avatar">
                <img 
                    src="${post.author.avatar.url}" 
                    alt="${post.author.name} avatar" 
                />
            </div>

            <div class="post__header__user">
                <span>${post.author.name}</span>
                <a href="/profile/?username=${post.author.name}">
                    @${post.author.name}
                </a>
            </div>

            </div>
            ${
              isUserPost && post.author.name === getUser()
                ? `
                <div class="user-buttons">
                    <delete-button 
                        data-post-id="${post.id}" 
                        data-is-user-post="${isUserPost}"
                    >
                        Delete
                    </delete-button>
                    <a 
                        class="edit-btn" 
                        href="/post/edit/?id=${post.id}"
                    >
                        Edit
                    </a>
                </div>`
                : `
                <div>
                    <follow-button 
                        data-user-name="${post.author.name}" 
                        data-is-following="${isFollowing}" 
                        data-is-user-post="${isUserPost}"
                    ></follow-button>
                </div>
            `
            }
        </div>

    <div class="post__body">
        <a href="/post/?id=${post.id}">
            ${post.title}
        </a>
        <p>${post.body}</p>

            ${
              post.media?.url
                ? `<img class="post__body__media" src="${post.media.url}" alt="${post.title} media" />`
                : ""
            }
            ${
              post.tags.length > 0 && post.tags[0] !== ""
                ? `<div class="post__body__tags">${post.tags
                    .map((tag) => `<span>#${tag}</span>`)
                    .join("")}</div>`
                : ""
            }
    </div>

    ${
      !isViewPost
        ? `
        <div class="post__footer">
            <div>
                <a href="/post/?id=${post.id}">View</a>
                <a href="/post/?id=${post.id}">Reply</a>
            </div>

            <div>
              <span>${post._count.comments} Comments</span>
            
              <like-button 
                  data-post-id="${post.id}" 
                  data-reactions="${post._count.reactions}" 
                  data-user-liked="${isLiked}"
              >
              </like-button>
            </div>
      
        </div>
        <hr>
        
        `
        : `
        
        <formatted-date 
            data-created="${post.created}" 
            data-updated="${post.updated}"
        ></formatted-date>


        <comment-input data-post-id="${post.id}"></comment-input>

        <div id="post-comments">
         ${
           post.comments.length > 0
             ? post.comments
                 .sort(
                   (a, b) =>
                     new Date(a.created).getTime() -
                     new Date(b.created).getTime()
                 )
                 .map((comment) => {
                   console.log(comment);
                   return `
                   <comment-template 
                      data-comment-id="${comment.id}" 
                      data-post-id="${comment.postId}"
                      data-owner="${comment.author.name}"
                      data-created="${comment.created}"
                      >
                        <img 
                            class="avatar"
                            slot="avatar" 
                            src="${
                              comment.author.avatar.url ||
                              "/images/placeholder-avatar.jpg"
                            }" 
                            alt="${
                              comment.author.name || "Placeholder"
                            } avatar" 
                        />
                        <p class="name" slot="name">${
                          comment.author.name || ""
                        }</p>
                        <p class="profile" slot="profile">@${
                          comment.author.name || ""
                        }</p>
                        <span class="time" slot="time">${getTime(
                          comment.created
                        )}</span>
                        <p slot="body">${comment.body || ""}</p>
                   </comment-template>`;
                 })
                 .join("")
             : ""
         }
        </div>
   
        `
    }
    
  </li>
    `;
}

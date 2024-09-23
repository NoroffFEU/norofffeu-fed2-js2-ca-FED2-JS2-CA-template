import { PostResponse } from "@/types/types";
import { FollowButton } from "@/components/buttons/FollowButton";
import { LikeButton } from "@/components/buttons/LikeButton";
import { DeleteButton } from "@/components/buttons/DeleteButton";
import { FormattedDate } from "@/components/post/FormattedDate";
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

  return `
  <li class="post" data-post-id="${post.id}">
    <div class="post__header">
        <div>
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
      
            <like-button 
                data-post-id="${post.id}" 
                data-reactions="${post._count.reactions}" 
                data-user-liked="${isLiked}"
            >
            </like-button>
        </div>
        
        `
        : `
        
        <formatted-date 
            data-created="${post.created}" 
            data-updated="${post.updated}"
        ></formatted-date>

        <hr>
            <div
                id="main-post__footer__buttons"
                style="display: flex; justify-content: space-around"
            >
                <button id="main-post__footer__buttons__comment">Comment</button>
                <button id="main-post__footer__buttons__boost">Boost</button>
                <button id="main-post__footer__buttons__like">0 | Like</button>
                <button id="main-post__footer__buttons__share">Share</button>
                <button id="main-post__footer__buttons__bookmark">Bookmark</button>
              </div>
            </div>
        `
    }
          <hr>
    
  </li>
    `;
}

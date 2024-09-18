import { readPosts } from "@/js/api/post/read";
import { AllPostsResponse, Meta } from "@/types/types";
import { getUser } from "@/js/utilities/getUser";
import { getUserProfile } from "@/js/utilities/getUserProfile";
import { FollowButton } from "@/components/buttons/FollowButton";
import { LikeButton } from "@/components/buttons/LikeButton";
import { DeleteButton } from "@/components/buttons/DeleteButton";
import { authGuard } from "@/js/utilities/authGuard";

async function loadExplorePage() {
  try {
    renderAllPosts();
  } catch (error) {
    console.error(error);
  }
}

export async function renderAllPosts(page: number = 1) {
  const postsContainer = document.getElementById("posts") as HTMLUListElement;

  if (!customElements.get("follow-button")) {
    customElements.define("follow-button", FollowButton);
  }

  if (!customElements.get("like-button")) {
    customElements.define("like-button", LikeButton);
  }

  if (!customElements.get("delete-button")) {
    customElements.define("delete-button", DeleteButton);
  }

  const getAllPosts = (await readPosts({ page: page })) as AllPostsResponse;

  const { data, meta } = getAllPosts;

  const getFollowingUsers = await getUserProfile();

  if (!data || data.length === 0) {
    postsContainer.innerHTML = "No posts found";
  } else {
    data.forEach(async (post) => {
      const li = document.createElement("li");
      li.setAttribute("data-post-id", post.id.toString());
      li.classList.add("post");

      const isFollowing = getFollowingUsers?.find(
        (user) => user.name === post.author.name
      )
        ? true
        : false;

      const isLiked = post.reactions[0]?.reactors.find(
        (user) => user === getUser()
      )
        ? true
        : false;

      const isUserPost = post.author.name === getUser() ? true : false;

      console.log(post.tags);

      li.innerHTML = `
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
                    <a 
                      href="/profile/?username=${post.author.name}"
                    >
                      @${post.author.name}
                    </a>
                  </div>
                </div>

                ${
                  isUserPost
                    ? `
                    <div class="user-buttons">
                      <delete-button 
                        data-post-id="${post.id}" 
                        data-is-user-post="${isUserPost}"
                      >
                        Delete
                      </delete-button>
                      <a class="edit-btn" href="/post/edit/?id=${post.id}">
                        Edit
                      </a>
                    </div>
                  `
                    : `
                    <div>
                      <follow-button 
                        data-user-name="${post.author.name}" 
                        data-is-following="${isFollowing}" 
                        data-is-user-post="${isUserPost}"
                      >
                      </follow-button>
                    </div>
                    `
                }

              </div>

              <div class="post__body">
                <a href="/post/?id=${post.id}">${post.title}</a>
                <p>${post.body}</p>
                <div>
                  ${
                    post.media?.url
                      ? `<img class="post__body__media" src="${post.media.url}" alt="${post.title} media" />`
                      : ""
                  }
                </div>
                ${
                  post.tags.length > 0 && post.tags[0] !== ""
                    ? `<div class="post__body__tags">${post.tags
                        .map((tag) => `<span>#${tag}</span>`)
                        .join("")}</div>`
                    : ""
                }
              </div>


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
              <hr>
         `;

      postsContainer.appendChild(li);
    });
  }
}

async function renderPagination(meta: Meta) {
  const postsContainer = document.getElementById("posts") as HTMLUListElement;
  const paginationContainer = document.getElementById(
    "pagination"
  ) as HTMLUListElement;
  console.log(meta);

  let page = meta.currentPage;
  const li = document.createElement("li");

  if (meta.previousPage !== null) {
    li.innerHTML = `
    <li><button class="previous">Previous</button></li>
    `;
    paginationContainer.appendChild(li);
  }

  if (meta.nextPage !== null) {
    li.innerHTML = `
    <li><button class="next">Next</button></li>
    `;
    paginationContainer.appendChild(li);
  }

  const previousBtn = paginationContainer.querySelector(".previous");
  const nextBtn = paginationContainer.querySelector(".next");

  previousBtn?.addEventListener("click", () => {
    page--;
    renderAllPosts(page);
  });

  nextBtn?.addEventListener("click", () => {
    page++;
    renderAllPosts(page);
  });
}

loadExplorePage();
authGuard();
// toggleFollowUser("andgram", "follow");

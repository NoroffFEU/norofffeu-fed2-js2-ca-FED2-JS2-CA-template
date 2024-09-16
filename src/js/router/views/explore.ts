import { readPosts } from "@/js/api/post/read";
import { getLikeButtons } from "@/js/ui/post/like";
import { getDeleteButtons } from "@/js/ui/post/delete";
import { AllPostsResponse, Meta } from "@/types/types";
import { getFollowButtons } from "@/js/ui/profile/follow";
import { getUser } from "@/js/utilities/getUser";
import { readProfile } from "@/js/api/profile/read";
import { getUserProfile } from "@/js/utilities/getUserProfile";
import { toggleFollowUser } from "@/js/api/profile/follow";
import { FollowButton } from "@/components/buttons/FollowButton";

async function loadExplorePage() {
  try {
    renderAllPosts();
  } catch (error) {
    console.error(error);
  }
}

export async function renderAllPosts(page: number = 1) {
  const postsContainer = document.getElementById("posts") as HTMLUListElement;
  const paginationContainer = document.getElementById(
    "pagination"
  ) as HTMLUListElement;

  if (!customElements.get("follow-button")) {
    customElements.define("follow-button", FollowButton);
  }

  const getAllPosts = (await readPosts({ page: page })) as AllPostsResponse;

  postsContainer.innerHTML = "";

  const { data, meta } = getAllPosts;

  const getFollowingUsers = await getUserProfile();

  if (!data || data.length === 0) {
    // window.location.href = "/404/";
    console.log("No posts found");
  } else {
    data.forEach(async (post) => {
      const li = document.createElement("li");

      const isFollowing = getFollowingUsers?.find(
        (user) => user.name === post.author.name
      )
        ? true
        : false;

      li.innerHTML = `
            <li>
              <div>
                <span>${post.author.name}</span>

                ${
                  post.author.name !== getUser()
                    ? `<follow-button data-user-name="${post.author.name}" data-is-following="${isFollowing}"></follow-button>`
                    : ""
                }
                
              </div>
              <div>
                <a href="/post/?id=${post.id}">${post.title}</a>
              </div>
              <div>
                <button class="delete-btn" data-post-id="${
                  post.id
                }">Delete</button>
                <a href="/post/edit/?id=${post.id}">Edit</a>
                <button class="like-btn" data-post-id="${post.id}">${
        post._count.reactions
      } | 👍</button>
              </div>
              <hr>
            </li> `;
      postsContainer.appendChild(li);
    });

    renderPagination(meta);
    getFollowButtons();
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

// toggleFollowUser("andgram", "follow");

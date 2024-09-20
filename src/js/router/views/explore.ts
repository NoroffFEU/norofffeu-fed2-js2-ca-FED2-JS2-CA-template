import { readPosts } from "@/js/api/post/read";
import { AllPostsResponse, Meta } from "@/types/types";
import { getUser } from "@/js/utilities/getUser";
import { getUserProfile } from "@/js/utilities/getUserProfile";
import { authGuard } from "@/js/utilities/authGuard";
import { createPostHTML } from "@/components/cards/PostCard";
import { renderProfile } from "@/js/ui/profile/renderUserProfile";

async function loadExplorePage() {
  try {
    renderAllPosts();
    renderProfile();
  } catch (error) {
    console.error(error);
  }
}

export async function renderAllPosts(page: number = 1) {
  const postsContainer = document.getElementById("posts") as HTMLUListElement;

  const getAllPosts = (await readPosts({ page: page })) as AllPostsResponse;

  const { data, meta } = getAllPosts;

  const getFollowingUsers = await getUserProfile();

  if (!data || data.length === 0) {
    postsContainer.innerHTML = "No posts found";
  } else {
    data.forEach(async (post) => {
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

      const postHTML = createPostHTML(post, isFollowing, isLiked, isUserPost);
      postsContainer.insertAdjacentHTML("beforeend", postHTML);
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

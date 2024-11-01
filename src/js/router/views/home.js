import controllers from "../../controllers/index";
import utils from "../../utilities/utils";

async function init() {
  const container = document.querySelector(".main-content");
  clearContent(container);
  try {
    const posts = await controllers.PostController.posts();
    const { data } = posts;

    renderPosts(container, data.posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    container.innerHTML = "<p>Error loading posts. Please try again later.</p>";
  }
}

function clearContent(target) {
  if (target) target.innerHTML = "";
}

export async function renderPosts(target, posts) {
  if (target) {
    const postsElement = posts.map((post) => {
      const createdDate = utils.date(post.created);
      const tags = utils.formatTags(post.tags);

      const postElement = document.createElement("div");
      postElement.classList.add("story");
      postElement.innerHTML = `
      

  <div class="p-4 max-w-5xl">
    <div class="flex rounded-lg h-full dark:bg-gray-800 bg-teal-400 p-8 flex-col">
      <div class="flex items-center mb-3">
        <div class="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full dark:bg-indigo-500 bg-indigo-500 text-white flex-shrink-0">
          <a class="" href="/profile/?author=${post.author.name}">
            <img class="avatar__image" src="${
              post.author.avatar.url
            }" alt="${post.author.avatar.alt} width="32" height="32" />
          </a>
        </div>

        <div>
          <div>
            <a href="/profile/?author=
            ${post.author.name}">
            <h2 class="text-white dark:text-white text-lg font-medium hover:text-blue-600">${post.author.name}</h2>
            </a>
          </div>
          <div>
            <h2 class="text-white dark:text-white text-lg font-medium">${createdDate}</h2>
          </div>
        </div>

      </div>
      <div class="flex flex-col justify-between flex-grow">
        <a href="/post/?id=${post.id}">
          <h3 class="leading-relaxed text-base text-white dark:text-gray-300">
          ${post.title}
          </h3>
        </a>
      <div class="story__tags">
        ${tags}
      </div>
        <a class="mt-3 text-black dark:text-white hover:text-blue-600 inline-flex items-center" href="/post/?id=${post.id}#comments">
          <div class="story__comment">
                    <ion-icon class="icon-comment" name="chatbubble-outline"></ion-icon>
                    ${
                      post._count.comments === 0
                        ? "Add Comment"
                        : post._count.comments > 1
                          ? ` ${post._count.comments} comments`
                          : `${post._count.comments} comment`
                    }
            </div>
        </a>
      </div>
    </div>
  </div>

      `;
      return postElement;
    });

    postsElement.forEach((element) => target.appendChild(element));
  }
}

init();



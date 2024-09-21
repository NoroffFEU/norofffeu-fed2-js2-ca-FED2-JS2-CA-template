// import { PostResponse } from "@/types/types";

// export async function renderPostHTML(post: PostResponse) {
//   return `
//   <article id="main-post">
//             <div
//               id="main-post__header"
//               style="display: flex; justify-content: space-between"
//             >
//               <div style="display: flex; justify-items: center">
//                 <div>
//                   <img
//                     id="main-post__header__avatar"
//                     src="${
//                       post.author.avatar.url || "/images/placeholder-avatar.jpg"
//                     }"
//                     style="
//                       aspect-ratio: 1;
//                       width: 50px;
//                       object-fit: cover;
//                       border-radius: 50%;
//                       object-position: center;
//                     "
//                   />
//                 </div>
//                 <div
//                   style="display: flex; flex-direction: column; margin-left: 10px"
//                 >
//                   <span id="main-post__header__nickname"> ${
//                     post.author.name || ""
//                   }</span>
//                   <a id="main-post__header__profile" href="#"> @${
//                     post.author.name || ""
//                   }</a>
//                 </div>
//               </div>

//               <div><span id="main-post__header__time"></span></div>
//             </div>
//             <div id="main-post__body">
//               <p id="main-post__body__text"></p>
//             </div>
//             <div>
//               <img
//                 id="main-post__body__media"
//                 style="max-width: fit-content; width: 100%"
//               />
//             </div>
//             <div id="main-post__footer">
//               <hr />
//               <div
//                 id="main-post__footer__tags"
//                 style="display: flex; gap: 10px"
//               ></div>
//               <hr />
//               <div style="display: flex; justify-content: space-between">
//                 <div style="margin: auto 0">
//                   <span id="main-post__footer_date"></span>
//                 </div>
//                 <div style="display: flex; gap: 10px">
//                   <p><span id="main-post__footer__likes"></span> Likes</p>
//                   <p><span id="main-post__footer__boosts">0</span> Boost</p>
//                 </div>
//               </div>

//               <hr />

//               <div
//                 id="main-post__footer__buttons"
//                 style="display: flex; justify-content: space-around"
//               >
//                 <button id="main-post__footer__buttons__comment">Comment</button>
//                 <button id="main-post__footer__buttons__boost">Boost</button>
//                 <button id="main-post__footer__buttons__like">0 | Like</button>
//                 <button id="main-post__footer__buttons__share">Share</button>
//                 <button id="main-post__footer__buttons__bookmark">Bookmark</button>
//               </div>
//             </div>
//           </article>
//   `;
// }

// import { readPost } from "@/js/api/post/read";
// import { PostResponse } from "@/types/types";

// const postViewTemplate = document.createElement("template");

// postViewTemplate.innerHTML = `
//   <style>
//   </style>

//   <article id="main-post">
//     <div id="main-post__header">
//       <div id="main-post__header__info">
//         <div>
//           <img id="main-post__header__avatar" />
//         </div>
//         <div id="main-post__header__profile-info">
//           <span id="main-post__header__nickname"></span>
//           <a id="main-post__header__profile" href="#"></a>
//         </div>
//       </div>
//       <div>
//         <span id="main-post__header__time"></span>
//       </div>
//     </div>

//     <div id="main-post__body">
//       <p id="main-post__body__text"></p>
//     </div>

//     <div>
//       <img id="main-post__body__media" />
//     </div>

//     <div id="main-post__footer">
//       <hr />
//       <div id="main-post__footer__tags"></div>
//       <hr />
//       <div id="main-post__footer__info">
//         <div>
//           <span id="main-post__footer_date"></span>
//         </div>
//         <div id="main-post__footer__stats">
//           <p><span id="main-post__footer__likes"></span> Likes</p>
//           <p><span id="main-post__footer__boosts">0</span> Boost</p>
//         </div>
//       </div>
//       <hr />
//       <div id="main-post__footer__buttons">
//         <button id="main-post__footer__buttons__comment">Comment</button>
//         <button id="main-post__footer__buttons__boost">Boost</button>
//         <button id="main-post__footer__buttons__like">0 | Like</button>
//         <button id="main-post__footer__buttons__share">Share</button>
//         <button id="main-post__footer__buttons__bookmark">Bookmark</button>
//       </div>
//     </div>
//   </article>

// `;

// export class PostView extends HTMLElement {
//   private postId: number;

//   constructor() {
//     super();
//     this.postId = Number(this.getAttribute("data-post-id"));

//     this.attachShadow({ mode: "open" });
//     if (this.shadowRoot) {
//       this.shadowRoot.appendChild(postViewTemplate.content.cloneNode(true));
//     }
//   }

//   connectedCallback() {
//     this.fetchPost();
//   }

//   async fetchPost() {
//     if (!this.postId) {
//       console.log("No post id found");
//     }
//     try {
//       const post = await readPost(this.postId);

//       if (!post) {
//         throw new Error("Error fetching post");
//       }

//       this.render(post);
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   disconnectedCallback() {
//     this.removeEventListener("click", this.handleClick);
//   }

//   handleClick = () => {
//     window.location.href = `/post/?id=${this.postId}`;
//   };

//   render(post: PostResponse) {
//     const test = this.shadowRoot?.querySelector(".culo") as HTMLElement;

//     if (post) {
//       test.innerHTML = `hola ${this.postId} eres el ${post.title}`;
//     }
//   }
// }

// customElements.define("post-view", PostView);

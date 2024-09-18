// import { PostResponse } from "@/types/types";
// import { DeleteButton } from "@/components/buttons/DeleteButton";

// const postCardTemplate = document.createElement("template");

// postCardTemplate.innerHTML = `
// <li>
//   <div>
//     <h3 id="username"></h3>
//     <delete-button></delete-button>
//   </div>
// </li>
// `;

// export class PostCard extends HTMLElement {
//   private _post: PostResponse | null = null;

//   constructor() {
//     super();
//     this.attachShadow({ mode: "open" });
//     if (this.shadowRoot) {
//       this.shadowRoot.appendChild(postCardTemplate.content.cloneNode(true));
//     }
//   }

//   set post(data: PostResponse) {
//     this._post = data;
//     this.render();
//   }

//   render() {
//     console.log(this._post);
//     if (this.shadowRoot && this._post) {
//       const username = this.shadowRoot.querySelector("#username");

//       if (username) {
//         username.textContent = this._post.author.name;
//       }
//     }
//   }

//   renderDeleteButton() {}
// }

// customElements.define("post-card", PostCard);

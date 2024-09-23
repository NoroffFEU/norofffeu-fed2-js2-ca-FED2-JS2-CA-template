const postButtonsTemplate = document.createElement("template");

postButtonsTemplate.innerHTML = `
  <style>
    .post-buttons {
      display: flex;
      justify-content: space-around;
      gap: 0.65rem;
    }
  </style>
  <div class="post-buttons">
    <button>Comment</button>
    <button>Boost</button>
    <button>Like</button>
    <button>Share</button>
    <button>Bookmark</button>
  </div>
`;

export class PostButtons extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    if (this.shadowRoot) {
      this.shadowRoot.appendChild(postButtonsTemplate.content.cloneNode(true));
    }
  }
}

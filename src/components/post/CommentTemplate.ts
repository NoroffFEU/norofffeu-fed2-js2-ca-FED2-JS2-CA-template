const commentTemplate = document.createElement("template");

commentTemplate.innerHTML = `
  <style>
    .comment {
    padding: 1rem;
  </style>
  <article class="comment">
  </article>
  `;

export class CommentTemplate extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    if (this.shadowRoot) {
      this.shadowRoot.appendChild(commentTemplate.content.cloneNode(true));
    }
  }

  set commentText(value: string) {
    const commentTextElement = this.shadowRoot?.querySelector(
      ".comment"
    ) as HTMLParagraphElement;

    commentTextElement.textContent = value;
  }

  connectedCallback() {
    this.addEventListener("click", (e) => this.handleClick(e));
  }

  disconnectedCallback() {
    this.removeEventListener("click", (e) => this.handleClick(e));
  }

  handleClick(e: Event) {
    const confirmDelete = confirm(
      "Are you sure you want to delete this comment?"
    );
    if (confirmDelete) {
      this.remove();
    }
  }
}

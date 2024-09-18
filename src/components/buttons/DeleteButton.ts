import { deletePost } from "@/js/api/post/delete";

const deleteButtonTemplate = document.createElement("template");

deleteButtonTemplate.innerHTML = `
  <style>
    button {
        color: #333;
        border: 1px solid #ccc;
        text-decoration: none;
        font-size: 0.8rem;
        padding: 0.25rem 0.65rem;
        border-radius: 0.65rem;
        transition: all 0.2s ease-in-out; cursor: pointer; 
    }
    button:hover {
      background-color: red;
      color: white;
    }
  </style>
  <button>
    <slot></slot>
  </button>
`;

export class DeleteButton extends HTMLElement {
  // Debouncing state
  private isProcessing: boolean = false;
  postId: number;
  isUserPost: boolean;

  constructor() {
    super();
    this.postId = Number(this.getAttribute("data-post-id"));
    this.isUserPost = this.getAttribute("data-is-user-post") === "true";

    this.attachShadow({ mode: "open" });
    if (this.shadowRoot && this.isUserPost) {
      this.shadowRoot.appendChild(deleteButtonTemplate.content.cloneNode(true));
    }
  }
  connectedCallback() {
    this.addEventListener("click", this.handleDelete);
  }

  disconnectedCallback() {
    this.removeEventListener("click", this.handleDelete);
  }

  async handleDelete() {
    try {
      const confirmed = confirm("Are you sure you want to delete this post?");
      if (confirmed && !this.isProcessing) {
        this.isProcessing = true;

        await deletePost(this.postId);

        const postElement = document.querySelector(
          `li[data-post-id='${this.postId}']`
        );

        if (postElement) {
          postElement.remove();
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      this.isProcessing = false;
    }
  }
}

customElements.define("delete-button", DeleteButton);

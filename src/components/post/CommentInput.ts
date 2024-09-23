import { CommentTemplate } from "@/components/post/CommentTemplate";

const commentInputTemplate = document.createElement("template");

commentInputTemplate.innerHTML = `
  <style>

    form[name="comment"] {
    border: 1px solid var(--text-color-secondary);
    padding: 1rem;
    background-color: var(--tertiary-color);
    }

    .comment-input {
      display: flex;
      & textarea {
        background-color: transparent;
        border: none;
        color: var(--text-color-primary);
        resize: none;
        width: 100%;
        min-height: 50px;
        scrollbar-width: none;

        &:focus {
          outline: none;
        }
      }
    }

    .comment-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;

      & .chart-counter {
        color: var(--text-color-secondary);
        font-size: 0.8rem;  
      }

      & button {
        background-color: var(--button-primary-color);
        color: var(--text-color-primary);
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
        cursor: pointer;
        transition: all 0.2s ease-in-out;
      }
    }
  </style>
  <form name="comment">
    <div class="comment-input">
        <textarea id="comment" placeholder="Write a comment..."></textarea>
    </div>
    <div class="comment-footer">
        <div class="chart-counter">
            <span>250</span> characters left
        </div>
        <button type="submit" id="reply-btn">Reply</button>
    </div>
  </form>
  `;

export class CommentInput extends HTMLElement {
  postId: number;
  form: HTMLFormElement;
  textarea: HTMLTextAreaElement;
  button: HTMLButtonElement;
  commentsContainer: HTMLDivElement;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    if (this.shadowRoot) {
      this.shadowRoot.appendChild(commentInputTemplate.content.cloneNode(true));
    }

    this.postId = Number(this.getAttribute("data-post-id"));
    this.form = this.shadowRoot?.querySelector("form") as HTMLFormElement;
    this.textarea = this.form.querySelector("textarea") as HTMLTextAreaElement;
    this.button = this.form.querySelector("button") as HTMLButtonElement;
    this.commentsContainer = document.querySelector(
      "#post-comments"
    ) as HTMLDivElement;
  }

  connectedCallback() {
    this.form.addEventListener("submit", (e) => this.handleSubmit(e));
    this.textarea.addEventListener("input", (e) =>
      this.chartCounterListener(e)
    );
  }

  disconnectedCallback() {
    this.form.removeEventListener("submit", (e) => this.handleSubmit(e));
  }

  handleSubmit(e: Event) {
    e.preventDefault();

    if (this.textarea.value.length > 250) {
      alert("Comment cannot be longer than 250 characters");
      return;
    } else {
      const comment = document.createElement(
        "comment-template"
      ) as CommentTemplate;

      comment.commentText = this.textarea.value;

      this.commentsContainer.appendChild(comment);

      this.form.reset();
      this.textarea.focus();
    }
  }

  chartCounterListener(e: Event) {
    const chartCounter = this.shadowRoot?.querySelector(
      ".chart-counter span"
    ) as HTMLDivElement;

    chartCounter.innerText = (250 - this.textarea.value.length).toString();

    if (this.textarea.value.length > 250) {
      chartCounter.style.color = "var(--error-color)";
    } else {
      chartCounter.style.color = "var(--text-color-secondary)";
    }
  }
}

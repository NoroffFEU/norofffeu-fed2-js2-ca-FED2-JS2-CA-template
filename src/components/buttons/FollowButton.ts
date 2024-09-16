import { toggleFollowUser } from "@api/profile/follow";

const followButtonTemplate = document.createElement("template");

followButtonTemplate.innerHTML = `
<style>
  button { padding: 10px; cursor: pointer; }
  button.following { background: red; }
</style>

<button>
  <slot></slot>
</button>

`;

export class FollowButton extends HTMLElement {
  // Debouncing state
  private isProcessing: boolean = false;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    if (this.shadowRoot) {
      this.shadowRoot.appendChild(followButtonTemplate.content.cloneNode(true));
    }
    this.addEventListener("click", (e) => this.handleFollow());
  }

  static get observedAttributes() {
    return ["data-is-following"];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    this.updateButtonText(newValue);
  }

  async handleFollow() {
    // Prevent multiple clicks
    if (this.isProcessing) return;
    this.isProcessing = true;

    const userToFollow = this.getAttribute("data-user-name");
    const isFollowing = this.getAttribute("data-is-following");

    try {
      if (userToFollow) {
        if (isFollowing === "true") {
          await toggleFollowUser(userToFollow, "unfollow");
          this.updateAllButtons(userToFollow, "false");
        } else if (isFollowing === "false") {
          await toggleFollowUser(userToFollow, "follow");
          this.updateAllButtons(userToFollow, "true");
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      this.isProcessing = false;
    }
  }

  updateButtonText(isFollowing: string) {
    const button = this.shadowRoot?.querySelector("button");
    if (button) {
      if (isFollowing === "true") {
        button.textContent = "Unfollow";
        button.classList.add("following");
      } else if (isFollowing === "false") {
        button.textContent = "Follow";
        button.classList.remove("following");
      }
    }
  }

  updateAllButtons(userToFollow: string, followState: string) {
    const followButtons = document.querySelectorAll(
      `follow-button[data-user-name="${userToFollow}"]`
    );

    followButtons.forEach((button) => {
      button.setAttribute("data-is-following", followState);
    });
  }
}

customElements.define("follow-button", FollowButton);

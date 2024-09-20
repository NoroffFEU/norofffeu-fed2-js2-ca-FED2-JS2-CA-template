import { ProfileResponse } from "@/types/types";
import { FollowButton } from "@/components/buttons/FollowButton";

export function createProfileHTML(
  profile: ProfileResponse,
  isFollowing: boolean,
  isUserProfile: boolean
) {
  if (!customElements.get("follow-button")) {
    customElements.define("follow-button", FollowButton);
  }

  return `
  ${
    !isUserProfile
      ? `<follow-button data-user-name="${profile.name}" data-is-following="${isFollowing}"></follow-button>`
      : ""
  }
  <div>
    ${profile.banner.url}
  </div>
  <div>
    ${isFollowing}
  </div>
  <div>
    ${isUserProfile}
  </div>
  
  `;
}

// import { readProfile } from "@/js/api/profile/read";
// import { ProfileResponse } from "@/types/types";
// import { getUserProfile } from "@/js/utilities/getUserProfile";
// import { FollowButton } from "@/components/buttons/FollowButton";

// const profileTemplate = document.createElement("template");

// profileTemplate.innerHTML = `
//   <style>
//     .profile__banner {
//       min-width: 100%;
//       max-height: 200px;
//       min-height: 200px;
//       height: 100%;
//       object-fit: cover;
//       object-position: center;
//       border-bottom: 1px solid #ccc;
//     }
//     .container {
//       padding: 1rem;
//     }

//     .profile__header {
//       display: flex;
//       justify-content: space-between;
//       align-items: end;
//       transform: translateY(-68px);
//     }

//     .profile__avatar {
//       aspect-ratio: 1;
//       width: 100px;
//       border-radius: 1rem;
//       border: 1px solid #ccc;
//       object-fit: cover;
//       object-position: center;
//     }

//   </style>
//   <article>
//     <div>
//         <img class="profile__banner">
//     </div>
//     <div class="container">
//         <div class="profile__header">
//             <div>
//                 <img class="profile__avatar">
//             </div>

//             <div class="follow-button-container">
//             </div>
//         </div>
//     </div>

//   </article>
// `;

// export class ProfileTemplate extends HTMLElement {
//   username: string;

//   constructor() {
//     super();

//     this.attachShadow({ mode: "open" });
//     if (this.shadowRoot) {
//       this.shadowRoot.appendChild(profileTemplate.content.cloneNode(true));
//     }

//     this.username = "";
//   }

//   connectedCallback() {
//     this.fetchProfile();
//   }

//   disconnectedCallback() {
//     // Para quitar los listeners
//   }

//   async fetchProfile() {
//     if (!this.username) {
//       console.log("No username found");
//     }
//     try {
//       const user = await readProfile(this.username);
//       if (!user) {
//         throw new Error("Error fetching profile");
//       }
//       this.updateProfile(user);
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   async checkIfUserIsFollowing() {
//     const getFollowingUsers = await getUserProfile();

//     const isFollowing = getFollowingUsers?.find(
//       (user) => user.name === this.username
//     )
//       ? true
//       : false;
//     console.log(isFollowing);
//     return isFollowing;
//   }

//   updateProfile(user: ProfileResponse) {
//     if (this.shadowRoot) {
//       const banner = this.shadowRoot.querySelector(
//         ".profile__banner"
//       ) as HTMLImageElement;

//       const avatar = this.shadowRoot.querySelector(
//         ".profile__avatar"
//       ) as HTMLImageElement;

//       const followButtonContainer = this.shadowRoot.querySelector(
//         "follow-button-container"
//       ) as HTMLElement;

//       if (!customElements.get("follow-button")) {
//         customElements.define("follow-button", FollowButton);
//       }

//       const followButton = document.createElement(
//         "follow-button"
//       ) as FollowButton;
//       followButton.setAttribute("data-user-name", this.username);
//       followButton.setAttribute("data-is-following", "false");
//       console.log(followButton);
//       if (followButtonContainer) {
//         followButtonContainer.append(followButton);
//         // this.checkIfUserIsFollowing().then((isFollowing) => {
//         //   followButton.setAttribute("data-user-name", this.username);
//         //   followButton.setAttribute(
//         //     "data-is-following",
//         //     isFollowing.toString()
//         //   );
//         // });
//       }

//       if (banner && avatar) {
//         banner.src = user.banner.url || "";
//         banner.alt = user.banner.alt || `${this.username} banner`;

//         avatar.src = user.avatar.url || "";
//         avatar.alt = user.avatar.alt || `${this.username} avatar`;
//       }
//     }
//   }
// }

// // Definir el componente
// customElements.define("profile-template", ProfileTemplate);

// import { authGuard } from "../../utilities/authGuard";
// import { readPostsByUser } from "../../api/post/read";
// import { displayPosts } from "../../api/post/postsStructure";
// import { setLogoutListener } from "../../ui/global/logout";

// export default async function profile() {
//     console.log('Profile function called');

//     if (!authGuard()) {
//         console.log('User not authenticated');
//         return;
//     }

//     const username = localStorage.getItem('username');
//     if (!username) {
//         console.error('Username not found in localStorage');
//         return;
//     }

//     // Update the profile title
//     const profileTitle = document.getElementById('profile-title');
//     if (profileTitle) {
//         profileTitle.textContent = `${username}'s Profile`;
//     }

//     try {
//         const posts = await readPostsByUser(username, 12);
//         const postsContainer = document.getElementById('profile-posts');
//         if (postsContainer) {
//             displayPosts(posts, username);
//         } else {
//             console.error('Posts container not found');
//         }
//     } catch (error) {
//         console.error('Error fetching user posts:', error);
//     }

//     setLogoutListener();
// }

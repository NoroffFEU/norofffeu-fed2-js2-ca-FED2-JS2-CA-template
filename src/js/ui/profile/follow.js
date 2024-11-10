
import { followUser, unfollowUser } from "../../api/profile/follow.js";

export function createFollowBtn(profileName, isFollowing = false) {
    const button = document.createElement('button');
    button.textContent = isFollowing ? 'Unfollow' : 'Follow';
    button.style.marginLeft = '10px';
    
    button.addEventListener('click', async () => {
        try {
            if (isFollowing) {
                await unfollowUser(profileName);
                button.textContent = 'Follow';
            } else {
                await followUser(profileName);
                button.textContent = 'Unfollow';
            }
            isFollowing = !isFollowing;
        } catch (error) {
            console.error('Error following/unfollowing user:', error);
            alert('Failed to follow/unfollow user. Please try again.');
        }
    });

    return button;
}
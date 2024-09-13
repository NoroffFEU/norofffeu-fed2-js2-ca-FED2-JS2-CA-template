import { updatePost } from '../../api/post/update.js';
import { currentUser } from '../../api/user/currentUser.js';

export async function onUpdatePost(event) {
    const post = await readPost(id);

    document.querySelector('#title').value = post.title;
    document.querySelector('#body').value = post.body;
    document.querySelector('#tags').value = post.tags.join(', ');

    document.forms.updatePost.addeventListener('submit', async (event) => {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        data.tags = data.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean);

        try {
            await updatePost(id, data);
            window.location.href = `/post/?id=${id}`;
        } catch (error) {
            console.error(error);
            alert('Failed to update post');
        }
    });
}

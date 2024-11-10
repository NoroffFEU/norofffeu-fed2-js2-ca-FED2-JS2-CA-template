import { readPost } from "../../api/post/read.js";
import { updatePost } from "../../api/post/update.js";
import { authGuard } from "../../utilities/authGuard.js";

export default async function postEdit() {
    console.log('PostEdit function initialized');
    
    try {
        authGuard();

        const params = new URLSearchParams(window.location.search);
        const id = params.get('id');
        

        if (!id) {
            throw new Error('No post ID provided');
        }

        const form = document.querySelector('form[name="editPost"]');
        if (!form) {
            throw new Error('Edit form not found');
        }

        // Disable submit button while loading
        const submitButton = form.querySelector('button[type="submit"]');
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.innerHTML = 'Loading...';
        }

        // Check if user is logged in
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('User not authenticated');
        }

        const post = await readPost(id);

        if (!post) {
            throw new Error('Post not found');
        }

        // Populate form with existing data
        const fields = {
            title: post.title || '',
            body: post.body || '',
            tags: Array.isArray(post.tags) ? post.tags.join(', ') : '',
            image: post.media?.url || '',
            alt: post.media?.alt || ''
        };


        // Set form values
        Object.entries(fields).forEach(([field, value]) => {
            const input = form.elements[field];
            if (input) {
                input.value = value;
            } else {
                console.warn(`Form field ${field} not found`); // Debug log
            }
        });

        // Enable submit button
        if (submitButton) {
            submitButton.disabled = false;
            submitButton.innerHTML = 'Update Post';
        }

        // Handle form submission
        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            submitButton.disabled = true;
            submitButton.innerHTML = 'Updating...';

            try {
                const updateData = {
                    title: form.title.value.trim(),
                    body: form.body.value.trim(),
                    tags: form.tags.value.trim().split(',').map(tag => tag.trim()).filter(Boolean),
                    media: form.image.value.trim() ? {
                        url: form.image.value.trim(),
                        alt: form.alt.value.trim()
                    } : null
                };


                await updatePost(id, updateData);
                alert('Post updated successfully!');
                window.location.href = `/post/?id=${id}`;
            } catch (error) {
                console.error('Update error:', error);
                alert(error.message || 'Failed to update post');
                submitButton.disabled = false;
                submitButton.innerHTML = 'Update Post';
            }
        });

    } catch (error) {
        console.error('Error in postEdit:', error);
        alert(error.message || 'Failed to load post data');
        window.location.href = '/';
    }
}

// Initialize when the DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', postEdit);
} else {
    postEdit();
}
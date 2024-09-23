import api from '../../api/instance.js';


export async function onViewPosts(id) {
    try {
        const posts = await api.posts.read(id);
        
        const list = posts.map((post) => {
            const li = document.createElement('li');
            const a = document.createElement('a');
        });

        document.querySelector('ul').append(...list);
    } catch (error) {
        alert(error.message);
        window.location.href = '/';
    }
}
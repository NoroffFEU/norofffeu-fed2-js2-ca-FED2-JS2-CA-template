import NoroffAPI from "../../api";

const api = new NoroffAPI();



export async function onCreatePost(event) {
    alert ("You have created post")
    await api.post.create({title,body,tags,media});
}

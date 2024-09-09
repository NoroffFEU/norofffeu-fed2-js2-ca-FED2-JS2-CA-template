
import NoroffAPI from "../../api";

const api = new NoroffAPI();



export async function onUpdatePost(event) {
    event.preventdefault()
    const form = event.target
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try{
        await api.post.update(data);
    }catch(error){
        alert(error)
    }
}


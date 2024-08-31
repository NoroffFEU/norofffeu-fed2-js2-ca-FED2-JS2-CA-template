import NoroffAPI from "../../api/index.js";

const api = new NoroffAPI()

export async function onRegister(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const data = object.formEntries(formData.entries());

    try{
        await api.auth.register(data)
    } catch (error){
        alert(error)
    }
}

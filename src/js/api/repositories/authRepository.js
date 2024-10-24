import { API_AUTH_LOGIN, API_AUTH_REGISTER, API_AUTH_KEY } from "../constants";
import { headers } from "../headers";

class AuthRepository{
    constructor(){
        this.apiLogin = API_AUTH_LOGIN
        this.apiRegister = API_AUTH_REGISTER
        this. apiKey = API_AUTH_KEY
    }

    async login ({email, password}){
        try{
            const body = JSON.stringify({email, password})
            const response = await fetch (this.apiLogin, {
                headers: headers(),
                method: 'POST',
                body,
            })
            if(!response.ok) throw new Error (`error: ${response.statusText}`)
            return await response.json()
        }
        catch(error){
            console.error ('AuthRepository (login) error:', error);
            throw error
        }
    }

    async register({name, email, password}){
        try{
            const body = JSON.stringify({
                name,email,password,
            })
            const response = await fetch(this.apiRegister, {
                method: "POST",
                headers: headers(),
                body,
            })
            if(!response.ok) throw new Error (`error: ${response.statusText}`)
            return await response.json()
        }catch(error){
            console.error ('AuthRepository (register) error:', error)
            throw error;
        }
    }
}

export default new AuthRepository();
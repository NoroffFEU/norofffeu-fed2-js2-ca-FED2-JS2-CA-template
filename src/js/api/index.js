export default class NoroffAPI {
    apiBase = ""
    apiLoginPath = ""
    apiRegisterPath = ""

    constructor(apiBase){
        this.apiBase = apiBase
        this.apiLoginPath = apiBase + "/auth/login"
        this.apiRegisterPath = apiBase + "/auth/register"

    }

    async login({ email, password}){
        const body = JSON.stringify({ email, password});

        const response = await fetch (this.apiLoginPath, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "post",
            body,
        });
        
        if (response.ok){
            const {data} = await response.json();
            const { accessToken: token, ...user} = data;
            localStorage.token = token;
            localStorage.user = JSON.stringify(user);
            return data;
        }
    }

    async register({
        name,
        email,
        password
      }) {
        const body = JSON.stringify({name, email, password})
        
        const response = await fetch (API_AUTH_REGISTER,{
          headers: 
          {"Content-Type": "application/json",},
          method: "post",
          body
        } );
      
        if (response.ok){
          const {data} = await response.json();
          return data
        }
      
        throw new Error ("Could not register this account")
      }
      
}
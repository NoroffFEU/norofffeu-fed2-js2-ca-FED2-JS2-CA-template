export default class NoroffAPI {
    apiBase = ""
    apiLoginPath = ""

    constructor(apiBase){
        this.apiBase = apiBase
        this.apiLoginPath = apiBase + "/auth/login"
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
}
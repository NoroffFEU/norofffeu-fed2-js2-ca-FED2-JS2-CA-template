import {authService} from "../../api/index";

export async function onLogin(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData (form);
    const data = Object.fromEntries(formData.entries());

    try{
        const userData = await authService.login(data);
        console.log("test", userData)
        if(userData){
            localStorage.setItem('token', userData.response.data.accessToken)
            const {name, email, bio, avatar, banner, meta} = userData.response.data
            // console.log("11",name)

            localStorage.setItem('user', JSON.stringify({
                name: name,
                email: email,
                bio: bio,
                avatar: avatar,
                banner: banner,
                meta: meta
                })
            )
            window.location.href = '/'
        }else{
            console.log ('Login failed:' + userData.message)
        }
    } catch (error){
        console.log("Login error",error);
        alert('An error occurred during login. Please try again.')
    }
}   

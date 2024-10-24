import { authService } from "../../api/index";

export async function onRegister(event) {
    event.preventDefault(); // Prevent the default form submission

    const form = event.target; // Get the form that triggered the event
    const formData = new FormData(form); // Create a FormData object from the form
    const data = Object.fromEntries(formData.entries()); // Convert FormData to an object

    try{
        const userData = await authService.register(data)
        if(userData){
            window.location.href = '/'
        }else {
            alert('registration failed:', userData.message)
        }
    } catch (error){
        console.error('Registration error:', error);
        alert('An error occurred during registration. Please try again.');
    }
}

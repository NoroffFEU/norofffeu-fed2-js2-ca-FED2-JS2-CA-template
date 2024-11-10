import { register } from "../../api/auth/register";

export function onRegister(event) {
    event.preventDefault();
    
    // Show loading state
    const button = document.getElementById('register-button');
    const originalText = button.innerText;
    button.disabled = true;
    button.innerHTML = `
        <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Creating Account...
    `;

    const formData = new FormData(event.target);
    
    const registerData = {
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
        avatar: formData.get("avatar") || null
    };

    // Reset button state
    const resetButton = () => {
        button.disabled = false;
        button.innerText = originalText;
    };

    // Handle registration
    try {
        // Your registration API call
        // ...
    } catch (error) {
        resetButton();
        alert(error.message);
    }
}  

import { onCreatePost } from "../../ui/post/create";
import { authGuard } from "../../utilities/authGuard";

authGuard();

document.addEventListener("DOMContentLoaded", () => {
    const form = document.forms.createPost;

    function createInput(labelText, inputType, inputName, isRequired = false) {
        const label = document.createElement("label");
        label.for = inputName;
        label.innerText = labelText;

        const input = document.createElement(inputType === "textarea" ? "textarea" : "input");
        input.type = inputType !== "textarea" ? inputType : "";
        input.name = inputName;
        input.id = inputName;
        if (isRequired) {
            input.required = true;
        }

        form.insertBefore(label, form.lastElementChild); // Insert before the button
        form.insertBefore(input, form.lastElementChild); // Insert before the button
    }

    createInput("Title", "text", "title", true);
    createInput("Body", "textarea", "body", true);
    createInput("Tags (comma-separated)", "text", "tags");
    createInput("Media URL", "text", "media");

    form.addEventListener("submit", onCreatePost);
});

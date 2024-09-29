// src/js/ui/form.js

export function handleFormSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    return Object.fromEntries(formData.entries());
  }
  
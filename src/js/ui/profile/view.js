// src/js/ui/profile/view.js

import { readProfile, updateProfile } from '../../api/profile.js';
import { currentUser } from '../../utilities/currentUser.js';
import { displayError } from '../../utilities/errorHandler.js';

document.addEventListener('DOMContentLoaded', async () => {
  const user = currentUser();

  if (!user) {
    window.location.href = '/auth/login/index.html';
    return;
  }

  // Display the user's profile information
  try {
    const profile = await readProfile(user.name);
    document.getElementById('name').textContent = profile.name;
    document.getElementById('email').textContent = profile.email;
    document.getElementById('bio').value = profile.bio || '';
    document.getElementById('avatar').src = profile.avatar || '';
  } catch (error) {
    displayError(error.message || 'Failed to load profile.');
  }

  // Handle profile update form submission
  const form = document.forms.profile;
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      await updateProfile(user.name, data);
      window.location.reload();
    } catch (error) {
      displayError(error.message || 'Failed to update profile.');
    }
  });
});

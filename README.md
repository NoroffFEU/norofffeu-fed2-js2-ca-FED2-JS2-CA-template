# My Social Media Application

## Introduction

Welcome to my project! In this course assignment, I developed a client-side social media application that allows users to perform CRUD operations (Create, Read, Update, and Delete) on their posts. This application also includes features for following/unfollowing users, commenting on posts, and reacting to posts with emojis. 

The project focuses on implementing the app logic first, with styling and design improvements planned for later stages.

## Project Overview

Using the provided API and its documentation, I built a user interface that enables the following functionalities:

- **Viewing posts**: Users can browse through a list of posts.
- **Creating new posts**: Users can add their own content to the platform.
- **Editing existing posts**: Users can modify their content.
- **Deleting posts**: Users can remove content they no longer wish to display.

### API Requirements

To interact with the API, users must register an account and log in to obtain a JWT (JSON Web Token). The application utilizes local storage to securely store this token for authorized API access.

### Goals and Objectives

The aim of this project is to deliver a user-friendly interface with minimal errors. Given that this assignment focuses on demonstrating my JavaScript skills, I have kept the styling to a basic wireframe for now, with plans for future enhancements.

## API Functionality

The API supports various actions, with the required actions marked with an asterisk (*). Here’s a brief overview of the supported functionalities:

- **Register new user***: Users can create new accounts.
- **Login user***: Users can log in to their accounts.
- Follow/Unfollow users: Users can manage their social connections.
- **Create post***: Users can share their content.
- **Get single post***: Users can view specific posts.
- Get many posts: Users can view multiple posts.
- Get posts by a user: Users can view posts from specific accounts.
- Get posts from followed users: Users can see updates from accounts they follow.
- Search posts: Users can find specific posts.
- **Edit post***: Users can update their existing content.
- **Delete post***: Users can remove their posts.
- Comment on post: Users can engage with posts by leaving comments.
- Reply to a comment: Users can respond to comments.
- React to a post: Users can express their feelings toward posts using emojis.

## Project Structure

I set up this project using a Vite template with Vanilla JavaScript settings in Multi-Page Application (MPA) mode. Additional HTML pages were created as needed and registered in the `vite.config.js` file.

### Required API Features

To meet the assignment's criteria, I implemented the following API features:

- **Register function**: Allows for new user account creation.
- **Login function**: Enables users to log in and receive a token.
- **Create post function**: Lets logged-in users create a new post.
- **Edit post function**: Allows users to edit their existing posts.
- **Delete post function**: Users can remove posts they’ve created.
- **Get post function**: Users can view individual posts.

### Required UI Features

To enhance user experience, I integrated the following UI elements:

- **Register form**: Enables account creation.
- **Login form**: Allows access to existing accounts.
- **Logout button**: Clears the JWT from local storage for user logout.
- **Post form**: Lets users create or edit posts.
- **Delete button**: Allows users to remove their posts.
- **Listing page**: Displays the 12 most recent posts.
- **Single post page**: Shows specific posts by their ID.

### Restrictions

To comply with the project requirements, I adhered to the following technical restrictions:

- I avoided the use of client-side frameworks or UI libraries (e.g., React, VueJS, Svelte, Angular).
- I collaborated with my instructor regarding group work policies.

## Development Process

1. Accepted the GitHub Classroom invitation and cloned the repository to my work computer.
2. Created and updated the required HTML pages.
3. Committed changes regularly, using meaningful commit messages.
4. Utilized GitHub projects to track required functions.
5. Developed JavaScript files and functions to meet assignment specifications.
6. Updated my plan with each accomplishment.
7. Tested my work and tracked issues using the GitHub Issues tab.
8. Refactored code for clarity and performance.
9. Documented all functions using JSDoc for better maintainability.

## Delivery

- The completed project can be accessed in my public GitHub repository.

### Optional Deliverables

While I focused primarily on the required features, I also included:

- A link to my deployment on Netlify (or other hosting platforms, if applicable).
- A Gantt chart/Kanban project board to visualize progress.
- A video summary explaining the project's functionality.
- Links to Figma design assets (if any were created).

## Level 2 Challenges

As an extra challenge, I implemented several additional features:

- An emoji menu for users to react to posts.
- A comment form for engaging with posts.
- Reply forms for responding to comments.
- Follow/Unfollow buttons for managing user relationships.
- A pagination system for navigating through posts.
- A search bar for easy post discovery.
- Transitioned to TypeScript for improved type safety.
- Created unit tests for key functions to ensure reliability.

## Resources

- [Noroff API Documentation](https://docs.noroff.dev/docs/v2/social/posts)
- [Noroff API Swagger](https://v2.api.noroff.dev/docs/static/index.html#/social-profiles)
- [GitHub Classroom](https://classroom.github.com/a/)

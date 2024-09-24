# Social Media Application Project

## Project Overview
This project is a client-side social media application built as part of the **JavaScript 2 Course Assignment**. The application allows users to perform basic CRUD operations (Create, Read, Update, and Delete) on posts, with additional functionality for user interaction such as commenting, reacting with emojis, and following/unfollowing other users.

The main purpose of this assignment is to demonstrate proficiency in using JavaScript for front-end development, with an emphasis on working with APIs and handling HTTP requests.

## Features
### Required Features:
1. **User Authentication**:
   - Register a new user.
   - Login with an existing account using JWT (JSON Web Token).
   - Logout to clear stored tokens.

2. **Post Management**:
   - Create new posts.
   - View a single post or multiple posts.
   - Edit an existing post.
   - Delete posts.

3. **UI/UX**:
   - User-friendly registration and login forms.
   - Clear post management forms.
   - Listing of 12 recent posts.
   - Separate page for viewing a specific post.

### Optional Level 2 Features (Challenge):
- Add emoji reactions to posts.
- Implement comments and reply functionality.
- Follow and unfollow other users.
- Add pagination for viewing multiple posts.
- Search for posts by keywords.
- Use TypeScript instead of JavaScript.
- Add unit tests for key functions.

## Technologies Used
- **JavaScript (Vanilla)**: Main programming language used for building the client-side logic.
- **Vite**: A build tool used for developing the project in MPA (Multi-page Application) mode.
- **HTML**: Used for creating the structure of the web pages.
- **CSS**: Basic styling for the application (optional and not required for grading).
- **API Integration**: Interacting with a RESTful API using `GET`, `POST`, `PUT`, and `DELETE` methods.

## API Details
The application relies on the **Noroff API**, which supports various actions such as user registration, login, post creation, retrieval, editing, and deletion.

API Documentation:
- [Noroff API Documentation](https://docs.noroff.dev/docs/v2/social/posts)
- [Noroff API Swagger](https://v2.api.noroff.dev/docs/static/index.html#/social-profiles)

### Required API Endpoints:
- **User Registration**: `POST /auth/register`
- **User Login**: `POST /auth/login`
- **Create Post**: `POST /posts`
- **Get Posts**: `GET /posts`
- **Get Single Post**: `GET /posts/{id}`
- **Edit Post**: `PUT /posts/{id}`
- **Delete Post**: `DELETE /posts/{id}`

## Getting Started
### Prerequisites
To run this project locally, you'll need:
- **Node.js** installed on your machine.
- A text editor such as **VS Code**.
- Access to the Noroff API and a registered account to obtain JWT tokens.

### Installation Steps
1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   ```
   
2. **Navigate to the Project Folder**:
   ```bash
   cd social-media-app
   ```

3. **Install Dependencies**:
   ```bash
   npm install
   ```

4. **Run the Application**:
   ```bash
   npm run dev
   ```

### API Integration
Make sure to register for an account via the API and login to obtain your JWT token, which will be stored in `localStorage` for authenticated actions (such as creating, editing, and deleting posts).

## Project Structure
The project is structured using a Vite template in MPA mode, with multiple HTML pages corresponding to different parts of the social media application.

### Key Files:
- `index.html`: Main entry point for the app.
- `vite.config.js`: Configuration for handling additional pages.
- `auth.js`: JavaScript functions for registration and login.
- `posts.js`: Functions for creating, editing, viewing, and deleting posts.

## How to Use
1. **Register**: Create a new account using the registration form.
2. **Login**: Use your credentials to log in and access the application.
3. **Create Post**: Use the post creation form to add a new post.
4. **Edit Post**: Modify an existing post using the post edit functionality.
5. **Delete Post**: Remove a post using the delete button.
6. **View Posts**: Browse through the most recent posts on the listing page.

## Testing
To ensure the application works as intended:
- Regularly check API responses for errors.
- Use the browser’s developer tools to track and debug API requests.
- Write unit tests (optional) for key functions to ensure consistent functionality.

## Additional Resources
- **Conventional Commits**: [Guide for writing meaningful commit messages](https://www.conventionalcommits.org/en/v1.0.0/)
- **Vite Documentation**: [Vite Official Docs](https://vitejs.dev/)

## Future Improvements
- Implement advanced features like comments, emoji reactions, and pagination.
- Add comprehensive error handling for smoother user experience.
- Style the application using CSS frameworks (e.g., Bootstrap or Tailwind CSS).

## License
This project is open-source and available under the [MIT License](LICENSE).



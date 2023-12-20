# Client for Blog Project

## Overview

This React project is structured to include a variety of components and pages, designed to facilitate easy navigation and user interaction.

## Project Structure

- Components: Located in ./src/components/
  - Footer.jsx: The footer component of the application.
  - Menu.jsx: The menu component, handling navigation within the application.
  - Navbar.jsx: The navigation bar component, providing top-level navigation.

- Context: Located in ./src/context/
  - authContext.js: Manages the authentication context across the application.

- Pages: Located in ./src/pages/
  - Home.jsx: The home page of the application.
  - Login.jsx: The login page, handling user authentication.
  - Register.jsx: The registration page for new users.
  - Single.jsx: A page dedicated to displaying single items or posts.
  - Write.jsx: A page that allows users to write or create new content.

- Other Important Files:
  - app.js: The main application file that ties together different components.
  - index.js: The entry point of the React application.
  - style.scss: Contains the SCSS stylesheets for the application.

## Getting Started

To run this Client:

- Clone the repository.
- Run npm install to install dependencies.
- Start the server with npm start. The API will listen on port 3000.

## Dependencies

- **Sass**: A CSS preprocessor that allows you to use variables, nested rules, mixins, and more, in your CSS. It helps in writing CSS in a more structured and maintainable way.

- **react-quill**: A React component wrapping the Quill rich text editor. It provides powerful editing capabilities and is highly customizable.

- **@uiw/react-md-editor**: A lightweight Markdown editor with React. It provides a user-friendly interface for writing and editing Markdown.

- **Axios**: A promise-based HTTP client for making HTTP requests from node.js or XMLHttpRequests from the browser. It's widely used for its ease of use and automatic transformation of JSON data.

- **Multer**: A node.js middleware for handling multipart/form-data, primarily used for uploading files.

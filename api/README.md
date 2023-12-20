# API for Blog Project

## Overview

This API serves as the backend for a React application, handling data operations and user interactions.

## Project Structure

- API Root: Located in /api/
  - index.js: The main server file using Express. Sets up middleware and routes.
  - db.js: Configures the MySQL database connection.

- Controllers: Business logic for different routes.
  - auth.js: Handles authentication processes like register, login, and logout.
  - post.js: Manages blog post operations such as retrieving, adding, updating, and deleting posts.
  - user.js: (Brief description here)

- Routes: Defines API endpoints.
  - auth.js: Routes for authentication (register, login, logout).
  - post.js: Routes for blog post operations (get, add, delete, update).
  - user.js: (Brief description here)

## Key Features

- User authentication and management.
- Blog post creation, update, retrieval, and deletion.
- File upload functionality using Multer.
- Cookie-based authentication token management.

## Getting Started

To run this API:

- Clone the repository.
- Run npm install to install dependencies.
- Start the server with npm start. The API will listen on port 8800.

## Dependencies

- **Express**: For creating the API server.
- **MySQL2**: For database interaction.
- **bcryptjs**, jsonwebtoken: For user authentication.
- **Multer**: For handling file uploads.
- **cookie-parser**: For parsing cookies in HTTP requests.

## DataBase

```SQL
-- blog.posts definition

CREATE TABLE `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `desc` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `img` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `date` datetime NOT NULL,
  `uid` int NOT NULL,
  `cat` int NOT NULL,
  `status` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `post_FK` (`uid`),
  CONSTRAINT `post_FK` FOREIGN KEY (`uid`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- blog.users definition

CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `img` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- blog.status definition

CREATE TABLE `status` (
  `id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- blog.category definition

CREATE TABLE `category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
```

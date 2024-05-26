# My List API

## Overview

This project implements the "My List" feature for an OTT platform using Node.js, Express, and MongoDB. Users can add, remove, and list their favorite movies and TV shows.

## Setup Instructions

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/shiv901/Stage-backend
   cd mylist-api
   ```
2. Install dependencies:
   ```bash
   npm install
    ```
3. Configure environment variables:

    Create a .env file in the root directory with the following content:
    ``` 
    MONGO_URI=mongodb_url/mylist
    PORT=3000
    ```
4. Seed initial data:
    ```bash
    npm run seed
    ```

5. Start the server:
    ```bash
    npm start
    ```
6. Run tests:
    ```bash
    npm run test
    ```

### Design Choices
- Performance: Indexed user lists to ensure fast retrieval.
- Scalability: Used MongoDB for its flexibility and scalability.
- TypeScript: Ensured type safety and easier maintenance.
- Testing: Comprehensive integration tests for all endpoints.

### Assumptions
- Basic user authentication is in place.
- User IDs are provided in the request body for simplicity.

*This setup covers the implementation, integration tests, and deployment considerations for the "My List" feature. The provided scripts and instructions will help you set up and run the project locally.*

## API Documentation

This document provides information about the endpoints and parameters available in the My List API.

### Base URL
Base URL: https://your-api-domain.com


## Authentication
Authentication is required for some endpoints using JWT tokens. Include the JWT token in the `Authorization` header as follows: `Authorization: Bearer <your-token>`

All endpoints are relative to the base URL of the API server.



## Endpoints

### Authentication

#### 1. Register User

- **URL:** `/api/auth/register`
- **Method:** `POST`
- **Description:** Register a new user.
- **Request Body:**
  - `username` (string, required): User's username.
  - `password` (string, required): User's password.
- **Response:** Message indicating successful registration.
- **Authentication:** Not required

#### 2. User Login

- **URL:** `/api/auth/login`
- **Method:** `POST`
- **Description:** Authenticate user and generate JWT token.
- **Request Body:**
  - `username` (string, required): User's username.
  - `password` (string, required): User's password.
- **Response:** JWT token.
- **Authentication:** Not required

### My List Operations

#### 1. Add an Item to My List

- **URL:** `/api/mylist`
- **Method:** `POST`
- **Description:** Add a movie or TV show to the user's list.
- **Request Body:**
  - `userId` (string, required): For linking content to a user.
  - `contentId` (string, required): Unique identifier of the content.
  - `contentType` (string, required): Type of content (`Movie` or `TVShow`).
- **Response:** Returns the added item.
- **Authentication:** Required

#### 2. Remove an Item from My List

- **URL:** `/api/mylist/:contentId`
- **Method:** `DELETE`
- **Description:** Remove a movie or TV show from the user's list.
- **Request Body:**
  - `userId` (string, required): Unique identifier of the content to remove.
- **URL Parameters:**
  - `contentId` (string, required): Unique identifier of the content to remove.
- **Response:** No content (204 No Content) if successful.
- **Authentication:** Required

#### 3. List Items in My List

- **URL:** `/api/mylist`
- **Method:** `GET`
- **Description:** Retrieve all items in the user's list.
- **Request Body:**
  - `userId` (string, required): Unique identifier of the content.
- **Query Parameters:**
  - `page` (number, optional): Page number for pagination (default: 1).
  - `limit` (number, optional): Number of items per page (default: 10).
- **Response:** Returns a paginated list of items.
- **Authentication:** Required


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

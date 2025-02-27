# Turborepo Todo App

This project is a full-stack Todo application built with NestJS (backend) and Nuxt 3 (frontend) using Turborepo for monorepo management.

## Getting Started

1.  **Install Turbo:**  Ensure you have the Turbo CLI installed globally:

    ```bash
    npm install -g turbo
    ```

2.  **Backend Setup (.env):**  Create a `.env` file in the `/apps/backend` directory.  Populate it with your MongoDB connection string.  You'll receive the connection string from your email.  The file should look like this (replace placeholders with your actual credentials):

    ```env
    MONGODB_URI=mongodb+srv://<your_username>:<your_password>@<your_cluster>.mongodb.net/<your_database>?retryWrites=true&w=majority
    ```


3.  **Frontend Setup (.env):** Create a `.env` file in the `/apps/frontend` directory. This file will specify the backend API URL:

    ```env
    API_BASE_URL=http://localhost:5000
    ```

    **Important:** Ensure your backend is running on port 5000.


4. **Install dependencies:**

    ```bash
    cd turbo-list
    npm install
    ```
5. **Run the application:**

    ```bash
    npm run dev
    ```

    This will start both the backend and frontend development servers.


6.  **Access the App:** Open your browser and navigate to `http://localhost:3000` to use the Todo app.


## Project Structure

*   `/apps/backend`: NestJS backend server
*   `/apps/frontend`: Nuxt 3 frontend application
*   `/packages`: Shared types and possibly other packages

## Development

*   The backend runs on port 5000, while the frontend is running on port 3000.
*   All backend API calls from the frontend should be directed to `http://localhost:5000`.
*   The frontend and backend are built using TypeScript.
*  The `.env` files provide environment-specific variables for the respective applications.

## Testing

Tests are located in the `apps/frontend/tests` directory (co-located next to the source files). You can run the tests using `npm test` at the root of the repository.

```bash
cd turbo-list/apps/frontend
npm test
```
This runs Jest tests.

## Useful Commands

*   `pnpm install`: Install dependencies across the entire monorepo.
*   `pnpm dev`: Run the development server for both apps (backend and frontend).
*   `pnpm build`: Build the frontend and backend for production.  Use this command before deploying.


Remember to replace placeholder values in the `.env` files with your actual credentials.

# Focusly - Intelligent Productivity Platform

Focusly is a full-stack productivity web application designed to help users manage tasks, track focus time, and optimize their daily schedules using AI insights.

## Project Structure

The project consists of two main repositories:

1.  **Backend (`focusly-back`)**: A NestJS GraphQL API interacting with Firebase and other services.
2.  **Frontend (`focusly-front`)**: A React application built with Vite, Apollo Client, and MUI.

## Prerequisites

-   **Node.js**: v18 or higher recommended.
-   **Yarn**: Package manager used for both projects.
-   **Firebase Project**: Required for authentication and features.

---

## 🚀 Quick Start Guide

### 1. Backend Setup

The backend handles API requests, authentication, and business logic.

1.  **Navigate to the backend directory:**
    ```bash
    cd /path/to/Nest/focusly-back
    ```

2.  **Install dependencies:**
    ```bash
    yarn install
    ```

3.  **Configure Environment Variables:**
    Create a `.env` file in the root of `focusly-back` based on `.env.example`. You will need your Firebase Admin SDK credentials.
    ```env
    FIREBASE_PROJECT_ID=your-project-id
    FIREBASE_CLIENT_EMAIL=your-client-email
    FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
    ```

4.  **Start the server:**
    ```bash
    yarn start:dev
    ```
    The server will start on `http://localhost:3000` (GraphQL Playground available at `/graphql`).

### 2. Frontend Setup

The frontend provides the user interface for Focusly.

1.  **Navigate to the frontend directory:**
    ```bash
    cd /path/to/ReactSpace/focusly-front
    ```

2.  **Install dependencies:**
    ```bash
    yarn install
    ```

3.  **Start the development server:**
    ```bash
    yarn dev
    ```
    The application will be available at `http://localhost:5173`.

---

## ⚙️ Configuration

### Frontend Configuration
Currently, some configurations are hardcoded in the frontend source. If you are deploying or customizing the app, check the following files:

-   **Firebase Config**: `src/config/firebase.ts`
    -   Contains `apiKey`, `authDomain`, `projectId`, etc. Update these with your own Firebase project details if needed.
-   **GraphQL Endpoint**: `src/config/apollo.ts`
    -   Points to `http://localhost:3000/graphql`. Update `uri` if your backend runs on a different host/port.
-   **Authentication**: `vite.config.ts`
    -   Configured to proxy `/auth` and `/users` requests to `http://localhost:3000`.

### Backend Configuration
The backend relies on the `.env` file for sensitive keys. Ensure your Firebase Admin SDK key is correctly formatted (newlines handled properly).

## 🛠 Tech Stack

**Frontend:**
-   React 19, TypeScript
-   Vite
-   Apollo Client (GraphQL)
-   Material UI (MUI)
-   Redux Toolkit
-   Recharts (Visualization)
-   Firebase (Auth/Analytics)

**Backend:**
-   NestJS
-   GraphQL (Code-First)
-   Passport (JWT Auth)
-   Firebase Admin
# Focusly-front

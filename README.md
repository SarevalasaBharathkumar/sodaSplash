# SodaSplash

SodaSplash is a full-stack MERN (MongoDB, Express, React, Node.js) application designed as an online storefront for ordering a variety of beverages. This project, named ChillMart within the app, provides a complete e-commerce experience, including user authentication, product browsing, and a shopping cart.

## Features

*   **User Authentication:** Secure user sign-up and login functionality with JWT-based authentication and password hashing using bcryptjs.
*   **Product Catalog:** Displays a variety of beverage products fetched from a MongoDB database, including categories like health drinks, sodas, and cool drinks.
*   **Dynamic Search:** Users can search for products by name or category, with results displayed instantly.
*   **Responsive Carousel:** An an-inviting image carousel on the homepage built with React-Bootstrap.
*   **Shopping Cart:** A fully functional cart using React's Context API for state management. Users can add items, adjust quantities, and remove items.
*   **Persistent Cart:** Cart data is saved to `localStorage` for each logged-in user, ensuring it persists between sessions.
*   **Responsive UI:** Built with Bootstrap and custom CSS for a seamless experience on both desktop and mobile devices.

## Tech Stack

*   **Frontend:**
    *   React
    *   React Router DOM
    *   React Bootstrap & Bootstrap 5
    *   Context API (for State Management)
*   **Backend:**
    *   Node.js
    *   Express.js
    *   MongoDB
    *   Mongoose
    *   JSON Web Token (JWT)
    *   bcryptjs
    *   Express Validator
*   **Deployment:** Vercel

## Project Structure

The repository is organized into a React frontend (root directory) and a Node.js backend (`/backend` directory).

```
/
├── backend/                # Contains the Node.js/Express server
│   ├── Routes/             # API routes for authentication and data fetching
│   ├── models/             # Mongoose schemas for users
│   ├── db.js               # MongoDB connection logic
│   └── index.js            # Main server entry file
├── src/                    # React frontend source code
│   ├── components/         # Reusable React components (Header, Footer, Card, Cart)
│   ├── screens/            # Main pages/views (Home, Login, SignUp, Cart)
│   └── App.js              # Main app component with routing definitions
├── package.json            # Frontend dependencies and scripts
└── ...
```

## Getting Started

### Prerequisites

*   Node.js and npm
*   MongoDB (A local instance or a MongoDB Atlas cluster)

### Backend Setup

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/SarevalasaBharathkumar/sodaSplash.git
    cd sodaSplash/backend
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Configure the database:**
    Open `backend/db.js` and replace the `mongoURI` with your own MongoDB connection string.
    ```javascript
    const mongoURI = 'your_mongodb_connection_string';
    ```
    Your database must contain two collections: `Items_data` (for beverage items) and `category` (for beverage categories). The server fetches data from these collections upon connection.

4.  **Start the backend server:**
    The server will run on `http://localhost:5000`.
    ```sh
    nodemon index.js
    ```

### Frontend Setup

1.  **Navigate to the root directory from the project's base:**
    ```sh
    cd .. 
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Connect to the backend:**
    By default, the frontend is configured to make API calls to a deployed backend. To connect to your local backend server, you must update the fetch URLs in the following files:
    *   `src/screens/Home.js`
    *   `src/screens/Login.js`
    *   `src/screens/SignUp.js`

    Change `https://soda-splash-qgda.vercel.app/api/...` to `http://localhost:5000/api/...`.

4.  **Start the frontend application:**
    The React app will run on `http://localhost:3000`.
    ```sh
    npm start
    ```

## API Endpoints

The backend provides the following core API endpoints:

*   **`POST /api/creatuser`**: Registers a new user.
    *   **Body**: `{ "name", "email", "password", "location" }`
*   **`POST /api/loginUser`**: Authenticates a user and returns a JWT.
    *   **Body**: `{ "email", "password" }`
*   **`POST /api/itemsdata`**: Fetches all beverage items and their corresponding categories.

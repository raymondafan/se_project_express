# WTWR (What to Wear?): Back End

### Overview

his project focuses on building a backend server for the "What to Wear?" React weather app using Express and MongoDB. The setup includes routes, controllers, models, and utilities for error handling.

I configured the environment with ESLint and Prettier, set up hot reloading, and structured the app with routes for users and clothing items. Using Mongoose, I created schemas and models with fields like name, avatar, weather, and imageUrl. Key API endpoints handle operations like fetching users (GET), creating users (POST), retrieving clothing items (GET), adding items (POST), and deleting items (DELETE).

Testing with Postman ensured API reliability and proper error handling. Middleware functions manage request-response cycles and handle errors (400, 404, 500), contributing to a robust server design.

## Getting Started

**Note**
The cloud hosting for this project is currently expired, so the live demo link is temporarily unavailable. You can still run the project locally by following the instructions below.

1. Clone the Repositories
   First, clone both the front-end and back-end repositories to your local machine:

```
git clone https://github.com/raymondafan/se_project_react.git
```

```
git clone https://github.com/raymondafan/se_project_express.git
```

2. Set Up the Back End
   Navigate to the back-end repository and install the dependencies:

```
cd se_project_express
```

```
npm install
```

Start the back-end server:

```
npm run start
```

Or, for a development server with hot reload:

```
npm run dev
```

3. Set Up the Front End
   Navigate to the front-end repository and install the dependencies:

```
cd se_project_react
```

```
npm install
```

Ensure the back-end server is running, then start the front-end development server:

```
npm run start
```

4. View the Application
   Once both servers are running, you can view the application by navigating to:

http://localhost:3000

5. Configuration
   Ensure that the front end is configured to point to the back end. Check the api.js file in the front-end project to verify that the baseUrl is set correctly:

```
const baseUrl =
process.env.NODE_ENV === "production"
? "https://api.raymondafanwtwr.strangled.net"
: "http://localhost:3001";
```

**Testing**
Make sure to edit the sprint.txt file in the root of the back-end folder. The file should contain the number of the sprint you're currently working on. For example, 12.

**Links**

- [Link to the FRONTEND](https://github.com/raymondafan/se_project_react)
- [Link to the BACKEND](https://github.com/raymondafan/se_project_express)

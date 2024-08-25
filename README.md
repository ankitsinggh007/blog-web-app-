# Blog Web App Frontend

## Overview

The Blog Web App Frontend is a modern React application designed to interact with a blog backend service. It allows users to browse, create, edit, and delete blog posts. It also supports user authentication with login and logout functionality.

## Features

- **Homepage**: View a list of all blog posts.
- **Create Post**: Authenticated users can create new blog posts.
- **Edit Post**: Authenticated users can edit their own blog posts.
- **Delete Post**: Authenticated users can delete their own blog posts.
- **My Posts**: View a list of posts created by the logged-in user.
- **User Authentication**: Log in and log out.
- **Responsive Design**: Optimized for various screen sizes, including mobile and tablet.

## Prerequisites

- **Node.js**: Ensure you have Node.js and npm installed. You can download and install them from [nodejs.org](https://nodejs.org/).

## Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/blog-web-app-frontend.git
   cd blog-web-app-frontend
   ```
2. **Install Dependencies**
```bash
npm install
```
3 **Set Up Environment Variables**

 Create a .env file in the root of the project and add your API URL:

 ```bash
 VITE_API_URL=`production-url`
 ```
 Ensure that VITE_API_URL matches your backend API URL.

 link for that 

 4. **Run the Development Server**

 ```bash
 npm run dev
```

The application will be available at http://localhost:5173/ by default.

# License
This project is licensed under the MIT License. See the LICENSE file for details.




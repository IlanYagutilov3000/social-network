# The Social Network — Backend

This is the backend API for **The Social Network**, built with Node.js, Express, and MongoDB.  
It handles authentication, user management, and CRUD operations for posts, likes, comments, and admin actions.

### Usage
This server is part of a full-stack MERN application. Run it locally alongside the frontend, or connect via API from any frontend client.


### Resources

### 👤 Users
- Register, log in, update profile
- Admin users can manage all users
- JWT-based auth with protected routes

### 📝 Posts
- Create, read, update, and delete posts
- Support for image upload
- Like / Unlike posts
- save / unsave posts
- Comment on posts

### 💬 Comments
- Add comments to posts

---

## 👥 User Types

- **Regular User** — can post, like, comment, save, and edit their own profile
- **Admin User** — has full access, including managing all users and posts

🛑 Note: Unregistered users cannot view or access any content. You must register or log in to use the app.

## 📬 API Endpoints
All the routes in the project.
```md
Users:

GET /users/all-users
GET /users               - Get current logged-in user
GET /users/saved-posts   - Get saved posts of current user
GET /users/:userId       - Get specific user by ID
PUT /users/:userId       - Update user (self or admin only)
PATCH /users/save/:postId - Save or unsave a post
DELETE /users/:userId    - Delete user (self or admin only)
```
```md
Posts:

GET /posts                      - Get all posts (optional: ?sort=oldest)
GET /posts/my-posts/:userId    - Get posts by specific user
GET /posts/:postId             - Get a specific post
POST /posts                    - Create a new post
PUT /posts/:postId             - Update a post (owner or admin only)
PATCH /posts/:postId           - Like or unlike a post
DELETE /posts/:postId          - Delete a post (owner or admin only)
```
```md
Comments:

GET /comments/:postId          - Get all comments for a specific post
POST /comments/:postId         - Add a comment to a specific post
DELETE /comments/:commentId    - Delete a comment (owner only)
```
```md
Auth:

POST /login       - Log in and receive a JWT token  
POST /register    - Register a new user and receive a JWT token
```
### Middleware & Security

✅ **JWT Authentication** — required for most routes
✅ **Authorization** — certain routes protected for admins only
✅ **Multer** — (coming soon) file/image upload support
✅ **bcrypt** — password hashing
✅ **CORS** — enabled for frontend connection

## Installation

1. Clone the repository:
   ```md
   git clone https://github.com/yourusername/social-network.git
   
3. Install dependencies:
   ```md
   cs facebookServer
   npm install
   
5. If I send you the project `.env` was send as well I didn't send you the project please create a `.env` file.
6. Start the server:
   ```md
   nodemon index
   
if you don't have nodemon please install it to run locally
  ```md
  npm install -g nodemon
  ```

License
Copyright (c) 2025 Ilan Yagutilov.

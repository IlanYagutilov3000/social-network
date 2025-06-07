# The Social Network

### About
The Social Network is a full-stack web application inspired by Facebook. It allows users to register, log in, create posts, like and comment on posts, and interact with other users. 
This project was built using the MERN stack (MongoDB, Express, React, Node.js) as part of my college final project to demonstrate core web development skills and best practices.

### Features

- 🧑‍🤝‍🧑 User Registration & Login (JWT-based authentication)
- 📝 Create, Edit, and Delete Posts
- 💬 Comment on Posts
- ❤️ Like & Unlike Posts
- 🧾 User Profiles
- 🖼️ Image Upload Support
- 🔒 Protected Routes (Only logged-in users can access certain pages)
- 🕵️‍♂️ Admin Dashboard (Optional, if applicable)
- 📱 Responsive Design (Mobile-Friendly)
- ⏱️ Timestamps for Posts and Comments

### Tech Stack

**Frontend:**
- React
- TypeScript
- Axios
- Redux
- Bootstrap & Custom CSS Modules

**Backend:**
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT for Authentication
- Multer for Image Uploads
- bcrypt for Password Hashing

#### Installation

**Clone the repo**
```bash
git clone https://github.com/yourusername/social-network.git
```

### Install backend dependencies

```bash
cd facebookServer
npm install
```
If you don’t have nodemon installed globally, install it using:

```bash
npm install -g nodemon
```

### Install frontend dependencies

```bash
cd facebook-clone
npm install
```

note: environment variables will be sent to whoever wants to use and see the project

### run the backend locally
```bash
cd facebookServer
nodemon index
```
### run the front end locally
```bash
cd facebook-clone
npm start
```
### Future Improvements

🧑‍🤝‍🧑 Friends / Follow System
🔔 Real-time Notifications
🔍 Search Posts
💬 Direct Messaging / Chat
🧼 Code Cleanup and Refactoring
📱 Mobile-First Redesign (maybe react native)

- ⚡ Real-Time Feed Updates — I'm aware that in a social app, users expect posts to appear instantly across all screens without refreshing.
- While the current version uses traditional REST-based updates, real-time syncing (via WebSockets/Socket.IO) is planned for a future version to improve interactivity when multiple users are online.
-  ⚠️ No friends/follow system yet — the feed currently shows all user posts.

License
This project is for educational purposes and not intended for commercial use.

### Contact
Built with ❤️ by Ilan Yagutilov
📧 ilanyagotilov191@gmail.com
🌐 https://socialnetwork191.netlify.app/login

⚠️ Note: The app is hosted using free-tier services (Netlify + Render), so initial loading may be slow. For best performance, run locally.

import React, { useRef } from 'react';
import './App.css';
import Home from './components/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import FriendsComponent from './components/FriendsComponent';
import Login from './components/Login';
import Register from './components/Register';
import Video from './components/Video';
import Groups from './components/Groups';
import Sidebar from './components/Sidebar';
import UserProfile from './components/UserProfile';
import FriendProfile from './components/FriendProfile';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import ProtectedRoutes from './components/ProtectedRoutes';
import SavedPosts from './components/SavedPosts';
import PageNotFound from './components/PageNotFound';
import About from './components/About';


function App() {
  const isAuthenticated = useSelector((state: any) => state.auth.user !== null);

  return (
    <div className="App">
      <ToastContainer
        newestOnTop
        hideProgressBar
        closeOnClick
        limit={3}
      />
      <Router>
        {isAuthenticated && <Header />}
        <Routes>

          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />

          <Route path='/' element={<ProtectedRoutes><Home /></ProtectedRoutes>} />
          <Route path='/searchFriends' element={<ProtectedRoutes><FriendsComponent /></ProtectedRoutes>} />
          <Route path='/watch' element={<ProtectedRoutes><Video /></ProtectedRoutes>} />
          <Route path='/saved-posts' element={<ProtectedRoutes><SavedPosts /></ProtectedRoutes>} />
          <Route path='/groups' element={<ProtectedRoutes><Groups /></ProtectedRoutes>} />
          <Route path='/profile' element={<ProtectedRoutes><UserProfile /></ProtectedRoutes>} />
          <Route path='/about' element={<ProtectedRoutes><About /></ProtectedRoutes>} />
          <Route path='/profile/:userId' element={<ProtectedRoutes><FriendProfile /></ProtectedRoutes>} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

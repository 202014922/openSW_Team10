import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import ResetPassword from './components/Auth/ResetPassword';
import Home from './components/Home/Home';
import ProfileSettings from './components/Home/ProfileSettings';
import Notifications from './components/Home/Notifications';
import ChatList from './components/Home/ChatList';
import Match from './components/Home/Match';
import ChatRoom from './components/Chat/ChatRoom';
import Planner from './components/Planner/Planner';
import WebSocketService from './services/WebSocketService';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  useEffect(() => {
    WebSocketService.connect();
    return () => {
      WebSocketService.disconnect();
    };
  }, []);

  const isAuthenticated = () => {
    return localStorage.getItem('user') !== null;
  };

  return (
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/home" element={isAuthenticated() ? <Home /> : <Navigate to="/login" />} />
            <Route path="/profile-settings" element={isAuthenticated() ? <ProfileSettings /> : <Navigate to="/login" />} />
            <Route path="/notifications" element={isAuthenticated() ? <Notifications /> : <Navigate to="/login" />} />
            <Route path="/chats" element={isAuthenticated() ? <ChatList /> : <Navigate to="/login" />} />
            <Route path="/match" element={isAuthenticated() ? <Match /> : <Navigate to="/login" />} />
            <Route path="/chat/:chatId" element={isAuthenticated() ? <ChatRoom /> : <Navigate to="/login" />} />
            <Route path="/planner/:chatId" element={isAuthenticated() ? <Planner /> : <Navigate to="/login" />} />
            {/* 추가 라우트 정의 */}
          </Routes>
        </Router>
      </ThemeProvider>
  );
}

export default App;
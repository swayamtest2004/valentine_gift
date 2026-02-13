import { useState, useEffect } from 'react'
import './App.css'
// import Main from './Components/Main'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Layout from './Components/common/Layout'
import Login from './Components/common/Login'
import Main from './Components/Main';
import Letter from './Components/Letter';
import Spotify from './Components/Spotify';
import Memories from './Components/Memories';
import { AnimatePresence } from "framer-motion";
import Ask from './Components/Ask';

function AnimatedRoutes({ isAuthenticated, login }) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public Routes */}
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login login={login} />} />

        {/* Protected Routes */}
        <Route
          element={
            isAuthenticated ? <Layout /> : <Navigate to="/login" replace />
          }
        >
          <Route path="/letter" element={<Letter />} />
          <Route path="/memories" element={<Memories />} />
          <Route path="/spotify" element={<Spotify />} />
          <Route path='/ask-her' element={<Ask />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    sessionStorage.getItem("valentine-auth") === "true"
  );

  const login = () => {
    sessionStorage.setItem("valentine-auth", "true");
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <AnimatedRoutes
        isAuthenticated={isAuthenticated}
        login={login}
      />
    </Router>
  );
}
export default App;
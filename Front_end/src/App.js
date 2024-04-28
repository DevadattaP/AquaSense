import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Landing from './pages/Landing.jsx';
import './App.css';
import Dashboard from './Dashboard.jsx';
import Login from './pages/Login.jsx';
import { AuthProvider } from './components/AuthContext';
import { useStateContext } from './contexts/ContextProvider';
import { StrictMode } from 'react/cjs/react.development.js';
import Register from './components/Register.jsx';

const App = () => {
  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings } = useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
      <StrictMode>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={(<Landing />)} />
              <Route path='/login' element={<Login />} />
              <Route path='/login/register' element={<Register />} />
              <Route path="/dashboard/*" element={<Dashboard />} />
            </Routes>

          </BrowserRouter>
        </AuthProvider>
      </StrictMode>
    </div>
  );
};

export default App;

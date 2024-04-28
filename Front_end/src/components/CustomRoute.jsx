import React, {useContext} from 'react';
import { Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

const CustomRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  return  isLoggedIn ? children : <Navigate to="/login" state={{from: location}} replace />;
};

export default CustomRoute;

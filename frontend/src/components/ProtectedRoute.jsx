import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('authToken');

  // If no token is found, redirect to login
  if (!token) {
    return <Navigate to="/login" />;
  }

  // If token is present, allow access to the protected page
  return children;
};

export default ProtectedRoute;

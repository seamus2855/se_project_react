import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isLoggedIn, children }) => {
  if (!isLoggedIn) {
    // If user is not logged in, redirect to the home page
    return <Navigate to="/" replace />;
  }

  // If logged in, render the protected children components
  return children;
};

export default ProtectedRoute;

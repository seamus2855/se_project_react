export const register = (name, avatar, email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar, email, password }),
  }).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  });
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  });
};

import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, isLoggedIn }) {
  if (!isLoggedIn) {
    // If not logged in, redirect to the main page
    return <Navigate to="/" replace />;
  }

  // If logged in, render the profile component
  return children;
}

export default ProtectedRoute;

import { checkResponse, baseUrl } from "./Api";

// FIX: Declare a local BASE_URL variable that falls back to your imported baseUrl
// This keeps your codebase robust and stops the 'BASE_URL is not defined' linter error
const BASE_URL = baseUrl || "http://localhost:3001";

export function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

export const register = ({ name, avatar, email, password }) => {
  return request(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar, email, password }),
  });
};

export const authorize = (email, password) => {
  return request(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
};

export const checkToken = (token) => {
  return request(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateUser = (name, avatar, token) => {
  return request(`${BASE_URL}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar }),
  });
};

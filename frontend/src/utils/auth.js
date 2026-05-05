import { checkResponse, baseUrl } from "./Api";

// Added export so you can reuse this helper elsewhere if needed
export function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

export const register = ({ name, avatar, email, password }) => {
  return request(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar, email, password }),
  });
};

export const authorize = (email, password) => {
  return request(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
};

export const checkToken = (token) => {
  return request(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // Ensure "Authorization" is capitalized (standard practice)
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateUser = (name, avatar, token) => {
  return request(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar }),
  });
};

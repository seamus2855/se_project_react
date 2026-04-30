/* se_project_react/src/utils/api.js */

// Use process.env or import.meta.env if you need to toggle between production and development
const baseUrl = "http://localhost:3001"; // Or "/api" if your Vite proxy is confirmed working

/**
 * Validates the response status and content type.
 */
const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
};

/**
 * Reusable request helper
 */
function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

// --- API Functions ---

export const getItems = () => {
  return request(`${baseUrl}/items`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const addCard = ({ name, imageUrl, weather }, token) => {
  return request(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, imageUrl, weather }),
  });
};

export const removeCard = (cardId, token) => {
  return request(`${baseUrl}/items/${cardId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
};

export const addCardLike = (id, token) => {
  return request(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
};

export const removeCardLike = (id, token) => {
  return request(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
};

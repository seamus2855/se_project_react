/* se_project_react/src/utils/Api.js */

// Use the relative path to trigger the Vite proxy (port 3000 -> 3001)
const baseUrl = "/api";

/**
 * Validates that the response is successful and is actual JSON data.
 * This is the direct fix for the "Expected JSON but received text/html" error.
 */
const checkResponse = (res) => {
  if (res.ok) {
    const contentType = res.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return res.json();
    }
    return Promise.reject(`Error: Expected JSON but received ${contentType}`);
  }
  return Promise.reject(`Error: ${res.status}`);
};

/**
 * Reusable helper to keep the code DRY
 */
function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

// --- API Functions ---

export const getItems = () => {
  return request(`${baseUrl}/items`, {
    method: "GET",
    headers: {
      Accept: "application/json", // Tells server you only want JSON
      "Content-Type": "application/json",
    },
  });
};

export const addCard = ({ name, imageUrl, weather }, token) => {
  return request(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      Accept: "application/json",
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
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
};

export const addCardLike = (id, token) => {
  return request(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
};

export const removeCardLike = (id, token) => {
  return request(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
};

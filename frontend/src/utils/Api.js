/* se_project_react/src/utils/api.js */

export const baseUrl = "http://localhost:3001";

/**
 * Validates the response status and content type.
 */
export const checkResponse = (res) => {
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
      // Normalized authorization capitalization for consistent server reading
      "Authorization": `Bearer ${token}`,
    },
    // Ensure the backend expects 'imageUrl' and not 'link'
    body: JSON.stringify({ name, imageUrl, weather }),
  });
};

export const removeCard = (cardId, token) => {
  return request(`${baseUrl}/items/${cardId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });
};

export const addCardLike = (id, token) => {
  return request(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });
};

export const removeCardLike = (id, token) => {
  return request(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });
};

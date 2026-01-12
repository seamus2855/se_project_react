export const addCard = async ({ name, imageUrl }) => {
  try {
    const res = await fetch(`${baseUrl}/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, imageUrl }),
    });

    if (!res.ok) {
      throw new Error(`Request failed with status ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    console.error("Error adding item:", err);
    throw err;
  }
};

export const removeCard = async (cardID) => {
  try {
    const res = await fetch(`${baseUrl}/items/${cardID}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to delete item with status ${res.status}`);
    }

    if (res.status === 204) return;

    return await res.json();
  } catch (err) {
    console.error("Error deleting item:", err);
    throw err;
  }
};

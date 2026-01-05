import React from "react";
import "../ItemModal/ItemModal.css";
import "../WeatherImage/WeatherImage.css";

export default function ClothesModal({
  isOpen,
  onClose,
  onSubmit,
  formData,
  setFormData,
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>

        <h2 className="modal-title">Add Clothing Item</h2>

        <form
          className="modal-form"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          <label className="modal-label">
            Name
            <input
              type="text"
              className="modal-input"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </label>

          <label className="modal-label">
            Image URL
            <input
              type="url"
              className="modal-input"
              value={formData.imageUrl}
              onChange={(e) =>
                setFormData({ ...formData, imageUrl: e.target.value })
              }
              required
            />
          </label>

          <label className="modal-label">
            Weather Type
            <select
              className="modal-input"
              value={formData.weather}
              onChange={(e) =>
                setFormData({ ...formData, weather: e.target.value })
              }
              required
            >
              <option value="">Select...</option>
              <option value="hot">Hot</option>
              <option value="warm">Warm</option>
              <option value="cold">Cold</option>
            </select>
          </label>

          <button className="modal-submit" type="submit">
            Add Item
          </button>
        </form>
      </div>
    </div>
  );
}

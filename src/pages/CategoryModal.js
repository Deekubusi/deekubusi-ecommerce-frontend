import React, { useEffect, useState } from "react";
import "../styles/dashboard.css";

export default function CategoryModal({ mode, initial, onClose, onSave }) {
  const [name, setName] = useState("");
  const [count, setCount] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");


  useEffect(() => {
    if (mode === "edit" && initial) {
      setName(initial.name || "");
      setCount(String(initial.itemCount ?? 0));
      setPreview(initial.image || "");
      setImageFile(null);
    } else {
      setName("");
      setCount("");
      setPreview("");
      setImageFile(null);
    }
  }, [mode, initial]);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };


  const submit = (e) => {
    e.preventDefault();

    onSave({
      name,
      itemCount: Number(count),
      imageFile, 
    });
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <div className="modal-title">
            {mode === "add" ? "Add Category" : "Edit Category"}
          </div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <form className="modal-form" onSubmit={submit}>
          <label>
            Category Name
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>

          <label>
            Item Count
            <input
              type="number"
              min="0"
              value={count}
              onChange={(e) => setCount(e.target.value)}
              required
            />
          </label>

          <label>
            Upload Image
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </label>

          {preview && (
            <img
              src={preview}
              alt="Preview"
              style={{
                width: "100%",
                height: "140px",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />
          )}

          <div className="modal-actions">
            <button type="button" className="ghost-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="primary-btn">
              {mode === "add" ? "Add Category" : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

import React from "react";
import "../styles/dashboard.css";

export default function CategoryCard({ category, onEdit }) {

  if (!category) return null;

  return (
    <div className="card">
      <div className="card-img">
        <img
          src={category.image || "https://via.placeholder.com/400x250"}
          alt={category.name || "Category"}
        />
        <button className="edit-float" onClick={onEdit}>
          Edit
        </button>
      </div>

      <div className="card-body">
        <div className="card-name">{category.name}</div>
        <div className="card-count">
          {category.itemCount ?? 0} items
        </div>
      </div>
    </div>
  );
}

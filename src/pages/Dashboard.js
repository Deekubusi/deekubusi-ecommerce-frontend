import React, { useEffect, useMemo, useState } from "react";
import CategoryCard from "./CategoryCard";
import CategoryModal from "./CategoryModal";
import "../styles/dashboard.css";

import {
  fetchCategories,
  createCategory,
  updateCategory,
} from "../api/categories";


const IMAGE_BASE_URL = "https://backend-ecommerce-api-87rv.onrender.com";

export default function Dashboard() {
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("add"); 
  const [active, setActive] = useState(null);
  const [loading, setLoading] = useState(false);

  const title = useMemo(() => "Categories", []);


  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoading(true);
        const data = await fetchCategories();

        
        const normalized = data.map((row) => ({
          id: row.id,
          name: row.name,
          itemCount: row.itemCount ?? row.item_count ?? 0,
          image: row.image
            ? row.image.startsWith("http")
              ? row.image
              : `${IMAGE_BASE_URL}${row.image}`
            : "",
        }));

        setCategories(normalized);
      } catch (err) {
        console.error("Failed to load categories:", err);
        alert("Failed to load categories");
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  
  const openAdd = () => {
    setMode("add");
    setActive(null);
    setOpen(true);
  };


  const openEdit = (category) => {
    setMode("edit");
    setActive(category);
    setOpen(true);
  };


 const onSave = async (payload) => {
  try {
     console.dir(active)
    if (mode === "add") {
      const created = await createCategory(payload);

      if (!created) {
        alert("Failed to create category");
        return;
      }

     
      setCategories((prev) => [created, ...prev]);

    } else {
      if (!active) return;

      console.log('id we are updating => '+active.id)

      const updated = await updateCategory(active.id, payload);

      if (!updated) {
        alert("Update failed");
        return;
      }

      setCategories((prev) =>
        prev.map((c) =>
          c.id === active.id ? updated : c
        )
      );
    }

    setOpen(false);
  } catch (err) {
    console.error("Save failed:", err);
    alert("Something went wrong while saving");
  }
};

  return (
    <div className="dash">
      <div className="dash-head">
        <h1 className="dash-title">{title}</h1>
        <button className="primary-btn" onClick={openAdd}>
          + Add Category
        </button>
      </div>

      {loading ? (
        <p>Loading categories...</p>
      ) : (
        <div className="grid">
          {categories
            .filter(Boolean) 
            .map((cat) => (
              <CategoryCard
                key={cat.id}
                category={cat}
                onEdit={() => openEdit(cat)}
              />
            ))}
        </div>
      )}

      {open && (
        <CategoryModal
          mode={mode}
          initial={active}
          onClose={() => setOpen(false)}
          onSave={onSave}
        />
      )}
    </div>
  );
}

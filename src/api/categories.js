import API from "./axios";

const IMAGE_BASE = "https://backend-ecommerce-api-87rv.onrender.com";


export const fetchCategories = async () => {
  const res = await API.get("/categories");

  return res.data.map((row) => ({
    id: row.id,
    name: row.name,
    itemCount: row.item_count ?? row.itemCount ?? 0,
    image: row.image
      ? row.image.startsWith("http")
        ? row.image
        : `${IMAGE_BASE}${row.image}`
      : "",
  }));
};


export const createCategory = async ({ name, itemCount, imageFile }) => {
  const fd = new FormData();
  fd.append("name", name);
  fd.append("itemCount", String(itemCount || 0));
  if (imageFile) fd.append("image", imageFile);

  const res = await API.post("/categories", fd, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  const row = res.data;

  return {
    id: row.id,
    name: row.name,
    itemCount: row.itemCount ?? row.item_count ?? 0,
    image: row.image
      ? row.image.startsWith("http")
        ? row.image
        : `${IMAGE_BASE}${row.image}`
      : "",
  };
};


export const updateCategory = async (id, { name, itemCount, imageFile }) => {
  const fd = new FormData();
  fd.append("name", name);
  fd.append("itemCount", String(itemCount || 0));
  if (imageFile) fd.append("image", imageFile);

  const res = await API.put(`/categories/${id}`, fd, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  const row = res.data;

  return {
    id: row.id,
    name: row.name,
    itemCount: row.itemCount ?? row.item_count ?? 0,
    image: row.image
      ? row.image.startsWith("http")
        ? row.image
        : `${IMAGE_BASE}${row.image}`
      : "",
  };
};

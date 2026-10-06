import React, { useState, useEffect } from "react";
import CategoryCard from "./CategoryCard";
import { getCategories } from "../api/categoryApi";

export const defaultCategories = [
  {
    id: "1",
    name: "Electronics",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: "2",
    name: "Furniture",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: "3",
    name: "Beauty",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: "4",
    name: "Fashion",
    image:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=300&q=80"
  },
  {
    id: "5",
    name: "Books",
    image:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=300&q=80"
  }
];

export default function CategoryRow() {
  const [categories, setCategories] = useState(defaultCategories);

  useEffect(() => {
    async function load() {
      try {
        const data = await getCategories();
        if (Array.isArray(data) && data.length > 0) {
          setCategories(data);
        }
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    }
    load();
  }, []);

  return (
    <section className="cat-row">
      {categories.map((cat) => (
        <CategoryCard key={cat.id || cat.name} name={cat.name} image={cat.image} />
      ))}
    </section>
  );
}

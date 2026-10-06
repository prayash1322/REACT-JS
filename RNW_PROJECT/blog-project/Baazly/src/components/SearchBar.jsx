import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar({ initialQuery = "", initialCategory = "" }) {
  const [category, setCategory] = useState(initialCategory || "");
  const [q, setQ] = useState(initialQuery || "");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (category && category !== "All Categories") {
      params.set("category", category);
    }
    if (q.trim()) {
      params.set("q", q.trim());
    }
    navigate(`/shop?${params.toString()}`);
  }

  return (
    <form className="header-search" onSubmit={handleSubmit}>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        aria-label="Filter by category"
      >
        <option value="">All Categories</option>
        <option value="Electronics">Electronics</option>
        <option value="Furniture">Furniture</option>
        <option value="Beauty">Beauty</option>
        <option value="Fashion">Fashion</option>
        <option value="Books">Books</option>
      </select>
      <input
        type="text"
        placeholder="Search in Baazly..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
        aria-label="Search query"
      />
      <button type="submit">
        <i className="fa-solid fa-magnifying-glass"></i> Search
      </button>
    </form>
  );
}

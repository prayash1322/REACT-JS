import React from "react";
import { Link } from "react-router-dom";

export default function CategoryCard({ name, image }) {
  return (
    <Link to={`/shop?category=${encodeURIComponent(name)}`}>
      <img src={image} alt={name} />
      <span>{name}</span>
    </Link>
  );
}

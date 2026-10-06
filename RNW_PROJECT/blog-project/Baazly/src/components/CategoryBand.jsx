import React from "react";
import { Link } from "react-router-dom";

export default function CategoryBand() {
  const cats = ["Electronics", "Furniture", "Beauty", "Fashion", "Books"];

  return (
    <section className="category-band">
      <div>
        {cats.map((cat) => (
          <Link key={cat} to={`/shop?category=${encodeURIComponent(cat)}`}>
            {cat}
          </Link>
        ))}
      </div>
    </section>
  );
}

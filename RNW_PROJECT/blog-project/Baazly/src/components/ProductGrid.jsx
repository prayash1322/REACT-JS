import React from "react";
import ProductCard from "./ProductCard";

export default function ProductGrid({
  products = [],
  emptyMessage = "No products found.",
  showManageActions = false,
  onEdit,
  onDelete
}) {
  if (!products || products.length === 0) {
    return <p className="empty-msg">{emptyMessage}</p>;
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          showManageActions={showManageActions}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

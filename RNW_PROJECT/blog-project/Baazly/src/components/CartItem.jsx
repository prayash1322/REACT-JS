import React from "react";
import { Link } from "react-router-dom";
import { money } from "../utils/formatters";
import { fallbackImg } from "../utils/storage";

export default function CartItem({ item, product, onQtyChange, onRemove }) {
  if (!product) return null;

  const subtotal = Number(product.price) * Number(item.qty);

  return (
    <div className="cart-item">
      <Link to={`/product/${product.id}`}>
        <img
          src={product.image || fallbackImg}
          alt={product.name}
          onError={(e) => {
            e.currentTarget.src = fallbackImg;
          }}
        />
      </Link>

      <div className="cart-item-info">
        <Link to={`/product/${product.id}`}>
          <h3>{product.name}</h3>
        </Link>
        <p className="muted">
          {product.brand} &nbsp;·&nbsp; {product.category}
        </p>
        <p className="cart-unit-price">
          <i className="fa-solid fa-tag"></i> Unit Price:{" "}
          <strong>{money(product.price)}</strong>
        </p>

        <div className="cart-qty-row">
          <span className="cart-qty-label">Qty:</span>
          <div className="cart-controls">
            <button
              type="button"
              className="cart-minus"
              aria-label="Decrease quantity"
              onClick={() => onQtyChange(product.id, -1)}
            >
              <i className="fa-solid fa-minus"></i>
            </button>
            <span>{item.qty}</span>
            <button
              type="button"
              className="cart-plus"
              aria-label="Increase quantity"
              onClick={() => onQtyChange(product.id, 1)}
            >
              <i className="fa-solid fa-plus"></i>
            </button>
          </div>
        </div>

        <button
          type="button"
          className="small-btn remove-cart"
          onClick={() => onRemove(product.id)}
        >
          <i className="fa-solid fa-trash"></i> Remove
        </button>
      </div>

      <div className="cart-item-subtotal">
        <p className="muted">Subtotal</p>
        <div className="price">{money(subtotal)}</div>
      </div>
    </div>
  );
}

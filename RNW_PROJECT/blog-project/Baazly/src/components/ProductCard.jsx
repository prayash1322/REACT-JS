import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { money } from "../utils/formatters";
import { fallbackImg } from "../utils/storage";
import { useCart } from "../hooks/useCart";
import { useWishlist } from "../hooks/useWishlist";
import { useToast } from "../hooks/useToast";

export default function ProductCard({
  product,
  showManageActions = false,
  onEdit,
  onDelete
}) {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const toast = useToast();

  const [currentImg, setCurrentImg] = useState(product.image || fallbackImg);
  const [isFading, setIsFading] = useState(false);
  const [flashState, setFlashState] = useState(null);

  const wishlisted = isWishlisted(product.id);
  const hasGallery = product.gallery && product.gallery.length > 0;
  const isOutOfStock = Number(product.stock) <= 0;

  function handleToggleWishlist(e) {
    e.stopPropagation();
    const added = toggleWishlist(product.id);
    if (added) {
      toast.success(`Saved "${product.name}" to wishlist.`);
    } else {
      toast.info(`Removed "${product.name}" from wishlist.`);
    }
  }

  function handleMouseEnter() {
    if (!hasGallery) return;
    setIsFading(true);
    setTimeout(() => {
      setCurrentImg(product.gallery[0]);
      setIsFading(false);
    }, 200);
  }

  function handleMouseLeave() {
    if (!hasGallery) return;
    setIsFading(true);
    setTimeout(() => {
      setCurrentImg(product.image || fallbackImg);
      setIsFading(false);
    }, 200);
  }

  function handleCardClick(e) {
    if (e.target.closest("button, a, input, select, textarea, label")) {
      return;
    }
    navigate(`/product/${product.id}`);
  }

  function handleAddToCart(e) {
    e.stopPropagation();
    const result = addToCart(product, 1);
    const color = result.success ? "#168143" : "#c0392b";

    setFlashState({ text: result.message, color });
    if (result.success) {
      toast.success(`Added "${product.name}" to cart.`);
    } else {
      toast.error(result.message);
    }

    setTimeout(() => {
      setFlashState(null);
    }, 1800);
  }

  return (
    <div
      className="product-card"
      data-id={product.id}
      onClick={handleCardClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="card-media-wrapper">
        <img
          className={`card-img ${isFading ? "img-fading" : ""}`}
          src={currentImg}
          alt={product.name}
          onError={(e) => {
            e.currentTarget.src = fallbackImg;
          }}
        />
        <button
          type="button"
          className={`wishlist-btn ${wishlisted ? "active" : ""}`}
          aria-label={wishlisted ? "Remove from wishlist" : "Save to wishlist"}
          title={wishlisted ? "Remove from wishlist" : "Save to wishlist"}
          onClick={handleToggleWishlist}
        >
          <i className={wishlisted ? "fa-solid fa-heart" : "fa-regular fa-heart"}></i>
        </button>
      </div>

      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="muted">
          {product.brand} · {product.category}
        </p>
        <p>{product.shortDesc}</p>
        <div className="price">{money(product.price)}</div>

        {isOutOfStock && <div className="status out">Out of Stock</div>}

        {showManageActions && (
          <div className="card-actions manage-actions">
            <button
              type="button"
              className="edit-btn"
              title="Edit product"
              onClick={(e) => {
                e.stopPropagation();
                if (onEdit) onEdit(product);
              }}
            >
              <i className="fa-solid fa-pen"></i> Edit
            </button>
            <button
              type="button"
              className="delete-btn"
              title="Delete product"
              onClick={(e) => {
                e.stopPropagation();
                if (onDelete) onDelete(product.id);
              }}
            >
              <i className="fa-solid fa-trash"></i> Delete
            </button>
          </div>
        )}

        <div className={`card-actions ${showManageActions ? "manage-spacing" : ""}`}>
          <button
            type="button"
            className={`cart-btn ${flashState ? "btn-flashed" : ""}`}
            style={flashState ? { "--flash-color": flashState.color } : undefined}
            disabled={Boolean(flashState) || isOutOfStock}
            onClick={handleAddToCart}
          >
            <i className="fa-solid fa-cart-plus"></i>{" "}
            {flashState
              ? flashState.text
              : isOutOfStock
              ? "Out of Stock"
              : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}

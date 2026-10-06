import React, { useState, useEffect, useRef, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductById } from "../api/productApi";
import { fallbackImg } from "../utils/storage";
import { useCart } from "../hooks/useCart";
import { useWishlist } from "../hooks/useWishlist";
import { useToast } from "../hooks/useToast";
import { money } from "../utils/formatters";

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const toast = useToast();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [activeImg, setActiveImg] = useState("");
  const [isFading, setIsFading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [flashState, setFlashState] = useState(null);

  const timerRef = useRef(null);

  const loadProduct = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const data = await getProductById(id);
      setProduct(data);
    } catch (err) {
      console.error("Failed to load product details:", err);
      if (err.response?.status === 404) {
        setProduct(null);
      } else {
        setError("Unable to load product details right now. Please check your connection and try again.");
      }
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadProduct();
  }, [loadProduct]);

  const wishlisted = product ? isWishlisted(product.id) : false;

  const allImages = React.useMemo(() => {
    if (!product) return [];
    const imgs = [product.image];
    if (product.gallery && Array.isArray(product.gallery)) {
      imgs.push(...product.gallery);
    }
    return imgs.filter(Boolean);
  }, [product]);

  useEffect(() => {
    if (allImages.length > 0) {
      setActiveImg(allImages[0]);
    }
    setQuantity(1);
  }, [id, allImages]);

  useEffect(() => {
    if (allImages.length <= 1) return;

    timerRef.current = setInterval(() => {
      setActiveImg((prev) => {
        const currIndex = allImages.indexOf(prev);
        const nextIndex = currIndex >= allImages.length - 1 ? 0 : currIndex + 1;
        return allImages[nextIndex];
      });
    }, 2500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [allImages]);

  function handleToggleWishlist() {
    if (!product) return;
    const added = toggleWishlist(product.id);
    if (added) {
      toast.success(`Saved "${product.name}" to wishlist.`);
    } else {
      toast.info(`Removed "${product.name}" from wishlist.`);
    }
  }

  if (loading) {
    return (
      <section className="single-box" style={{ textAlign: "center", padding: "80px 20px" }}>
        <div className="loading-spinner"></div>
        <p style={{ marginTop: "16px", color: "#666", fontWeight: 500 }}>
          Loading product details...
        </p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="single-box">
        <div className="empty-msg" style={{ maxWidth: "500px", margin: "40px auto" }}>
          <i
            className="fa-solid fa-triangle-exclamation"
            style={{
              fontSize: "36px",
              color: "#c0392b",
              marginBottom: "12px",
              display: "block"
            }}
          ></i>
          <h3>Failed to load product</h3>
          <p style={{ margin: "8px 0 18px", color: "#666" }}>{error}</p>
          <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
            <button type="button" className="btn" onClick={loadProduct}>
              <i className="fa-solid fa-rotate-right"></i> Try Again
            </button>
            <Link to="/shop" className="btn light-btn">
              Back to Shop
            </Link>
          </div>
        </div>
      </section>
    );
  }

  if (!product) {
    return (
      <section className="single-box">
        <p className="empty-msg">Product not found.</p>
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Link to="/shop" className="btn">
            Back to Shop
          </Link>
        </div>
      </section>
    );
  }

  function handleSwitchImage(src) {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsFading(true);
    setTimeout(() => {
      setActiveImg(src);
      setIsFading(false);
    }, 200);
  }

  function handleMinus() {
    setQuantity((prev) => Math.max(1, prev - 1));
  }

  function handlePlus() {
    const stock = Number(product.stock) || 0;
    setQuantity((prev) => (prev < stock ? prev + 1 : prev));
  }

  function handleQuantityChange(e) {
    const val = Number(e.target.value);
    const stock = Number(product.stock) || 0;
    if (isNaN(val) || val < 1) {
      setQuantity(1);
    } else if (val > stock) {
      setQuantity(stock);
    } else {
      setQuantity(val);
    }
  }

  function handleAddToCart() {
    if (!product) return;
    const result = addToCart(product, quantity);
    const color = result.success ? "#168143" : "#c0392b";
    setFlashState({ text: result.message, color });

    if (result.success) {
      toast.success(`Added ${quantity} × "${product.name}" to cart.`);
    } else {
      toast.error(result.message);
    }

    setTimeout(() => {
      setFlashState(null);
    }, 1800);
  }

  const stockCount = Number(product.stock) || 0;
  const isOutOfStock = stockCount <= 0;

  return (
    <section id="singleBox" className="single-box">
      <div className="single-wrap">
        <div className="single-imgs">
          <img
            id="mainImg"
            className={isFading ? "img-fading" : ""}
            src={activeImg || fallbackImg}
            alt={product.name}
            onError={(e) => {
              e.currentTarget.src = fallbackImg;
            }}
          />

          {allImages.length > 1 && (
            <div className="gallery-thumbs">
              {allImages.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`${product.name} thumbnail ${idx + 1}`}
                  className={`thumb ${activeImg === img ? "active" : ""}`}
                  onClick={() => handleSwitchImage(img)}
                  onError={(e) => {
                    e.currentTarget.src = fallbackImg;
                  }}
                />
              ))}
            </div>
          )}
        </div>

        <div className="single-detail">
          <h1>{product.name}</h1>
          <p className="muted">
            {product.brand} · {product.category}
          </p>
          <div className="price">{money(product.price)}</div>

          <div className="details-line">
            <span>
              {isOutOfStock
                ? "Out of Stock"
                : `In Stock (${stockCount} available)`}
            </span>
          </div>

          <p>
            <strong>Overview:</strong> {product.shortDesc}
          </p>
          <p>{product.fullDesc}</p>

          {!isOutOfStock && (
            <div className="qty-box">
              <button
                type="button"
                id="minusQty"
                onClick={handleMinus}
                disabled={quantity <= 1}
                aria-label="Decrease quantity"
              >
                <i className="fa-solid fa-minus"></i>
              </button>
              <input
                type="number"
                id="qtyBox"
                value={quantity}
                min="1"
                max={stockCount}
                onChange={handleQuantityChange}
                aria-label="Quantity"
              />
              <button
                type="button"
                id="plusQty"
                onClick={handlePlus}
                disabled={quantity >= stockCount}
                aria-label="Increase quantity"
              >
                <i className="fa-solid fa-plus"></i>
              </button>
            </div>
          )}

          <div style={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap", marginTop: "12px" }}>
            <button
              type="button"
              className={`btn ${flashState ? "btn-flashed" : ""}`}
              id="singleCartBtn"
              style={
                flashState ? { "--flash-color": flashState.color } : undefined
              }
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

            <button
              type="button"
              className={`single-wishlist-btn ${wishlisted ? "saved" : ""}`}
              onClick={handleToggleWishlist}
              title={wishlisted ? "Remove from Wishlist" : "Save to Wishlist"}
            >
              <i
                className={wishlisted ? "fa-solid fa-heart" : "fa-regular fa-heart"}
              ></i>{" "}
              {wishlisted ? "Saved in Wishlist" : "Save to Wishlist"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

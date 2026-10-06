import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductGrid from "../components/ProductGrid";
import { getProducts } from "../api/productApi";
import { useWishlist } from "../hooks/useWishlist";

export default function Wishlist() {
  const { wishlist } = useWishlist();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getProducts();
        if (Array.isArray(data)) setProducts(data);
      } catch (err) {
        console.error("Wishlist: failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const wishlistedProducts = products.filter((p) =>
    wishlist.includes(String(p.id))
  );

  return (
    <>
      <section className="page-top">
        <p className="small-title">Saved Items</p>
        <h1>My Wishlist</h1>
      </section>

      <section className="section">
        {loading ? (
          <div style={{ textAlign: "center", padding: "50px 20px" }}>
            <div className="loading-spinner"></div>
            <p style={{ marginTop: "14px", color: "#666" }}>Loading your saved items...</p>
          </div>
        ) : wishlistedProducts.length === 0 ? (
          <div className="empty-msg" style={{ maxWidth: "600px", margin: "0 auto" }}>
            <i
              className="fa-regular fa-heart"
              style={{
                fontSize: "36px",
                color: "var(--sweet-peony)",
                marginBottom: "12px",
                display: "block"
              }}
            ></i>
            <h3>Your wishlist is empty</h3>
            <p style={{ margin: "8px 0 18px", color: "#666" }}>
              Explore our curated collections and save your favorite products here!
            </p>
            <Link to="/shop" className="btn">
              <i className="fa-solid fa-store"></i> Explore Shop
            </Link>
          </div>
        ) : (
          <ProductGrid
            products={wishlistedProducts}
            emptyMessage="No items in your wishlist."
          />
        )}
      </section>
    </>
  );
}

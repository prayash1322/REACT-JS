import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import CategoryRow from "../components/CategoryRow";
import HeroBanner from "../components/HeroBanner";
import PromoGrid from "../components/PromoGrid";
import ServiceStrip from "../components/ServiceStrip";
import CategoryBand from "../components/CategoryBand";
import ProductGrid from "../components/ProductGrid";
import { getProducts } from "../api/productApi";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchHomeProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProducts();
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch products:", err);
      setError("Unable to load featured products right now. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHomeProducts();
  }, [fetchHomeProducts]);

  const featured = products.slice(0, 4);
  const newArrivals = products.length > 4 ? products.slice(4) : products;

  return (
    <>
      <CategoryRow />
      <HeroBanner />
      <PromoGrid />
      <ServiceStrip />

      <section className="section">
        <div className="section-heading">
          <h2>Featured Products</h2>
        </div>
        {loading ? (
          <div style={{ textAlign: "center", padding: "40px 20px" }}>
            <div className="loading-spinner"></div>
            <p style={{ marginTop: "14px", color: "#666", fontWeight: 500 }}>
              Loading products...
            </p>
          </div>
        ) : error ? (
          <div className="empty-msg" style={{ maxWidth: "500px", margin: "20px auto" }}>
            <i
              className="fa-solid fa-triangle-exclamation"
              style={{
                fontSize: "32px",
                color: "#c0392b",
                marginBottom: "10px",
                display: "block"
              }}
            ></i>
            <h3>Oops! Something went wrong</h3>
            <p style={{ margin: "6px 0 16px", color: "#666" }}>{error}</p>
            <button type="button" className="btn" onClick={fetchHomeProducts}>
              <i className="fa-solid fa-rotate-right"></i> Try Again
            </button>
          </div>
        ) : (
          <ProductGrid
            products={featured}
            emptyMessage="No products added yet."
          />
        )}
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="section-heading">
          <h2>New Arrivals</h2>
          <Link
            to="/shop"
            style={{
              fontSize: "13px",
              fontWeight: 700,
              color: "var(--primary)"
            }}
          >
            View All
          </Link>
        </div>
        {loading ? (
          <div style={{ textAlign: "center", padding: "30px 20px" }}>
            <div className="loading-spinner"></div>
          </div>
        ) : error ? null : (
          <ProductGrid
            products={newArrivals.slice().reverse()}
            emptyMessage="No new arrivals yet."
          />
        )}
      </section>

      <CategoryBand />
    </>
  );
}

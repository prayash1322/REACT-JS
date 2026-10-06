import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Link, useSearchParams } from "react-router-dom";
import ProductGrid from "../components/ProductGrid";
import EditProductModal from "../components/EditProductModal";
import { getProducts, updateProduct, deleteProduct } from "../api/productApi";
import { useCart } from "../hooks/useCart";
import { useWishlist } from "../hooks/useWishlist";
import { useAuth } from "../hooks/useAuth";
import { useToast } from "../hooks/useToast";

export default function Shop() {
  const [searchParams] = useSearchParams();
  const urlCategory = searchParams.get("category") || "all";
  const urlQuery = searchParams.get("q") || "";

  const { removeFromCart } = useCart();
  const { isAdmin } = useAuth();
  const toast = useToast();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState(urlQuery);
  const [categoryFilter, setCategoryFilter] = useState(
    urlCategory && urlCategory !== "All Categories" ? urlCategory : "all"
  );
  const [stockFilter, setStockFilter] = useState("all");
  const [sortBy, setSortBy] = useState("none");

  const [editingProduct, setEditingProduct] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    const cat = searchParams.get("category");
    const q = searchParams.get("q");
    if (cat) {
      setCategoryFilter(cat);
    } else {
      setCategoryFilter("all");
    }
    if (q !== null) {
      setSearchTerm(q);
    }
  }, [searchParams]);

  const loadProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProducts();
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load products:", err);
      setError("Unable to load products right now. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    const q = searchTerm.trim().toLowerCase();
    if (q) {
      result = result.filter(
        (p) =>
          p.name?.toLowerCase().includes(q) ||
          p.brand?.toLowerCase().includes(q) ||
          p.shortDesc?.toLowerCase().includes(q)
      );
    }

    if (categoryFilter !== "all" && categoryFilter !== "All Categories") {
      result = result.filter((p) => p.category === categoryFilter);
    }

    if (stockFilter === "instock") {
      result = result.filter((p) => Number(p.stock) > 0);
    } else if (stockFilter === "outofstock") {
      result = result.filter((p) => Number(p.stock) <= 0);
    }

    if (sortBy === "low") {
      result.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sortBy === "high") {
      result.sort((a, b) => Number(b.price) - Number(a.price));
    } else if (sortBy === "az") {
      result.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
    }

    return result;
  }, [products, searchTerm, categoryFilter, stockFilter, sortBy]);

  function handleEdit(product) {
    setEditingProduct(product);
    setIsEditModalOpen(true);
  }

  async function handleSaveEdit(updatedProduct) {
    try {
      await updateProduct(updatedProduct.id, updatedProduct);
      setProducts((prev) =>
        prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
      );
      setIsEditModalOpen(false);
      setEditingProduct(null);
      toast.success(`Updated "${updatedProduct.name}" successfully.`);
    } catch (err) {
      console.error("Failed to update product:", err);
      toast.error("Failed to update product. Please try again.");
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => String(p.id) !== String(id)));
      removeFromCart(id);
      toast.info("Product deleted.");
    } catch (err) {
      console.error("Failed to delete product:", err);
      toast.error("Failed to delete product. Please try again.");
    }
  }

  return (
    <>
      <section className="page-top">
        <p className="small-title">Browse everything</p>
        <h1>All Products</h1>
        {isAdmin && (
          <div style={{ marginTop: "16px" }}>
            <Link
              to="/add-product"
              className="btn add-product-header-btn"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 22px",
                borderRadius: "22px",
                fontWeight: 700
              }}
            >
              <i className="fa-solid fa-plus"></i> Add Product
            </Link>
          </div>
        )}
      </section>

      <section className="filter-box">
        <input
          type="text"
          id="searchBox"
          placeholder="Search by product name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          id="catFilter"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="all">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Furniture">Furniture</option>
          <option value="Beauty">Beauty</option>
          <option value="Fashion">Fashion</option>
          <option value="Books">Books</option>
        </select>
        <select
          id="stockFilter"
          value={stockFilter}
          onChange={(e) => setStockFilter(e.target.value)}
        >
          <option value="all">All Stock</option>
          <option value="instock">In Stock</option>
          <option value="outofstock">Out of Stock</option>
        </select>
        <select
          id="sortBox"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="none">Sort By</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
          <option value="az">Name: A to Z</option>
        </select>
      </section>

      <section className="section">
        {loading ? (
          <div style={{ textAlign: "center", padding: "60px 20px" }}>
            <div className="loading-spinner"></div>
            <p style={{ marginTop: "16px", color: "#666", fontWeight: 500 }}>
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
            <h3>Unable to load products</h3>
            <p style={{ margin: "6px 0 16px", color: "#666" }}>{error}</p>
            <button type="button" className="btn" onClick={loadProducts}>
              <i className="fa-solid fa-rotate-right"></i> Try Again
            </button>
          </div>
        ) : (
          <ProductGrid
            products={filteredProducts}
            emptyMessage="No products found."
            showManageActions={isAdmin}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </section>

      <EditProductModal
        product={editingProduct}
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingProduct(null);
        }}
        onSave={handleSaveEdit}
      />
    </>
  );
}

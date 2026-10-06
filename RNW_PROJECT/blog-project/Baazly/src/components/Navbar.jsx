import React from "react";
import { Link, NavLink } from "react-router-dom";
import SearchBar from "./SearchBar";
import { useCart } from "../hooks/useCart";
import { useWishlist } from "../hooks/useWishlist";
import { useAuth } from "../hooks/useAuth";

export default function Navbar() {
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, isAuthenticated, isAdmin } = useAuth();

  return (
    <header className="site-header">
      <div className="header-main">
        <Link to="/" className="logo">
          <img src="/images/baazly-logo.png" alt="Baazly" />
        </Link>

        <SearchBar />

        <div className="header-actions">
          <Link
            to="/wishlist"
            className="nav-icon-btn"
            aria-label="Wishlist"
            title="Wishlist"
          >
            <i className="fa-regular fa-heart"></i>
            {wishlistCount > 0 && (
              <span className="wishlist-count-badge">{wishlistCount}</span>
            )}
          </Link>

          <Link
            to={isAuthenticated ? "/profile" : "/login"}
            className="nav-icon-btn"
            aria-label={isAuthenticated ? "My Account" : "Sign In"}
            title={isAuthenticated ? `${user?.name || "My"} Account` : "Sign In"}
          >
            {isAuthenticated ? (
              <div className="nav-user-avatar">
                {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
              </div>
            ) : (
              <i className="fa-regular fa-user"></i>
            )}
          </Link>

          {isAdmin && (
            <Link to="/add-product" className="btn add-product-header-btn">
              <i className="fa-solid fa-plus"></i> <span className="btn-text">Add Product</span>
            </Link>
          )}

          <Link
            to="/cart"
            className="nav-icon-btn"
            aria-label="Shopping Cart"
            title="Shopping Cart"
          >
            <i className="fa-solid fa-cart-shopping"></i>
            <span id="cartCount">{cartCount}</span>
          </Link>
        </div>
      </div>

      <nav>
        <NavLink
          to="/"
          end
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <i className="fa-solid fa-house"></i> Home
        </NavLink>
        <NavLink
          to="/shop"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <i className="fa-solid fa-store"></i> Shop
        </NavLink>
        <NavLink
          to="/orders"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <i className="fa-solid fa-box-open"></i> {isAdmin ? "Customer Orders" : "Orders"}
        </NavLink>
        {isAdmin && (
          <NavLink
            to="/add-product"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <i className="fa-solid fa-plus"></i> Add Product
          </NavLink>
        )}
        <NavLink
          to="/cart"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <i className="fa-solid fa-cart-shopping"></i> Cart
        </NavLink>
      </nav>
    </header>
  );
}

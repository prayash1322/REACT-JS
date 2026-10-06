import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Footer() {
  const { isAuthenticated, isAdmin, logout } = useAuth();

  return (
    <footer className="site-footer">
      <div className="footer-links">
        <Link to="/" className="footer-link">Home</Link>
        <Link to="/shop" className="footer-link">Shop</Link>
        <Link to="/cart" className="footer-link">Cart</Link>
        <Link to="/wishlist" className="footer-link">Wishlist</Link>
        <Link to="/orders" className="footer-link">
          {isAdmin ? "Customer Orders" : "Orders"}
        </Link>
        {isAuthenticated ? (
          <>
            <Link to="/profile" className="footer-link">Profile</Link>
            <button
              type="button"
              onClick={logout}
              className="footer-link footer-btn-signout"
            >
              Sign Out
            </button>
          </>
        ) : (
          <Link to="/login" className="footer-link">Sign In</Link>
        )}
      </div>
      <p className="footer-copyright">
        &copy; {new Date().getFullYear()} Baazly. All rights reserved.
      </p>
    </footer>
  );
}

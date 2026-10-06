import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="section" style={{ textAlign: "center", padding: "80px 20px" }}>
      <h1 style={{ fontSize: "72px", margin: "0 0 10px", color: "var(--primary)" }}>404</h1>
      <h2 style={{ margin: "0 0 16px" }}>Page Not Found</h2>
      <p style={{ color: "#666", maxWidth: "450px", margin: "0 auto 24px" }}>
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link to="/" className="btn">
        <i className="fa-solid fa-house"></i> Go to Homepage
      </Link>
    </section>
  );
}

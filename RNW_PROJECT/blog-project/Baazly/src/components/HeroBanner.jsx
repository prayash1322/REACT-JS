import React from "react";
import { Link } from "react-router-dom";

export default function HeroBanner() {
  return (
    <section className="hero">
      <div className="hero-text">
        <p className="small-title">New arrivals just dropped</p>
        <h1>Everything you need, in one place.</h1>
        <p>
          Electronics, furniture, beauty, fashion and books delivered directly to your doorstep.
        </p>
        <div className="hero-buttons">
          <Link to="/shop" className="btn">
            Shop Now
          </Link>
        </div>
      </div>
      <div className="hero-card">
        <img
          src="https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&w=900&q=80"
          alt="Shopping"
        />
        <div>
          <span>Starting at Rs. 349</span>
          <strong>Handpicked deals across all categories</strong>
        </div>
      </div>
    </section>
  );
}

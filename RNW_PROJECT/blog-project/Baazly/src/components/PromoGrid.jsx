import React from "react";
import { Link } from "react-router-dom";

export default function PromoGrid() {
  return (
    <section className="promo-grid">
      <div className="promo-card dark-promo">
        <p>Fashion Weekend</p>
        <h2>Up to 45% off ethnic styles</h2>
        <Link to="/shop?category=Fashion">Shop Fashion</Link>
      </div>
      <div className="promo-card light-promo">
        <p>Home Upgrade</p>
        <h2>Furniture deals for study rooms</h2>
        <Link to="/shop?category=Furniture">Explore Furniture</Link>
      </div>
    </section>
  );
}

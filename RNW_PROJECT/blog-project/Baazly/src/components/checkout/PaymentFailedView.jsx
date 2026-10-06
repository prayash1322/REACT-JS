import React from "react";
import { Link } from "react-router-dom";

export default function PaymentFailedView({ failedInfo, onRetry }) {
  return (
    <div className="payment-page">
      <div className="payment-card checkout-status-card">
        <div className="status-icon-circle failure">
          <i className="fa-solid fa-xmark"></i>
        </div>

        <h1 className="payment-title text-failure">Payment Failed / Order Cancelled</h1>
        <p className="muted">
          Order Reference: <strong className="text-muted">{failedInfo.orderId}</strong>
        </p>

        <div className="failure-notice-box">
          <p className="failure-reason">{failedInfo.reason}</p>
          <p className="failure-refund-note">
            If any amount was deducted from your bank or UPI account, it will be automatically
            reversed back to you within 24 to 48 hours.
          </p>
        </div>

        <div className="order-nav-actions">
          <button type="button" className="btn btn-block" onClick={onRetry}>
            <i className="fa-solid fa-arrow-left"></i> Return to Checkout
          </button>

          <Link to="/cart" className="btn light-btn btn-block">
            <i className="fa-solid fa-cart-shopping"></i> Return to Cart
          </Link>

          <Link to="/shop" className="home-return-link">
            Browse Products
          </Link>
        </div>
      </div>
    </div>
  );
}

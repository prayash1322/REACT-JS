import React from "react";
import { Link } from "react-router-dom";

export default function OrderSuccessView({ order }) {
  const isUpi = order.paymentMethod === "UPI";

  return (
    <div className="payment-page">
      <div className="payment-card checkout-status-card">
        <div className="status-icon-circle success">
          <i className="fa-solid fa-check"></i>
        </div>

        <h1 className="payment-title text-success">Order Placed Successfully!</h1>
        <p className="muted">
          Order ID: <strong className="text-primary">{order.id}</strong>
        </p>

        <div className={`order-mode-pill ${isUpi ? "mode-upi" : "mode-cod"}`}>
          <i className={isUpi ? "fa-solid fa-qrcode" : "fa-solid fa-truck-fast"}></i>
          <strong>Payment Mode:</strong> {order.paymentMethod} &bull;{" "}
          <span>{order.paymentStatus}</span>
        </div>

        <div className="order-details-box">
          <div className="order-detail-line">
            <strong>Shipping to:</strong> {order.address?.street}, {order.address?.city},{" "}
            {order.address?.state}, {order.address?.pincode}
          </div>
          <div className="order-detail-line">
            <strong>Recipient:</strong> {order.customerInfo?.name} ({order.customerInfo?.phone})
          </div>
          <div className="order-detail-line">
            <strong>Estimated Delivery:</strong> Within 2 to 4 business days
          </div>
        </div>

        <div className="order-nav-actions">
          <Link to="/orders" className="btn btn-block">
            <i className="fa-solid fa-box"></i> View in My Orders
          </Link>

          <Link to="/shop" className="btn light-btn btn-block">
            <i className="fa-solid fa-store"></i> Continue Shopping
          </Link>

          <Link to="/" className="home-return-link">
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}

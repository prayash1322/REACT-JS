import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { getOrders, getOrdersByUserId } from "../api/orderApi";
import { money } from "../utils/formatters";
import { fallbackImg } from "../utils/storage";

export default function Orders() {
  const { user, isAdmin } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    setError(null);
    try {
      const data = isAdmin ? await getOrders() : await getOrdersByUserId(user.id);
      const sorted = Array.isArray(data) ? [...data].reverse() : [];
      setOrders(sorted);
    } catch (err) {
      console.error("Orders: Failed to fetch orders:", err);
      setError("Unable to load orders right now. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }, [user, isAdmin]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  function getStatusClass(status) {
    const s = (status || "pending").toLowerCase();
    if (s === "confirmed") return "status-confirmed";
    if (s === "delivered") return "status-delivered";
    if (s === "cancelled") return "status-cancelled";
    return "status-pending";
  }

  return (
    <>
      <section className="page-top">
        <p className="small-title">{isAdmin ? "Admin Dashboard" : "Purchases"}</p>
        <h1>{isAdmin ? "Customer Orders" : "My Order History"}</h1>
        {isAdmin && (
          <div className="admin-status-bar">
            <span className="admin-status-pill">
              <i className="fa-solid fa-shield-halved"></i> Store Admin View (All Orders)
            </span>
          </div>
        )}
      </section>

      <section className="section">
        {loading ? (
          <div className="orders-loading-state">
            <div className="loading-spinner"></div>
            <p>{isAdmin ? "Loading all customer orders..." : "Loading your orders..."}</p>
          </div>
        ) : error ? (
          <div className="empty-msg orders-error-box">
            <i className="fa-solid fa-triangle-exclamation orders-error-icon"></i>
            <h3>Unable to fetch orders</h3>
            <p>{error}</p>
            <button type="button" className="btn" onClick={fetchOrders}>
              <i className="fa-solid fa-rotate-right"></i> Try Again
            </button>
          </div>
        ) : orders.length === 0 ? (
          <div className="empty-msg orders-empty-box">
            <i className="fa-solid fa-box-open orders-empty-icon"></i>
            <h3>{isAdmin ? "No customer orders placed yet" : "No orders found"}</h3>
            <p>
              {isAdmin
                ? "When customers place orders from the store, they will automatically appear here."
                : "You haven't placed any orders yet. Explore our latest products and place an order!"}
            </p>
            <Link to="/shop" className="btn">
              <i className="fa-solid fa-store"></i> {isAdmin ? "Browse Store Products" : "Start Shopping"}
            </Link>
          </div>
        ) : (
          <div className="order-list">
            {orders.map((ord) => {
              const productItems = Array.isArray(ord.products) ? ord.products : [];
              const totalItems =
                ord.quantities || productItems.reduce((acc, p) => acc + (p.qty || 1), 0);

              const formattedAddress =
                typeof ord.address === "string"
                  ? ord.address
                  : `${ord.address?.street || ""}, ${ord.address?.city || ""}, ${
                      ord.address?.state || ""
                    } ${ord.address?.pincode || ""}`.replace(/^,\s*|,\s*$/g, "");

              return (
                <div key={ord.id} className="order-card">
                  {isAdmin && ord.customerInfo && (
                    <div className="order-customer-banner">
                      <div>
                        <span className="customer-banner-label">Customer:</span>{" "}
                        <strong className="text-primary">{ord.customerInfo.name || "Customer"}</strong>
                      </div>
                      {ord.customerInfo.email && (
                        <div>
                          <i className="fa-regular fa-envelope"></i> <span>{ord.customerInfo.email}</span>
                        </div>
                      )}
                      {ord.customerInfo.phone && (
                        <div>
                          <i className="fa-solid fa-phone"></i> <span>{ord.customerInfo.phone}</span>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="order-card-header">
                    <div>
                      <span className="order-label-tag">Order ID</span>
                      <h3 className="order-id-title">{ord.id}</h3>
                      <span className="order-date-text">Placed on {ord.date || "Recent"}</span>
                    </div>

                    <div className="order-header-badges">
                      <span className={`order-status-badge ${getStatusClass(ord.status)}`}>
                        <i className="fa-solid fa-circle-dot"></i>
                        {ord.status || "Pending"}
                      </span>
                      {ord.paymentMethod && (
                        <span
                          className={`order-payment-pill ${
                            ord.paymentMethod === "UPI" ? "pill-upi" : "pill-cod"
                          }`}
                        >
                          <i
                            className={
                              ord.paymentMethod === "UPI"
                                ? "fa-solid fa-qrcode"
                                : "fa-solid fa-truck-fast"
                            }
                          ></i>
                          {ord.paymentMethod} {ord.paymentStatus ? `• ${ord.paymentStatus}` : ""}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="order-items-list">
                    {productItems.map((it, idx) => (
                      <div key={idx} className="order-item-row">
                        <img
                          src={it.image || fallbackImg}
                          alt={it.name}
                          className="order-item-thumb"
                          onError={(e) => {
                            e.currentTarget.src = fallbackImg;
                          }}
                        />
                        <div className="order-item-info">
                          <h4>{it.name}</h4>
                          <span className="order-item-qty">
                            Qty: <strong>{it.qty || 1}</strong> × {money(it.price)}
                          </span>
                        </div>
                        <div className="order-item-subtotal">
                          {money(Number(it.price) * Number(it.qty || 1))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {ord.address && (
                    <div className="order-shipping-box">
                      <strong>
                        <i className="fa-solid fa-location-dot"></i> Shipping to:
                      </strong>{" "}
                      {formattedAddress}
                    </div>
                  )}

                  <div className="order-card-footer">
                    <span className="order-total-count">
                      Total items: <strong>{totalItems}</strong>
                    </span>
                    <div className="order-total-amount">
                      <span className="order-total-label">Order Total:</span>
                      <strong className="order-total-value">{money(ord.total)}</strong>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </>
  );
}

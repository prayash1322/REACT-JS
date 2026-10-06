import React from "react";
import { money } from "../../utils/formatters";
import { fallbackImg } from "../../utils/storage";

export default function CheckoutSummary({ cartItems, cartCount, cartTotal }) {
  return (
    <div className="payment-card checkout-summary-card">
      <h2 className="checkout-summary-title">
        Order Summary ({cartCount} {cartCount === 1 ? "item" : "items"})
      </h2>

      <div className="checkout-items-scroll">
        {cartItems.map((item) => (
          <div key={item.productId || item.id} className="checkout-summary-item">
            <img
              src={item.image || fallbackImg}
              alt={item.name}
              className="checkout-item-img"
              onError={(e) => {
                e.currentTarget.src = fallbackImg;
              }}
            />
            <div className="checkout-item-details">
              <p className="checkout-item-name">{item.name}</p>
              <span className="checkout-item-meta">
                Qty: {item.qty} &times; {money(item.price)}
              </span>
            </div>
            <strong className="checkout-item-price">
              {money(Number(item.price) * Number(item.qty))}
            </strong>
          </div>
        ))}
      </div>

      <div className="checkout-summary-breakdown">
        <div className="checkout-breakdown-row">
          <span>Subtotal</span>
          <span>{money(cartTotal)}</span>
        </div>
        <div className="checkout-breakdown-row">
          <span>Delivery Fee</span>
          <span className="text-free-delivery">FREE</span>
        </div>
        <div className="checkout-breakdown-row checkout-breakdown-total">
          <span>Total Payable</span>
          <span>{money(cartTotal)}</span>
        </div>
      </div>
    </div>
  );
}

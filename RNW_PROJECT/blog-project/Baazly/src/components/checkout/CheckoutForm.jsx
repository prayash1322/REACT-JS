import React from "react";
import { Link } from "react-router-dom";
import { money } from "../../utils/formatters";

export default function CheckoutForm({
  formData,
  onChange,
  paymentMethod,
  onPaymentMethodChange,
  onSubmit,
  isSubmitting,
  cartTotal
}) {
  return (
    <div className="payment-card checkout-form-card">
      <div className="checkout-back-link">
        <Link to="/cart">
          <i className="fa-solid fa-arrow-left"></i> Back to Cart
        </Link>
      </div>

      <h1 className="payment-title checkout-title">Checkout &amp; Delivery</h1>
      <p className="muted checkout-subtitle">
        Enter your shipping details and select your preferred payment method.
      </p>

      <form onSubmit={onSubmit} className="checkout-form">
        <div className="form-row">
          <div>
            <label htmlFor="chkName">Full Name *</label>
            <input
              type="text"
              id="chkName"
              name="name"
              required
              placeholder="Enter your full name"
              value={formData.name}
              onChange={onChange}
            />
          </div>
          <div>
            <label htmlFor="chkPhone">Phone Number *</label>
            <input
              type="tel"
              id="chkPhone"
              name="phone"
              required
              placeholder="+91 9876543210"
              value={formData.phone}
              onChange={onChange}
            />
          </div>
        </div>

        <div>
          <label htmlFor="chkEmail">Email Address</label>
          <input
            type="email"
            id="chkEmail"
            name="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={onChange}
          />
        </div>

        <div>
          <label htmlFor="chkStreet">Delivery Street Address *</label>
          <input
            type="text"
            id="chkStreet"
            name="street"
            required
            placeholder="House/Flat number, Apartment, Landmark"
            value={formData.street}
            onChange={onChange}
          />
        </div>

        <div className="form-row form-row-3">
          <div>
            <label htmlFor="chkCity">City *</label>
            <input
              type="text"
              id="chkCity"
              name="city"
              required
              placeholder="City / Town"
              value={formData.city}
              onChange={onChange}
            />
          </div>
          <div>
            <label htmlFor="chkState">State</label>
            <input
              type="text"
              id="chkState"
              name="state"
              placeholder="State / Region"
              value={formData.state}
              onChange={onChange}
            />
          </div>
          <div>
            <label htmlFor="chkPincode">PIN Code *</label>
            <input
              type="text"
              id="chkPincode"
              name="pincode"
              required
              placeholder="6 digit PIN code"
              value={formData.pincode}
              onChange={onChange}
            />
          </div>
        </div>

        <div>
          <label htmlFor="chkNotes">Order Note (Optional)</label>
          <textarea
            id="chkNotes"
            name="notes"
            rows="2"
            placeholder="Any delivery instructions or preferred timing..."
            value={formData.notes}
            onChange={onChange}
          ></textarea>
        </div>

        <div className="checkout-payment-section">
          <label className="checkout-payment-label">Select Payment Method *</label>

          <div className="payment-methods-selector">
            <div
              className={`payment-method-card ${paymentMethod === "upi" ? "selected" : ""}`}
              onClick={() => onPaymentMethodChange("upi")}
            >
              <input
                type="radio"
                id="payMethodUpi"
                name="paymentMethod"
                value="upi"
                checked={paymentMethod === "upi"}
                onChange={() => onPaymentMethodChange("upi")}
                className="payment-method-radio"
              />
              <div className="payment-method-body">
                <div className="payment-method-header">
                  <div className="payment-method-title">
                    <i className="fa-solid fa-qrcode" style={{ color: "var(--primary)" }}></i>
                    Instant UPI / QR Code
                  </div>
                  <span className="payment-method-badge badge-upi">Recommended</span>
                </div>
                <p className="payment-method-desc">
                  Pay online instantly using Google Pay, PhonePe, Paytm, BHIM, or any UPI app.
                </p>
              </div>
            </div>

            <div
              className={`payment-method-card ${paymentMethod === "cod" ? "selected" : ""}`}
              onClick={() => onPaymentMethodChange("cod")}
            >
              <input
                type="radio"
                id="payMethodCod"
                name="paymentMethod"
                value="cod"
                checked={paymentMethod === "cod"}
                onChange={() => onPaymentMethodChange("cod")}
                className="payment-method-radio"
              />
              <div className="payment-method-body">
                <div className="payment-method-header">
                  <div className="payment-method-title">
                    <i className="fa-solid fa-truck-fast" style={{ color: "#168143" }}></i>
                    Cash on Delivery (COD)
                  </div>
                  <span className="payment-method-badge badge-cod">Pay on Delivery</span>
                </div>
                <p className="payment-method-desc">
                  Pay via cash or UPI directly to our delivery courier when your order arrives.
                </p>
              </div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className={`btn checkout-submit-btn ${paymentMethod === "cod" ? "btn-cod" : ""}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <i className="fa-solid fa-spinner fa-spin"></i> Processing Order...
            </>
          ) : paymentMethod === "upi" ? (
            <>
              <i className="fa-solid fa-qrcode"></i> Proceed to UPI Payment &bull; {money(cartTotal)}
            </>
          ) : (
            <>
              <i className="fa-solid fa-check"></i> Place Order (Cash on Delivery) &bull; {money(cartTotal)}
            </>
          )}
        </button>
      </form>
    </div>
  );
}

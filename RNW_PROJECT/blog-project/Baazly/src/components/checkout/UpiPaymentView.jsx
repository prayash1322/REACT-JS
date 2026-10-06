import React from "react";
import { QRCodeSVG } from "qrcode.react";
import { money } from "../../utils/formatters";

export default function UpiPaymentView({
  upiSession,
  timeLeft,
  formatTime,
  upiId,
  payeeName,
  copiedUpi,
  onCopyUpi,
  utrNumber,
  onUtrChange,
  isVerifying,
  onConfirm,
  onCancel,
  cartTotal
}) {
  const isUrgent = timeLeft <= 60;
  const upiUri = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(
    payeeName
  )}&am=${encodeURIComponent(cartTotal)}&cu=INR&tn=${encodeURIComponent(
    `Order ${upiSession.orderId}`
  )}`;

  return (
    <div className="payment-page">
      <div className="upi-qr-card">
        <div className="upi-merchant-badge">
          <i className="fa-solid fa-shield-halved"></i> Baazly Verified Merchant
        </div>
        <h1 className="upi-title">Scan QR Code to Pay</h1>
        <p className="upi-subtitle">
          Order Reference: <strong className="text-primary">{upiSession.orderId}</strong>
        </p>

        <div className={`upi-timer-pill ${isUrgent ? "urgent" : ""}`}>
          <i className={`fa-solid ${isUrgent ? "fa-triangle-exclamation" : "fa-clock"}`}></i>
          <span>Session Expires In: {formatTime(timeLeft)}</span>
        </div>

        <div className="scanner-viewfinder">
          <span className="scanner-corner scanner-corner-tl"></span>
          <span className="scanner-corner scanner-corner-tr"></span>
          <span className="scanner-corner scanner-corner-bl"></span>
          <span className="scanner-corner scanner-corner-br"></span>
          {timeLeft > 0 && <span className="scanner-laser"></span>}
          <div className={`scanner-qr-wrapper ${timeLeft <= 0 ? "scanner-expired" : ""}`}>
            <QRCodeSVG
              value={upiUri}
              size={300}
              level="M"
              includeMargin={false}
              className="scanner-qr-svg"
            />
          </div>
        </div>

        <div className="upi-details-banner">
          <div className="upi-details-left">
            <span className="upi-label">Amount to Pay</span>
            <strong className="upi-amount">{money(cartTotal)}</strong>
          </div>

          <div className="upi-details-right">
            <span className="upi-label">Payee UPI ID</span>
            <div className="upi-copy-container">
              <span className="upi-id-badge">{upiId}</span>
              <button
                type="button"
                onClick={onCopyUpi}
                title="Copy UPI ID"
                className={`upi-copy-action-btn ${copiedUpi ? "copied" : ""}`}
              >
                <i className={copiedUpi ? "fa-solid fa-check" : "fa-regular fa-copy"}></i>
                {copiedUpi ? "Copied" : "Copy"}
              </button>
            </div>
          </div>
        </div>

        <p className="upi-scan-hint">Scan with any UPI application on your smartphone:</p>

        <div className="upi-apps-grid">
          <span className="upi-app-pill" title="Google Pay">
            <img src="/images/payments/gpay.png" alt="Google Pay" />
          </span>

          <span className="upi-app-pill" title="PhonePe">
            <img src="/images/payments/phonepe.png" alt="PhonePe" />
            <span className="phonepe-label">PhonePe</span>
          </span>

          <span className="upi-app-pill" title="Paytm">
            <img src="/images/payments/paytm.png" alt="Paytm" />
          </span>

          <span className="upi-app-pill" title="BHIM UPI">
            <img src="/images/payments/bhim.png" alt="BHIM UPI" />
            <span className="bhim-label">BHIM</span>
          </span>
        </div>

        <div className="upi-utr-wrapper">
          <label htmlFor="utrInput" className="upi-utr-label">
            12 Digit UPI Reference / UTR No. (Optional)
          </label>
          <input
            type="text"
            id="utrInput"
            placeholder="e.g. 328901456789"
            value={utrNumber}
            maxLength={16}
            onChange={(e) => onUtrChange(e.target.value.replace(/[^0-9a-zA-Z]/g, ""))}
            className="upi-utr-input"
          />
        </div>

        <div className="upi-action-buttons">
          <button
            type="button"
            className="btn btn-upi-confirm"
            disabled={isVerifying || timeLeft <= 0}
            onClick={onConfirm}
          >
            {isVerifying ? (
              <>
                <i className="fa-solid fa-spinner fa-spin"></i> Verifying Payment...
              </>
            ) : (
              <>
                <i className="fa-solid fa-circle-check"></i> I Have Paid ₹
                {Number(cartTotal).toLocaleString("en-IN")}
              </>
            )}
          </button>

          <button
            type="button"
            className="btn light-btn"
            disabled={isVerifying}
            onClick={onCancel}
          >
            <i className="fa-solid fa-xmark"></i> Cancel Payment
          </button>
        </div>

        <p className="upi-tab-warning">
          Please do not close or refresh this tab while your payment is being completed.
        </p>
      </div>
    </div>
  );
}

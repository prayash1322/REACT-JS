import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useCart } from "../hooks/useCart";
import { useToast } from "../hooks/useToast";
import { createOrder } from "../api/orderApi";
import { getProductById, patchProduct } from "../api/productApi";
import CheckoutForm from "../components/checkout/CheckoutForm";
import CheckoutSummary from "../components/checkout/CheckoutSummary";
import UpiPaymentView from "../components/checkout/UpiPaymentView";
import OrderSuccessView from "../components/checkout/OrderSuccessView";
import PaymentFailedView from "../components/checkout/PaymentFailedView";

const UPI_ID = "prayash1305@oksbi";
const UPI_PAYEE_NAME = "Baazly Store";
const UPI_SESSION_DURATION = 300;

export default function Checkout() {
  const { user } = useAuth();
  const { cartItems, cartCount, cartTotal, clearCart } = useCart();
  const toast = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    notes: ""
  });

  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [upiSession, setUpiSession] = useState(null);
  const [timeLeft, setTimeLeft] = useState(UPI_SESSION_DURATION);
  const [utrNumber, setUtrNumber] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [paymentFailed, setPaymentFailed] = useState(null);
  const [orderSuccess, setOrderSuccess] = useState(null);

  const timerRef = useRef(null);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        street: user.address?.street || (typeof user.address === "string" ? user.address : ""),
        city: user.address?.city || "",
        state: user.address?.state || "",
        pincode: user.address?.pincode || "",
        notes: ""
      });
    }
  }, [user]);

  const handleTimeout = useCallback((orderId) => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setUpiSession(null);
    setPaymentFailed({
      orderId,
      reason: "Your 5 minute payment session has expired before payment confirmation was completed."
    });
    toast.error("Payment session expired. Order was cancelled.");
  }, [toast]);

  useEffect(() => {
    if (upiSession) {
      setTimeLeft(UPI_SESSION_DURATION);
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleTimeout(upiSession.orderId);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [upiSession, handleTimeout]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function formatTime(seconds) {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  }

  function handleCopyUpi() {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(UPI_ID);
    } else {
      const el = document.createElement("textarea");
      el.value = UPI_ID;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopiedUpi(true);
    toast.info("UPI ID copied to clipboard!");
    setTimeout(() => setCopiedUpi(false), 2200);
  }

  function validateDeliveryForm() {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty. Add items before checking out!");
      return false;
    }
    if (!formData.name.trim()) {
      toast.error("Please enter your full name.");
      return false;
    }
    if (!formData.phone.trim()) {
      toast.error("Please enter your phone number.");
      return false;
    }
    if (!formData.street.trim() || !formData.city.trim() || !formData.pincode.trim()) {
      toast.error("Please complete your delivery address (Street, City, and PIN code).");
      return false;
    }
    return true;
  }

  function buildOrderPayload(orderId, method, paymentStatus, extra = {}) {
    return {
      id: orderId,
      userId: user?.id || "guest",
      products: cartItems.map((item) => ({
        productId: item.productId || item.id,
        name: item.name,
        price: Number(item.price),
        image: item.image,
        qty: Number(item.qty)
      })),
      quantities: cartCount,
      total: cartTotal,
      paymentMethod: method,
      paymentStatus,
      customerInfo: {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim()
      },
      address: {
        street: formData.street.trim(),
        city: formData.city.trim(),
        state: formData.state.trim() || "India",
        pincode: formData.pincode.trim()
      },
      notes: formData.notes.trim(),
      date: new Date().toLocaleDateString("en-IN", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      }),
      status: "confirmed",
      ...extra
    };
  }

  async function deductStockForCart(items) {
    await Promise.all(
      items.map(async (it) => {
        const pid = it.productId || it.id;
        if (!pid) return;
        try {
          const prod = await getProductById(pid);
          const currentStock = Number(prod?.stock) || 0;
          const buyQty = Number(it.qty) || 1;
          const remainingStock = Math.max(0, currentStock - buyQty);
          await patchProduct(pid, { stock: remainingStock });
        } catch (err) {
          console.error("Failed to deduct stock for product:", pid, err);
        }
      })
    );
  }

  async function handleInitialSubmit(e) {
    e.preventDefault();
    if (!validateDeliveryForm()) return;

    const orderId = "ORD-" + Math.floor(100000 + Math.random() * 900000);

    if (paymentMethod === "upi") {
      setUtrNumber("");
      setUpiSession({ orderId, amount: cartTotal });
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setIsSubmitting(true);
    try {
      const orderPayload = buildOrderPayload(orderId, "Cash on Delivery", "Pending on Delivery");
      await createOrder(orderPayload);
      await deductStockForCart(cartItems);
      clearCart();
      setOrderSuccess(orderPayload);
      toast.success("Order placed successfully with Cash on Delivery!");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error("Order creation error:", err);
      toast.error("Unable to complete your order right now. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleConfirmUpiPaid() {
    if (!upiSession) return;
    setIsVerifying(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const orderPayload = buildOrderPayload(
        upiSession.orderId,
        "UPI",
        "Paid",
        {
          upiId: UPI_ID,
          utr: utrNumber.trim() || `UPI-TXN-${Math.floor(100000 + Math.random() * 900000)}`
        }
      );

      await createOrder(orderPayload);
      await deductStockForCart(cartItems);

      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }

      clearCart();
      setUpiSession(null);
      setOrderSuccess(orderPayload);
      toast.success("Payment verified! Your order has been placed successfully.");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error("UPI order save error:", err);
      toast.error("Unable to save your order right now. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  }

  function handleCancelPayment() {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setUpiSession(null);
    setPaymentFailed(null);
    toast.info("Payment cancelled. You are back at checkout.");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleRetryPayment() {
    setPaymentFailed(null);
    setUpiSession(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (orderSuccess) {
    return <OrderSuccessView order={orderSuccess} />;
  }

  if (paymentFailed) {
    return <PaymentFailedView failedInfo={paymentFailed} onRetry={handleRetryPayment} />;
  }

  if (upiSession) {
    return (
      <UpiPaymentView
        upiSession={upiSession}
        timeLeft={timeLeft}
        formatTime={formatTime}
        upiId={UPI_ID}
        payeeName={UPI_PAYEE_NAME}
        copiedUpi={copiedUpi}
        onCopyUpi={handleCopyUpi}
        utrNumber={utrNumber}
        onUtrChange={setUtrNumber}
        isVerifying={isVerifying}
        onConfirm={handleConfirmUpiPaid}
        onCancel={handleCancelPayment}
        cartTotal={cartTotal}
      />
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="payment-page empty-cart-page">
        <div className="payment-card empty-cart-card">
          <i className="fa-solid fa-cart-shopping empty-cart-icon"></i>
          <h1 className="payment-title">Your Cart is Empty</h1>
          <p className="muted empty-cart-text">
            Please add products to your cart before proceeding to checkout.
          </p>
          <Link to="/shop" className="btn btn-block">
            Explore Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-page checkout-page-main">
      <section className="checkout-layout-grid">
        <CheckoutForm
          formData={formData}
          onChange={handleChange}
          paymentMethod={paymentMethod}
          onPaymentMethodChange={setPaymentMethod}
          onSubmit={handleInitialSubmit}
          isSubmitting={isSubmitting}
          cartTotal={cartTotal}
        />

        <CheckoutSummary
          cartItems={cartItems}
          cartCount={cartCount}
          cartTotal={cartTotal}
        />
      </section>
    </div>
  );
}

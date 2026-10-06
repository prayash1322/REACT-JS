import React from "react";
import { Link, useNavigate } from "react-router-dom";
import CartItem from "../components/CartItem";
import { useCart } from "../hooks/useCart";
import { useToast } from "../hooks/useToast";
import { money } from "../utils/formatters";

export default function Cart() {
  const navigate = useNavigate();
  const { cartItems, cartCount, cartTotal, updateQuantity, removeFromCart } = useCart();
  const toast = useToast();

  function handleQtyChange(productId, change) {
    const item = cartItems.find((it) => String(it.productId || it.id) === String(productId));
    if (!item) return;

    const newQty = Number(item.qty) + change;
    const maxStock = Number(item.stock) || Infinity;

    if (change > 0 && newQty > maxStock) {
      toast.error(`Only ${maxStock} item(s) available in stock.`);
      return;
    }

    if (newQty <= 0) {
      handleRemove(productId);
    } else {
      updateQuantity(productId, newQty);
    }
  }

  function handleRemove(productId) {
    const item = cartItems.find((it) => String(it.productId || it.id) === String(productId));
    const name = item?.name || "Item";
    removeFromCart(productId);
    toast.info(`Removed "${name}" from cart.`);
  }

  function handleCheckout() {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty. Please add products before checkout.");
      return;
    }
    navigate("/checkout");
  }

  return (
    <>
      <section className="page-top">
        <p className="small-title">Review your items</p>
        <h1>Your Cart</h1>
      </section>

      <section className="cart-layout">
        <div id="cartItems">
          {cartItems.length === 0 ? (
            <div className="empty-msg" style={{ padding: "40px 20px" }}>
              <i
                className="fa-solid fa-cart-shopping"
                style={{ fontSize: "40px", color: "var(--primary)", marginBottom: "14px", display: "block" }}
              ></i>
              <h3>Your cart is empty</h3>
              <p style={{ margin: "8px 0 18px", color: "#666" }}>
                Looks like you haven't added anything to your cart yet.
              </p>
              <Link to="/shop" className="btn">
                <i className="fa-solid fa-store"></i> Start Shopping
              </Link>
            </div>
          ) : (
            cartItems.map((item) => {
              const pid = item.productId || item.id;
              return (
                <CartItem
                  key={pid}
                  item={item}
                  product={item}
                  onQtyChange={handleQtyChange}
                  onRemove={handleRemove}
                />
              );
            })
          )}
        </div>

        <div className="cart-summary">
          <h2>Order Summary</h2>
          <div className="cart-summary-rows">
            <div className="cart-summary-row">
              <span>Items</span>
              <span id="cartItemCount">{cartCount}</span>
            </div>
            <div className="cart-summary-row">
              <span>Subtotal</span>
              <span id="cartSubtotal">{money(cartTotal)}</span>
            </div>
            <div className="cart-summary-row">
              <span>Shipping</span>
              <span className="text-green">Free</span>
            </div>
            <div className="cart-summary-divider"></div>
            <div className="cart-summary-row cart-summary-total">
              <span>Total</span>
              <span id="cartTotal">{money(cartTotal)}</span>
            </div>
          </div>

          <Link to="/shop" className="btn cart-btn-secondary">
            <i className="fa-solid fa-arrow-left"></i> Continue Shopping
          </Link>
          <button
            type="button"
            className="btn cart-btn-checkout"
            id="checkoutBtn"
            onClick={handleCheckout}
            disabled={cartItems.length === 0}
            style={cartItems.length === 0 ? { opacity: 0.6, cursor: "not-allowed" } : {}}
          >
            <i className="fa-solid fa-lock"></i> Proceed to Checkout
          </button>
        </div>
      </section>
    </>
  );
}

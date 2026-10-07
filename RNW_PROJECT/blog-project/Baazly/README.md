# Baazly

A modern, responsive e-commerce application built with **React 18**, **Vite**, **React Router v6**, **Context API**, and **JSON Server**.

## Features

- **Home Page** — Hero banner, promo grids, service strip, category cards, featured & new arrival products
- **Shop & Search** — Category filter, in-stock / out-of-stock filter, sort by price / name, real-time live search
- **Product Details** — Image gallery with auto-cycling slideshow, specifications, stock validation, quantity selector
- **Cart** — Real-time sync via Context API, quantity adjustments with stock limits, subtotal calculations
- **Wishlist** — Toggle products with toast notifications, persisted via Context API
- **Authentication** — Sign in, registration, session persistence with localStorage, protected routes
- **Profile & Orders** — Account management, delivery address updates, full order history
- **Checkout** — Pre-filled customer info, Cash on Delivery & UPI payment, WhatsApp order forwarding
- **Admin** — Add products, modal-based editing, direct deletion — all synced with JSON Server REST API

## Tech Stack

| Layer | Technology |
|---|---|
| UI | React 18 + Vite |
| Routing | React Router v6 |
| State Management | Context API + Custom Hooks |
| HTTP Client | Axios |
| Backend / DB | JSON Server |
| Styling | Vanilla CSS (custom responsive design system) |

## Project Structure

```
src/
├── api/            # Axios API modules (auth, products, categories, orders)
├── components/     # Reusable UI components (Navbar, ProductCard, CartItem …)
├── context/        # Global state — AuthContext, CartContext, WishlistContext, ToastContext
├── hooks/          # Custom hooks — useAuth, useCart, useWishlist, useToast
├── layouts/        # MainLayout (Navbar + Footer wrapper)
├── pages/          # Route-level pages (Home, Shop, Cart, Checkout, Profile …)
├── routes/         # AppRoutes + ProtectedRoute
└── utils/          # Helpers — formatters, imageUtils, localStorage storage
db.json             # JSON Server mock database (users, products, categories, orders)
```

## Context API Architecture

All global state is managed through React Context + custom hooks — no Redux, no external state library.

```
AuthContext    → current user session, login / logout / register
CartContext    → cart items, add / remove / update quantity, totals
WishlistContext → wishlist items, toggle in/out
ToastContext   → global toast notification queue
```

Each context is consumed via a dedicated custom hook:

```js
const { user, login, logout } = useAuth();
const { cartItems, addToCart, removeFromCart } = useCart();
const { wishlist, toggleWishlist } = useWishlist();
const { showToast } = useToast();
```

## JSON Server — Mock REST API

`db.json` is the single source of truth for the backend. JSON Server exposes full REST endpoints automatically:

| Resource | Endpoint | Description |
|---|---|---|
| Users | `GET/POST /users` | Auth & profile data |
| Products | `GET/POST/PUT/DELETE /products` | Full product CRUD |
| Categories | `GET /categories` | Category list |
| Orders | `GET/POST /orders` | Order history |

All API calls are centralised in `src/api/`:

```js
// productApi.js
export const getProducts = () => api.get('/products');
export const addProduct  = (data) => api.post('/products', data);
export const updateProduct = (id, data) => api.put(`/products/${id}`, data);
export const deleteProduct = (id) => api.delete(`/products/${id}`);
```

## How To Run

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start JSON Server (mock REST API on port 3001):
   ```bash
   npm run server
   ```

3. Start Vite dev server (port 5173):
   ```bash
   npm run dev
   ```

> Both servers must be running simultaneously.

## Explanation Video

A short walkthrough covering the live app demo, Context API architecture, `db.json` structure, and how JSON Server powers the REST API — all in under 2 minutes.

> 📹 [Watch the explanation video](https://drive.google.com/file/d/1-ZWrANjmhG4xtcgrreAhrAv8phDe_YLm/view?usp=sharing)

## Screenshots

![Home Screen](./public/images/output/home.png)
![Home Screen](./public/images/output/home-2.png)
![Home Screen Added Products view](./public/images/output/home-added-view.png)
![Shop Page](./public/images/output/view-product.png)
![Add Product Page](./public/images/output/add-product.png)
![Single Product View](./public/images/output/single-product-view.png)
![Single Product View](./public/images/output/single-product-view-1.png)
![Cart & Checkout](./public/images/output/cart.png)
![Cart & Checkout](./public/images/output/payment-page.png)

---

## Author

**Prayash Jena**
- GitHub: [@prayash1322](https://github.com/prayash1322)

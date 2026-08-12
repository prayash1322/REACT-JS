# 🌟 Glimpse

A modern media search app built with React & Redux that lets you search and save photos, videos, and GIFs all in one place.

---

## ✨ Features

- 🔍 **Search** — Search for any media across multiple sources at once
- 🗂️ **All Tab** — View photos, videos, and GIFs mixed together in one grid
- 📸 **Photos** — Powered by Unsplash API
- 🎥 **Videos** — Powered by Pexels API
- 🎞️ **GIFs** — Powered by Giphy API
- 💾 **Collections** — Save your favorite media and revisit them anytime
- 🗑️ **Clear Collection** — Remove all saved items at once
- 🌙 **Dark / Light Mode** — Toggle between dark and light theme
- 💀 **Skeleton Loading** — Smooth skeleton placeholders while content loads
- 🔔 **Toast Notifications** — Feedback on save, remove, and clear actions
- 🦥 **Lazy Loading** — Images load only when visible for better performance

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| ⚛️ React 19 | UI Library |
| 🗃️ Redux Toolkit | State Management |
| 🛣️ React Router DOM | Client-side Routing |
| 🎨 Tailwind CSS v4 | Styling |
| 📡 Axios | API Requests |
| 🔔 React Toastify | Toast Notifications |
| 💀 React Loading Skeleton | Skeleton UI |
| 🖼️ Lucide React | Icons |
| ⚡ Vite | Build Tool |

---

## 🌐 APIs Used

- [Unsplash API](https://unsplash.com/developers) — Photos
- [Pexels API](https://www.pexels.com/api/) — Videos
- [Giphy API](https://developers.giphy.com/) — GIFs

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/media-search.git
cd media-search
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment variables

Create a `.env` file in the root of the project and add your API keys:

```env
VITE_UNSPLASH_KEY=your_unsplash_api_key
VITE_PEXELS_KEY=your_pexels_api_key
VITE_GIPHY_KEY=your_giphy_api_key
```

### 4. Start the development server

```bash
npm run dev
```

---

## 📁 Project Structure

```
src/
├── api/
│   └── mediaApi.js         # API calls for Unsplash, Pexels, Giphy
├── components/
│   ├── Navbar.jsx           # Navbar with theme toggle & collection badge
│   ├── SearchBar.jsx        # Search input form
│   ├── Tabs.jsx             # All / Photos / Videos / GIF tabs
│   ├── ResultGrid.jsx       # Grid of results with skeleton loading
│   ├── ResultCard.jsx       # Individual media card
│   ├── CollectionCard.jsx   # Saved media card with remove button
│   └── SkeletonCard.jsx     # Skeleton placeholder card
├── pages/
│   ├── HomePage.jsx         # Search page
│   └── CollectionPage.jsx   # Saved collection page
├── redux/
│   ├── store.js             # Redux store
│   └── features/
│       ├── searchSlice.js   # Search state (query, results, tabs, loading)
│       ├── collectionSlice.js # Collection state with localStorage
│       └── themeSlice.js    # Dark/Light theme state
├── App.jsx
├── main.jsx
└── index.css
```

---

## 📸 Screenshots

> Coming soon...

---
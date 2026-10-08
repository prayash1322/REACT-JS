# CINEVAULT: Cinematic Movie Discovery Platform

CINEVAULT is a production-quality, responsive movie discovery platform inspired by modern cinema interfaces and streaming platforms. It combines real-time data from The Movie Database (TMDb), client-side demo authentication, custom watchlist and favorites persistence, and a dark aesthetic.

---

## Features

- **Cinematic Hero Carousel**: Dynamic rotation of featured films with backdrop art, trailer preview modal, and instant watchlist toggling.
- **Independent Movie Rails**: Popular Right Now, Trending This Week, In Theaters, Top Rated, and Coming Soon sections load independently through isolated Redux state slices.
- **Full Catalog & Filtering**: Browse by Genre, Year, Minimum Rating, and Sort By with URL query synchronization (`/movies?genre=28&rating=7`).
- **Live Debounced Search**: Fast, keystroke-optimized live search with 400ms debounce to minimize network requests.
- **Detailed Movie Pages**: Comprehensive information including high-definition backdrops, posters, storyline, genres, budget, revenue, spoken languages, top-billed cast rail, trailer modals, and similar movie suggestions.
- **Client-Side Demo Authentication**: Instant login with persistent sessions in localStorage and redirect to intended routes upon sign-in.
- **Personal Library**: Add/remove favorites and maintain a personal watchlist with dedicated protected pages and empty states.
- **Graceful Fallbacks & Offline Resilience**: Includes built-in showcase movie data so developers can preview and test all features immediately without requiring an API key.
- **Custom Design System**: Restrained cinematic color palette (`#07090D`, `#0E1117`, `#151922`, `#E50914`), custom scrollbars, micro-animations, and responsive layout across mobile, tablet, and desktop.

---

## Tech Stack

- **Core**: React 19, JavaScript (ES6+), Vite 8
- **Routing**: React Router DOM 7
- **State Management**: Redux 5, React Redux 9, Redux Thunk 3
- **Data Fetching**: Axios
- **Styling**: Vanilla CSS with Design System Variables, Bootstrap 5 Grid & Utilities, Bootstrap Icons

---

## Project Structure

```text
src/
├── assets/                  # Static assets and graphics
├── components/
│   ├── CastList/            # Actor cards with profile fallbacks
│   ├── DevKeyNotice/        # Developer banner for TMDb key status
│   ├── EmptyState/          # Designed empty states for library and search
│   ├── ErrorMessage/        # Cinematic error message with retry actions
│   ├── Footer/              # Cinematic footer with site links
│   ├── GenreFilter/         # Filter pill buttons for movie genres
│   ├── Hero/                # Large hero carousel with backdrop overlay
│   ├── MovieCard/           # Reusable interactive movie card
│   ├── MovieGrid/           # Responsive grid for catalog and search
│   ├── MovieRow/            # Horizontal scrollable movie rail
│   ├── Navbar/              # Sticky translucent navbar with mobile drawer
│   ├── ProtectedRoute/      # Route guard for authenticated views
│   ├── Skeletons/           # Shimmer loading skeleton placeholders
│   └── TrailerModal/        # Modal with embedded YouTube trailer player
├── hooks/
│   └── useDebounce.js       # Debounce hook for responsive search
├── pages/
│   ├── Favorites/           # Saved favorites collection
│   ├── Home/                # Main landing page with featured rails
│   ├── Login/               # Authentication page with demo credentials
│   ├── MovieDetails/        # Movie details, storyline, cast, similar
│   ├── Movies/              # Catalog with multi-attribute filtering
│   ├── NotFound/            # 404 error page
│   ├── Profile/             # User profile, statistics, and logout
│   ├── Search/              # Real-time debounced movie search
│   └── Watchlist/           # Saved queue of movies to watch
├── redux/
│   ├── actions/             # movieActions, authActions, userActions
│   ├── reducers/            # movieReducer, authReducer, userReducer, rootReducer
│   ├── actionTypes.js       # Action constants
│   └── store.js             # Configured Redux store with thunk
├── services/
│   ├── mockData.js          # High-fidelity mock dataset with real poster paths
│   └── tmdbApi.js           # Centralized Axios API service
├── utils/
│   ├── constants.js         # API endpoints, genres, demo credentials
│   ├── debounce.js          # Standalone debounce utility
│   ├── imageHelpers.js      # Poster, backdrop, profile image helpers
│   └── storage.js           # Safe localStorage getters and setters
├── App.css                  # Core layout flex styles
├── App.jsx                  # Main routing configuration
├── index.css                # Global CSS variables and design tokens
└── main.jsx                 # React root and Redux provider initialization
```

---

## Redux Architecture

Redux state is separated into three primary branches:
1. `movies`:
   - `popular`, `trending`, `upcoming`, `topRated`, `nowPlaying` (each holds `{ data, loading, error }`)
   - `discover` (catalog list with pagination, page counter, and total count)
   - `selectedMovie`, `credits`, `similar`, `videos`
   - `search` (live search query, results, count, loading)
2. `auth`:
   - `isAuthenticated`, `user`, `loading`, `error`
3. `user`:
   - `favorites` (list of saved movies)
   - `watchlist` (list of queued movies)

Action thunks dispatch clear action flows:
`Component -> dispatch(thunk) -> tmdbApi (Axios) -> ACTION_SUCCESS / FAILURE -> Reducer -> Store`

---

## Environment Variables & TMDb Configuration

The application uses Vite environment variables:

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
2. Configure your TMDb API key:
   ```env
   VITE_TMDB_API_KEY=your_tmdb_api_key_here
   VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
   VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p
   ```

*Note: If no API key is specified, CINEVAULT will automatically run in showcase mode using built-in high-fidelity movie data with authentic TMDb backdrop and poster graphics.*

---

## Demo Login Credentials

CINEVAULT includes simulated client-side authentication for immediate testing without requiring backend setup. You can use the following default credentials to sign in:

- **Email**: `demo@cinevault.io`
- **Password**: `password123`

*(Note: Any valid email address and password will also create a session and persist your favorites and watchlist to localStorage.)*

---

## Available Scripts

In the `movie-web` directory:

- `npm run dev`: Starts the Vite development server.
- `npm run build`: Compiles the optimized production bundle.
- `npm run preview`: Previews the production build locally.
- `npm run lint`: Runs ESLint across all source files.

# Vastrika Backend API

Production-ready FastAPI backend for the Vastrika Indian ethnic fashion e-commerce platform.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | FastAPI 0.111 + Python 3.12 |
| ORM | SQLAlchemy 2.x (async) |
| Migrations | Alembic |
| Validation | Pydantic v2 |
| Database | MySQL 8.0 |
| Auth | JWT (python-jose) + bcrypt |
| Images | Cloudinary |
| Rate Limiting | SlowAPI |
| Container | Docker + Docker Compose |

---

## Quick Start

### 1. Clone and configure

```bash
git clone <repo>
cd vastrika-backend

cp .env.example .env
# Edit .env with your values
```

### 2. Run with Docker (recommended)

```bash
# Start DB + API (with hot-reload)
docker compose up

# With Adminer DB GUI on http://localhost:8080
docker compose --profile dev up
```

The API will be available at `http://localhost:8000`
Interactive docs at `http://localhost:8000/docs`

### 3. Run locally (without Docker)

```bash
python -m venv .venv
source .venv/bin/activate        # Windows: .venv\Scripts\activate
pip install -r requirements.txt

# Make sure MySQL is running and .env is configured
alembic upgrade head              # Run migrations
uvicorn app.main:app --reload     # Start dev server
```

---

## Environment Variables

Copy `.env.example` to `.env` and fill in all values. Key variables:

| Variable | Description |
|---|---|
| `DB_*` | MySQL connection details |
| `JWT_SECRET_KEY` | Secret for customer JWTs — generate with `openssl rand -hex 32` |
| `ADMIN_JWT_SECRET_KEY` | Separate secret for admin JWTs |
| `ADMIN_SEED_EMAIL` | Default: `dhruvinadmin@gmail.com` |
| `ADMIN_SEED_PASSWORD` | Default: `DHRUVINADMIN21` |
| `CLOUDINARY_*` | Your Cloudinary credentials |
| `FRONTEND_URL` | Your React app URL (for CORS) |

---

## Database Migrations

```bash
# Apply all migrations
alembic upgrade head

# Create a new migration after model changes
alembic revision --autogenerate -m "description"

# Roll back one step
alembic downgrade -1

# View migration history
alembic history
```

---

## API Reference

Base URL: `/api/v1`

### Customer Auth
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/auth/register` | — | Register new customer |
| POST | `/auth/login` | — | Login → token pair |
| POST | `/auth/refresh` | — | Refresh access token |
| POST | `/auth/logout` | — | Revoke refresh token |
| GET | `/auth/me` | Bearer | Get profile |
| PUT | `/auth/me` | Bearer | Update profile |
| POST | `/auth/change-password` | Bearer | Change password |

### Admin Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | `/admin/auth/login` | Admin login (max 2 sessions) |
| POST | `/admin/auth/logout` | Admin logout |
| POST | `/admin/auth/refresh` | Refresh admin token |

### Products (Public)
| Method | Endpoint | Description |
|---|---|---|
| GET | `/categories` | List categories |
| GET | `/products` | List + filter products |
| GET | `/products/featured` | Featured products |
| GET | `/products/new-arrivals` | New arrivals |
| GET | `/products/{id}` | Product detail |

### Cart (Authenticated)
| Method | Endpoint | Description |
|---|---|---|
| GET | `/cart` | Get cart |
| POST | `/cart/items` | Add item |
| PUT | `/cart/items/{id}` | Update quantity |
| DELETE | `/cart/items/{id}` | Remove item |
| DELETE | `/cart` | Clear cart |
| POST | `/cart/sync` | Sync guest cart on login |

### Wishlist (Authenticated)
| Method | Endpoint | Description |
|---|---|---|
| GET | `/wishlist` | Get wishlist |
| POST | `/wishlist/{product_id}` | Add to wishlist |
| DELETE | `/wishlist/{product_id}` | Remove from wishlist |

### Orders (Authenticated)
| Method | Endpoint | Description |
|---|---|---|
| POST | `/orders` | Create order from cart |
| GET | `/orders` | Order history |
| GET | `/orders/{id}` | Order detail |
| POST | `/orders/{id}/cancel` | Cancel order |

### Admin — Products
| Method | Endpoint | Description |
|---|---|---|
| GET/POST | `/admin/products` | List / create |
| PUT/DELETE | `/admin/products/{id}` | Update / soft-delete |
| POST | `/admin/products/{id}/images` | Upload image |
| DELETE | `/admin/products/{id}/images/{img_id}` | Delete image |
| PATCH | `/admin/products/{id}/stock` | Update stock |

### Admin — Orders
| Method | Endpoint | Description |
|---|---|---|
| GET | `/admin/orders` | All orders |
| GET | `/admin/orders/{id}` | Order detail |
| PATCH | `/admin/orders/{id}/status` | Update status |

### Admin — Users
| Method | Endpoint | Description |
|---|---|---|
| GET | `/admin/users` | All users |
| GET | `/admin/users/{id}` | User detail |
| PATCH | `/admin/users/{id}/block` | Block user |
| PATCH | `/admin/users/{id}/unblock` | Unblock user |

### Admin — Dashboard
| Method | Endpoint | Description |
|---|---|---|
| GET | `/admin/dashboard` | Stats + recent orders |

---

## Frontend Integration Guide

### 1. Replace static product data

In your Zustand store or a new `api.ts`, replace `../data/products` imports:

```typescript
// src/api/products.ts
const BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:8000/api/v1';

export const fetchProducts = async (params?: ProductFilters) => {
  const qs = new URLSearchParams(params as any).toString();
  const res = await fetch(`${BASE}/products?${qs}`);
  return res.json();
};
```

### 2. Auth store additions

```typescript
// In your useStore.ts, add:
login: async (email, password) => {
  const res = await fetch(`${BASE}/auth/login`, { method: 'POST', ... });
  const { data } = await res.json();
  localStorage.setItem('access_token', data.access_token);
  localStorage.setItem('refresh_token', data.refresh_token);
  // Sync local cart to server
  await syncCart(get().cart);
},
```

### 3. Cart sync on login

```typescript
const syncCart = async (localCart: CartItem[]) => {
  await fetch(`${BASE}/cart/sync`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${getToken()}` },
    body: JSON.stringify({ items: localCart }),
  });
};
```

### 4. New routes needed in React

Add these routes to `App.tsx`:
- `/login` — Customer login page
- `/register` — Customer registration
- `/checkout` — Checkout flow (connects to `POST /orders`)
- `/orders` — Order history
- `/orders/:id` — Order detail

---

## Security Notes

- **Passwords** — hashed with bcrypt, cost factor 12
- **JWT secrets** — use different secrets for customer and admin tokens
- **Refresh tokens** — stored as SHA-256 hash, rotated on every use
- **Admin sessions** — tracked in DB by JWT ID (jti), max 2 concurrent enforced at DB query level
- **Order totals** — always recalculated server-side, never trusted from client
- **Stock** — decremented atomically with `GREATEST(0, stock - qty)` to prevent negative values
- **Soft deletes** — products are never hard-deleted, preserving order history integrity
- **Rate limiting** — 60 req/min general, configurable via `RATE_LIMIT_PER_MINUTE`

---

## Running Tests

```bash
pip install pytest pytest-asyncio httpx aiosqlite
pytest tests/ -v
```

---

## Project Structure

```
vastrika-backend/
├── app/
│   ├── api/v1/
│   │   ├── auth/          # Customer auth routes
│   │   ├── products/      # Public product routes
│   │   ├── cart/          # Cart routes
│   │   ├── wishlist/      # Wishlist routes
│   │   ├── orders/        # Customer order routes
│   │   ├── contact/       # Contact form
│   │   ├── admin/
│   │   │   ├── auth/      # Admin login/logout
│   │   │   ├── products/  # Admin product CRUD
│   │   │   ├── orders/    # Admin order management
│   │   │   ├── users/     # Admin user management
│   │   │   └── dashboard/ # Dashboard stats
│   │   └── router.py      # Aggregates all routers
│   ├── core/
│   │   ├── config.py      # Pydantic settings
│   │   ├── security.py    # JWT + password utils
│   │   ├── dependencies.py # FastAPI deps (auth, DB)
│   │   ├── exceptions.py  # Custom exceptions
│   │   └── logging.py     # Structlog config
│   ├── db/
│   │   ├── base.py        # SQLAlchemy declarative base
│   │   ├── session.py     # Async engine + session
│   │   └── seed.py        # Admin seeder
│   ├── models/            # SQLAlchemy ORM models
│   ├── schemas/           # Pydantic v2 request/response schemas
│   ├── services/          # Business logic layer
│   ├── repositories/      # Database query layer
│   ├── utils/             # Cloudinary, pagination helpers
│   └── main.py            # FastAPI app factory
├── alembic/               # Database migrations
├── tests/                 # Pytest test suite
├── .env.example
├── alembic.ini
├── Dockerfile
├── docker-compose.yml
└── requirements.txt
```
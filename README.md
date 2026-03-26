# Brandography Hub — Frontend

A complete React + Vite + Tailwind CSS frontend replica of the Brandography Hub marketing platform. Includes all public and private pages with mock data, protected routing, and a fully functional UI shell.

---

## 🚀 Tech Stack

| Technology | Purpose |
|---|---|
| React 18 | UI framework |
| Vite 5 | Build tool & dev server |
| React Router v6 | Client-side routing |
| Tailwind CSS 3 | All styling |
| Recharts | Dashboard & analytics charts |
| React Icons | Icon library |
| clsx | Conditional class merging |

---

## 📁 Project Structure

```
src/
├── context/          → AuthContext (mock auth via localStorage)
├── hooks/            → useAuth custom hook
├── mock/             → All mock data (projects, campaigns, analytics, team, assets, calendar)
├── components/
│   ├── layout/       → Sidebar, Topbar, AppLayout
│   ├── ui/           → Button, Input, Badge, Avatar, Card, Modal, Table, Spinner, EmptyState
│   ├── dashboard/    → StatCard, OverviewChart, ActivityFeed
│   ├── projects/     → ProjectCard
│   ├── campaigns/    → CampaignCard
│   └── auth/         → ProtectedRoute
├── pages/
│   ├── public/       → Landing, Login, Register, ForgotPassword, ResetPassword
│   └── private/      → Dashboard, Projects, Campaigns, Calendar, Assets, Analytics, Team, Settings, Profile
├── router/           → All routes (public + protected)
├── styles/           → index.css (Tailwind directives)
├── App.jsx
└── main.jsx
```

---

## ⚙️ Setup Instructions

### 1. Clone the repo
```bash
git clone https://github.com/Rana-Subhan-Dev/marketing-hub-frontend.git
cd marketing-hub-frontend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
```bash
cp .env.example .env
# Edit .env if needed (optional for mock-only mode)
```

### 4. Start the dev server
```bash
npm run dev
```

### 5. Open in browser
```
http://localhost:5173
```

---

## 🔐 Authentication

This is a **UI shell** — mock authentication is used. Any email and password will work on the login page.

**Demo credentials:**
- Email: `fipopurove@mailinator.com`
- Password: `Pa$$w0rd!`

Auth state is stored in `localStorage` and persists across page refreshes.

To connect a real backend, replace the `login()` function in `src/context/AuthContext.jsx`.

---

## 📳 Pages Included

### Public
| Route | Page |
|---|---|
| `/` | Landing page with hero, features, pricing, CTA |
| `/login` | Login form with demo credentials hint |
| `/register` | Registration form |
| `/forgot-password` | Forgot password with email sent state |
| `/reset-password` | Reset password form |

### Private (require auth)
| Route | Page |
|---|---|
| `/dashboard` | KPI cards, charts, activity feed, recent projects |
| `/projects` | Project grid with search & status filters |
| `/projects/:id` | Project detail — tasks, budget, team, progress |
| `/campaigns` | Campaign grid with filters |
| `/campaigns/:id` | Campaign detail — stats, chart, budget |
| `/calendar` | Monthly calendar with event dots |
| `/assets` | Asset library grid with type filters |
| `/analytics` | Full analytics — charts, KPIs, campaign table |
| `/team` | Team member cards |
| `/settings` | Profile / Account / Notifications tabs |
| `/profile` | User profile with activity and project summary |

---

## 🛠 Build for Production

```bash
npm run build
npm run preview
```

---

## 🔄 Connecting a Real Backend

1. Add your API base URL to `.env`:
   ```
   VITE_API_BASE_URL=https://your-api.com/api
   ```

2. Replace mock data imports in each page with API calls.

3. Replace the `login()` function in `src/context/AuthContext.jsx` with:
   ```js
   const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, { email, password });
   setUser(res.data.user);
   localStorage.setItem('bh_auth', JSON.stringify(res.data.user));
   ```

---

## 📝 Notes

- All mock data lives in `src/mock/` — structured to be easily swapped for real API responses
- Protected routes redirect to `/login` and preserve the originally requested URL
- Notification toggles in Settings use local component state (not persisted)
- Charts are powered by [Recharts](https://recharts.org)

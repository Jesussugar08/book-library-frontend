# Book Library Frontend

A React app for managing your personal book library. Built with Vite, React, Chakra UI, and React Router.

## Features

- User authentication (register / login)
- Protected routes with session persistence
- Dashboard with book cards and delete confirmation
- Add and edit books with optional cover upload
- Book detail with reading status, rating, and notes
- Reading statistics

## Prerequisites

- Node.js 18+
- [Book Library Backend](https://github.com) running locally (default port 5000)

## Setup

1. Install dependencies:

```bash
npm install
```

2. Copy the environment file and set your API URL:

```bash
cp .env.example .env
```

Edit `.env`:

```
VITE_API_URL=http://localhost:5000/api
```

3. Start the development server:

```bash
npm run dev
```

4. Open the URL shown in the terminal (usually `http://localhost:5173`).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## Project Structure

```
src/
├── components/     # Reusable UI (Navbar, AppLayout, BookCard, etc.)
├── contexts/       # AuthContext
├── hooks/          # useAuth
├── pages/          # Route pages
├── services/       # API client and service functions
├── utils/          # Helpers (apiError, bookStatus)
├── App.jsx         # Routes
├── main.jsx        # App entry
└── theme.js        # Chakra UI theme
```

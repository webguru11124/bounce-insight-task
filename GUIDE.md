# NASA Data Explorer

This repository contains a simple full-stack application for exploring data from [NASA's Open APIs](https://api.nasa.gov/). It is divided into a TypeScript React frontend and a TypeScript Node.js/Express backend.

The app demonstrates how to build an API layer around several NASA endpoints and provides a React interface with multiple pages for exploring data such as the Astronomy Picture of the Day, Mars rover photographs, image library search results and Near Earth Objects. The frontend uses **React Query**, **Tailwind CSS** and a small [shadcn/ui](https://ui.shadcn.com/) component setup for styling. A lightweight `fetchJSON` helper centralises fetch logic and error handling.

```
- backend/   # Express server that proxies NASA APIs
- frontend/  # React application built with Vite
- GUIDE.md   # Setup instructions
```

## Requirements

- Node.js (v18 or later is recommended)
- A NASA API key (create one for free at <https://api.nasa.gov/>)

## Setup

Clone the repository and install dependencies for both the backend and the frontend.

```bash
npm install --prefix backend
npm install --prefix frontend
```

Running these commands is required before any of the lint, test or build scripts. Without the installed packages, those scripts will fail.

If you cannot access npm in your environment, install the dependencies locally and copy them into the `backend` and `frontend` folders.

Create an environment file for the backend based on `.env.example` and insert your NASA API key:

```bash
cp backend/.env.example backend/.env
# edit backend/.env and set NASA_API_KEY
```

For the frontend you can optionally configure the backend URL in `.env`:

```bash
cp frontend/.env.example frontend/.env
# edit frontend/.env and set VITE_BACKEND_URL=http://localhost:4000
```

## Running the Application

### Backend

From the project root run:

```bash
npm run build --prefix backend
npm start --prefix backend
```

During development you can use nodemon to automatically restart:

```bash
npm run dev --prefix backend
```

The server starts on `http://localhost:4000` and exposes several endpoints used by the frontend:

- `GET /api/apod` - Astronomy Picture of the Day
- `GET /api/mars-photos?rover=curiosity&sol=1000` - Mars Rover photos
- `GET /api/search-images?q=moon` - Search NASA's image library
- `GET /api/neo?start_date=2024-01-01&end_date=2024-01-08` - Near Earth Objects feed (both dates are required)
- `GET /api/epic` - Latest EPIC images

### Frontend

In a separate terminal run:

```bash
npm run dev --prefix frontend
```

The React application will be available at `http://localhost:5173` (default Vite port). Requests to `/api/*` are proxied to the backend during development.

### Linting and Tests

Run linters for both packages:

```bash
npm run lint --prefix backend
npm run lint --prefix frontend
```

Run tests (covering all backend routes and UI components):

```bash
npm test --prefix backend
npm test --prefix frontend
```

### Features

- Modern UI built with Tailwind CSS and a minimal shadcn component library
- Data fetching powered by React Query with caching and refetch support
- Unified fetch helper for consistent error handling
- Configurable API base URL via `VITE_BACKEND_URL`
- Reusable React Query hooks for each NASA endpoint
- Interactive Mars rover photo search and NASA image search
- Bar chart visualisation of Near Earth Object diameters using Chart.js
- Gallery of latest EPIC Earth images
- Robust Express error and 404 handling
- Input validation on API endpoints
- Comprehensive Jest and Vitest tests

## Deployment

Both the frontend and backend can be deployed separately. Build the frontend for production with:

```bash
npm run build --prefix frontend
```

The output in `frontend/dist` can then be served by any static hosting service (Vercel, Netlify, etc.).

For the backend, deploy the contents of the `backend/` folder to your preferred Node hosting provider (Render, Heroku, etc.). Ensure that `NASA_API_KEY` is provided as an environment variable.

## License

This project is provided for the coding challenge and has no specific license.

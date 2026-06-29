# Travel to Spain

A tourism web app built with React that connects to the official Spanish government API (Dataestur/SEGITTUR) to display real, live tourism data.

**Live:** https://travel-to-spain.vercel.app

---

## What it does

- Displays real international tourist arrival data from Spain's official FRONTUR survey
- Shows trends, seasonality by month, top destinations by autonomous community, and the leading country of origin — all from live API data
- Individual pages for 7 destinations with unique visual identity per city
- Animated page transitions with Framer Motion

---

## Technical decisions worth noting

**Serverless proxy for CORS**
Dataestur's API doesn't include CORS headers, so direct browser requests are blocked. I built a serverless function (`/api/dataestur.js`) on Vercel that fetches the data server-side, parses the Excel response with SheetJS, and returns clean JSON to the frontend. This also adds a 1-hour edge cache to avoid hammering the government API.

**Excel parsing**
The API returns `.xlsx` files, not JSON. SheetJS converts the binary response into structured rows that React can consume directly.

**Dynamic column detection**
Rather than hardcoding column names, the proxy returns the column list alongside the data. This makes the integration resilient to schema changes on the government's end.

**Per-destination theming**
Each destination has its own accent color applied via inline CSS variables. The layout, typography and structure stay identical — only the color identity changes.

---

## Stack

- React 18 + Vite
- React Router v6
- Tailwind CSS
- Framer Motion
- Recharts
- SheetJS (xlsx)
- Vercel Serverless Functions

---

## Data source

All tourism statistics come from **Dataestur**, the open data platform of SEGITTUR (Sociedad Estatal para la Gestión de la Innovación y las Tecnologías Turísticas), under Spain's Ministry of Industry and Tourism.

API: `https://www.dataestur.es/API-SEGITTUR-v2/FRONTUR_DL`

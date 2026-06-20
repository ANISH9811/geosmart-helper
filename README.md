# 🏠 GeoSmart Helper

GeoSmart Helper is a geospatial web application built to help sourcing executives identify high-potential apartment locations through map-based visualization and proximity analysis.

Instead of simply displaying apartments on a map, the application provides contextual insights such as nearby apartment density, estimated travel times, transit accessibility, and an AI-inspired sourcing recommendation to support better decision-making.

---

## Features

### 🗺️ Interactive Map
- Visualizes apartment and locality data using Leaflet maps.
- Search apartments or localities directly from the search bar.
- Automatically centers the map on the selected result.

### 📍 Nearby Apartment Discovery
- Select any apartment to find nearby apartments within a configurable radius.
- Supports 1 km, 2 km, and 5 km search radius.
- Calculates:
  - Distance
  - Estimated walking time
  - Estimated bike travel time

### 🤖 AI Sourcing Insights
A rule-based recommendation engine provides an explainable sourcing score based on:
- Number of nearby apartments
- Average distance between apartments
- Apartment density within the selected radius

The score classifies locations into:
- High Priority
- Medium Priority
- Low Priority

This feature is intentionally implemented using transparent business rules so the recommendation logic remains explainable. In a production system, this could be replaced by an ML or LLM-powered recommendation engine trained on historical sourcing outcomes.

### 🚇 Transit Accessibility
Displays the closest metro and bus stops for the selected apartment, including:
- Distance
- Estimated walking time
- Estimated bike travel time

### 📊 Summary Dashboard
Provides quick metrics including:
- Number of nearby apartments
- Average distance
- Current search radius

### 📍 Current Location Support
Users can optionally use their browser's GPS location to quickly navigate the map to their current position before exploring nearby apartments.

---

## Product Thinking

The application is designed around a simple question:

> **"Should a sourcing executive prioritize visiting this apartment?"**

Instead of acting only as a visualization tool, GeoSmart Helper combines location intelligence and simple decision-support logic to help users evaluate sourcing opportunities more effectively.

---

## Tech Stack

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- React Leaflet
- Leaflet
- Supabase
- OpenStreetMap

---

## Project Structure

```
app/
components/
├── map/
├── search/
├── sidebar/
data/
hooks/
lib/
types/
utils/
```

---

## Getting Started

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

Open:

```
http://localhost:3000
```

---

## Environment Variables

Create a `.env.local` file in the project root and add the following variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

## Deployment

The application is deployed on Vercel.

**Live Demo**

> https://geosmart-helper.vercel.app/

Replace the above URL with your deployed application.

---

## Future Improvements

Some potential enhancements include:

- Heatmap visualization for apartment density
- Route and navigation support
- Historical sourcing analytics
- ML-based sourcing recommendations
- Real-time transit information
- Apartment clustering for dense regions

---

## Design Decisions

Some implementation decisions made during development:

- Used the Haversine formula for accurate distance calculations.
- Kept AI recommendations rule-based for transparency and explainability.
- Used client-side rendering for Leaflet compatibility with Next.js.
- Separated map, sidebar, and search functionality into reusable components for maintainability.

---

## Author

Developed as part of a Product Engineering assignment to demonstrate:

- Product thinking
- Geospatial visualization
- Frontend engineering
- Decision-support system design
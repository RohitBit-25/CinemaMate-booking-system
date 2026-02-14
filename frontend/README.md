# 🎥 CinemaMate Frontend

This directory contains the React.js frontend for **CinemaMate**, interacting with the Spring Boot backend and various AI APIs.

## 🌟 Key Components

### `ChatBot.js` (`src/components/`)
The brain of the AI Assistant. It handles:
- User input via text.
- Communication with **Groq API** (Llama 3 model) via `utils/groqService.js`.
- Displaying responses in a floating chat widget.

### `SeatPlan.js` (`src/components/`)
The core booking engine.
- Renders the interactive 3D seat layout.
- Handles seat selection logic (Silver/Gold/Premium).
- Calculates dynamic pricing (Base + Convenience + Tax).
- Generates the final Booking Object for the backend.

### `AdminDashboard.js` (`src/pages/`)
A protected route (`/admin`) for cinema management.
- Displays sales charts and statistics.
- Provides forms to add/edit movies.

## 🚀 scripts

In the project directory, you can run:

### `npm start`
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm run build`
Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

## 🔧 Environment Variables

Create a `.env` file in this directory:

```env
# Backend API
REACT_APP_BASE_URL=http://localhost:8081/api/v1/api/v1

# AI & Movie Data
REACT_APP_GROQ_API_KEY=your_groq_api_key_here
REACT_APP_OMDB_API_KEY=your_omdb_key_here
```

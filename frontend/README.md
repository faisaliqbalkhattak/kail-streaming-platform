# Sportz Frontend

This is the frontend interface for the Kail(sports) Streaming Platform - a real-time sports streaming application.

**Frontend Source**: Cloned from [JavaScript-Mastery-Pro/sportz-frontend](https://github.com/JavaScript-Mastery-Pro/sportz-frontend)

## Features

- Real-time match data display
- Live commentary feed
- WebSocket-based live updates
- Responsive React + TypeScript interface
- Sports match cards with live scores

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open http://localhost:3000 in your browser

## Configuration

The frontend connects to the backend API running on port 8000:
- REST API: `http://localhost:8000`
- WebSocket: `ws://localhost:8000`

These can be configured in `constants.ts` if needed.

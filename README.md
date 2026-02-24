#  Kail Streaming Platform

A **full-stack real-time sports streaming platform** built to demonstrate practical **WebSocket implementation** in a live sports commentary system. This project combines a custom-developed **Node.js backend** with a React frontend to create a **real-time sports data experience**.

## 🏗️ Architecture Overview

```
kail-streaming-platform/
├── backend/          # Custom Node.js API with WebSocket integration
└── frontend/         # React UI (adapted from external source)
```

## ⚡ Backend Features (Custom Development)

The **backend is entirely custom-built** to explore and reinforce **WebSocket technology** in a practical domain where **real-time communication excels** - sports commentary and live match updates.

###  **Core Technologies**
- **Node.js** with **Express.js** - RESTful API
- **WebSocket Server** (`ws` library) - Real-time bidirectional communication
- **Neon PostgreSQL** - Cloud database with **Drizzle ORM**
- **Arcjet** - Security layer with rate limiting and bot protection

###  **WebSocket Implementation**
```javascript
// Real-time sports commentary system
- /ws endpoint for WebSocket connections
- Match subscription/unsubscription system
- Live score updates pushed to connected clients
- Commentary feed streaming
- Connection management with heartbeat/pong
```

###  **API Endpoints**
- `GET /matches` - Fetch matches with pagination
- `POST /matches` - Create new match entries
- `GET /matches/:id/commentary` - Get match commentary
- `POST /matches/:id/commentary` - Add live commentary
- `WebSocket /ws` - Subscribe to real-time match updates

### 🛡️ **Security & Performance**
- **CORS** enabled for frontend communication
- **Arcjet protection** with rate limiting
- **Environment-based configuration** (development/production)
- **Input validation** using Zod schemas
- **Database migrations** with Drizzle Kit

###  **Database Schema**
```sql
matches:        id, homeTeam, awayTeam, sport, scores, status, timestamps
commentary:     id, matchId, actor, action, minute, content, timestamps
```

##  Frontend (External Source)

**Frontend Source**: Adapted from [JavaScript-Mastery-Pro/sportz-frontend](https://github.com/JavaScript-Mastery-Pro/sportz-frontend)

The frontend provides a **React + TypeScript interface** that connects to the custom backend via:
- **REST API** calls for match data
- **WebSocket connections** for live updates
- **Real-time commentary feed**
- **Live score updates**

##  Getting Started

### Prerequisites
- **Node.js** (v18+ recommended)
- **PostgreSQL database** (Neon cloud or local)

### Backend Setup
```bash
cd backend
npm install
npm run db:generate  # Generate database schema
npm run dev         # Start development server on port 8000
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev         # Start development server on port 3000
```

### Environment Configuration

**Backend (.env)**:
```env
DATABASE_URL=your_neon_postgresql_connection_string
ARCJET_KEY=your_arcjet_api_key  
ARCJET_ENV=development
PORT=8000
```

**Frontend (.env)**:
```env
VITE_API_BASE_URL=http://localhost:8000
VITE_WS_BASE_URL=ws://localhost:8000
```

##  **Why WebSockets for Sports Commentary?**

This project demonstrates **WebSocket technology** in one of its **most natural use cases** - **live sports updates**:

1. **Bi-directional Communication**: Clients can subscribe/unsubscribe to specific matches
2. **Low Latency**: Real-time commentary appears instantly across all connected clients  
3. **Event-Driven**: Score updates and commentary push immediately to subscribers
4. **Scalable**: Multiple clients can watch different matches simultaneously
5. **Persistent Connection**: No need for constant polling - events flow as they happen

### WebSocket Event Flow
```
Client connects to /ws
    ↓
Subscribe to match ID
    ↓  
Receive real-time:
- Score updates  
- Commentary events
- Match status changes
    ↓
Unsubscribe or disconnect
```

##  **Key Learning Outcomes**

Through this project, practical **WebSocket implementation** includes:

- **Connection lifecycle** management (connect, heartbeat, reconnect)
- **Subscription-based** message routing
- **Error handling** and **automatic reconnection**
- **Real-time data** synchronization across clients
- **Security considerations** for WebSocket endpoints
- **Performance optimization** for multiple concurrent connections

##  **Demo Features**

- **Live Match Cards**: Real-time score updates via WebSocket
- **Commentary Feed**: Streaming text updates as they happen
- **Connection Status**: Visual indicator of WebSocket connection state
- **Multi-Match Support**: Subscribe to multiple matches simultaneously
- **Responsive UI**: Works on desktop and mobile devices

##  **Development Notes**

This project specifically focuses on **backend WebSocket implementation** rather than frontend development. The React frontend serves as a **demonstration interface** for the real-time capabilities built into the **custom Node.js backend**.

**Core learning emphasis**: Building **scalable real-time applications** using **WebSockets** in a **practical sports domain** where **instant communication** is essential for user experience.

---

**Built to explore real-time web technologies in action** 
import express from 'express';
import { matchRouter } from './routes/matches.js';
import { attachWebSocketServer } from './ws/server.js';
import http from 'http';

const PORT = Number(process.env.PORT) || 8000;
const HOST = process.env.HOST || '0.0.0.0';

const app = express();
const server = http.createServer(app);
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to the Kail Streaming Platform API!' });
});

app.use('/matches', matchRouter);

const { broadcastMatchCreated } = attachWebSocketServer(server);
app.locals.broadcastMatchCreated = broadcastMatchCreated;

server.listen(PORT, HOST, () => {
    const url = HOST === '0.0.0.0' ? `http://localhost:${PORT}` : `http://${HOST}:${PORT}`;
    console.log(`Server is running at ${url}`);
    console.log(`WebSocket server is running at ${url.replace('http', 'ws')}/ws`);
});
import express from 'express';
import { matchRouter } from './routes/matches.js';

const PORT = 8000;
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to the Kail Streaming Platform API!' });
});

app.use('/matches', matchRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
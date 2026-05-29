import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import transmitHandler from './api/transmit.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Mock the Vercel API routing
app.post('/api/transmit', async (req, res) => {
  try {
    await transmitHandler(req, res);
  } catch (error) {
    console.error('Handler Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Local API backend running on http://localhost:${PORT}`);
});

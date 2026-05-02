import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Pool } from 'pg';
import { characterRouter } from './routes/characters.js';
import { analyzeRouter } from './routes/analyze.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
app.get('/api/health', async (_, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'ok', db: 'connected' });
  } catch {
    res.json({ status: 'ok', db: 'unavailable - using seed data' });
  }
});

app.use('/api/characters', characterRouter);
app.use('/api/analyze', analyzeRouter);

app.listen(process.env.PORT || 4000, () => console.log('API running on 4000'));

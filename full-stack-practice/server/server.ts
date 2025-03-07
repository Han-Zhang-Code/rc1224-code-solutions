import 'dotenv/config';
import pg from 'pg';
import express from 'express';
import { errorMiddleware } from './lib/index.js';
import cors from 'cors';

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const app = express();
app.use(cors());

app.use(express.json());

app.get('/api/products', async (req, res, next) => {
  try {
    const { rows } = await db.query('SELECT * FROM products');
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

app.get('/api/products/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { rows } = await db.query(
      'SELECT * FROM products WHERE "productId" = $1',
      [id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  console.log(`express server listening on port ${process.env.PORT}`);
});

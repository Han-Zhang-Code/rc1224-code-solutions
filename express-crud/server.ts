import express from 'express';
import pg from 'pg';
import { ClientError, errorMiddleware } from './lib/index.js';

const db = new pg.Pool({
  connectionString: 'postgres://dev:dev@localhost/studentGradeTable',
  // Allow non-SSL traffic to localhost
  ssl: { rejectUnauthorized: false },
});

const app = express();
app.use(express.json());

app.get('/api/grades', async (req, res, next) => {
  try {
    const result = await db.query('SELECT * FROM "grades"');
    if (result.rows.length === 0) {
      return res.sendStatus(200);
    }
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

app.get('/api/grades/:gradeId', async (req, res, next) => {
  try {
    const { gradeId } = req.params;
    if (!Number.isInteger(+gradeId) || +gradeId <= 0) {
      throw new ClientError(400, 'Invalid gradeId');
    }
    const result = await db.query(
      'SELECT * FROM "grades" WHERE "gradeId" = $1',
      [gradeId]
    );
    if (result.rows.length === 0) {
      return res.sendStatus(404);
    }
    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

app.post('/api/grades', async (req, res, next) => {
  try {
    console.log(req.body);
    const { name, course } = req.body;
    const score = Number(req.body.score);
    if (
      !name ||
      !course ||
      !Number.isInteger(score) ||
      score < 0 ||
      score > 100
    ) {
      throw new ClientError(
        400,
        'Invalid input, name , course and score are required'
      );
    }
    const result = await db.query(
      'INSERT INTO "grades" ("name", "course", "score") VALUES ($1, $2, $3) RETURNING *',
      [name, course, score]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

app.put('/api/grades/:gradeId', async (req, res, next) => {
  try {
    const { gradeId } = req.params;
    const { name, course } = req.body;
    const score = Number(req.body.score);
    if (
      !Number.isInteger(+gradeId) ||
      +gradeId <= 0 ||
      !name ||
      !course ||
      !Number.isInteger(score) ||
      score < 0 ||
      score > 100
    ) {
      throw new ClientError(
        400,
        'Invalid input, the id must be an positive integer,  name, course, or score are required and score must be a positive integer between 0 to 100'
      );
    }
    const result = await db.query(
      'UPDATE "grades" SET "name" = $1, "course" = $2, "score" = $3 WHERE "gradeId" = $4 RETURNING *',
      [name, course, score, gradeId]
    );
    if (result.rows.length === 0) {
      return res.sendStatus(404);
    }
    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

app.delete('/api/grades/:gradeId', async (req, res, next) => {
  try {
    const { gradeId } = req.params;
    if (!Number.isInteger(+gradeId) || +gradeId <= 0) {
      throw new ClientError(400, 'Invalid gradeId');
    }
    const result = await db.query(
      'DELETE FROM "grades" WHERE "gradeId" = $1 RETURNING *',
      [gradeId]
    );
    if (result.rows.length === 0) {
      return res.sendStatus(404);
    }
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

app.use(errorMiddleware);

app.listen(8080, () => {
  console.log('Server is running on port 8080');
});

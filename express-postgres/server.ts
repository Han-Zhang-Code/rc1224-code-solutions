import express from 'express';
import { ClientError, errorMiddleware } from './lib/index.js';
import pg from 'pg';

// only create ONE pool for your whole server.
// Note the database name at the end of the connection string.
const db = new pg.Pool({
  connectionString: 'postgres://dev:dev@localhost/pagila',
  ssl: {
    // Allow non-SSL traffic to localhost
    rejectUnauthorized: false,
  },
});

const app = express();

app.get('/api/actors', async (req, res, next) => {
  try {
    const sql = `
      select
        "actorId",
        "firstName",
        "lastName"
      from "actors";
    `;
    const result = await db.query(sql);
    const actors = result.rows;
    res.send(actors);
  } catch (err) {
    next(err);
  }
});

app.get('/api/films', async (req, res, next) => {
  try {
    const sql = `
      SELECT "filmId", "title", "replacementCost"
      FROM "films"
      ORDER BY "replacementCost" DESC;
    `;
    const result = await db.query(sql);
    res.send(result.rows);
  } catch (err) {
    next(err);
  }
});

app.get('/api/films/:filmId', async (req, res, next) => {
  try {
    const { filmId } = req.params;
    const sql = `
      SELECT "filmId", "title", "replacementCost"
      FROM "films"
      WHERE "filmId" = $1;
    `;
    const result = await db.query(sql, [filmId]);
    const film = result.rows[0];

    if (!film) {
      throw new ClientError(404, `Id ${filmId} not found`);
    }

    res.send(film);
  } catch (err) {
    next(err);
  }
});

app.put('/api/films/:filmId', async (req, res, next) => {
  try {
    const { filmId } = req.params;
    const { title } = req.query;

    if (!title) {
      throw new ClientError(400, 'Title is required');
    }

    const sql = `
      UPDATE "films"
      SET "title" = $1
      WHERE "filmId" = $2
      RETURNING "filmId", "title";
    `;
    const result = await db.query(sql, [title, filmId]);
    const updatedFilm = result.rows[0];

    if (!updatedFilm) {
      throw new ClientError(404, `Film with ID ${filmId} not found`);
    }

    res.send(updatedFilm);
  } catch (err) {
    next(err);
  }
});

app.use(errorMiddleware);

app.listen(8080, () => {
  console.log('listening on port 8080');
});

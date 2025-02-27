import express from 'express';

const app = express();

app.use((req, res, next) => {
  console.log('Hello, World!');
  console.log('The date is', new Date());
  next();
});

app.get('/', (req, res) => {
  res.send('Welcome to the homepage!');
});

app.get('/notes', (req, res) => {
  res.send('Here are your notes.');
});

app.post('/notes/:noteId', (req, res) => {
  const { noteId } = req.params;
  res.send(`Note created with ID: ${noteId}`);
});

app.use((req, res) => {
  res.status(404).send('404 NOT FOUND');
});

app.listen(8080, () => {
  console.log('Express server listening on port 8080');
});

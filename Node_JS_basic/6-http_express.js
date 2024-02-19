/**
 * Starts an Express server listening on the given port.
 * Logs a message when the server starts.
 */
const express = require('express');

const app = express();
const port = 1245;

app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

/**
 * Logs a message indicating the Express server has started listening on the given port.
 */
app.listen(port, () => {
  console.log('Server is running');
});

module.exports = app;

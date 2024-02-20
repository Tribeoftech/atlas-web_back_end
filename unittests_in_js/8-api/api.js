/**
 * Exports an Express app that starts an API server on the given port.
 * Provides a root route that returns a welcome message.
 */
const express = require("express");
const app = express();
const port = 7865;
app.listen(port, () => {
  console.log(`API available on localhost port ${port}`);
});
app.get("/", (req, res) => {
  res.send(`Welcome to the payment system`);
});
module.exports = app;

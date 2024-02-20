/**
 * Defines an Express server with some API routes:
 * - GET / - Returns a welcome message
 * - GET /cart/:id - Returns payment info for a cart by ID, returns 404 if ID is invalid
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
app.get("/cart/:id", (req, res) => {
  try {
    req.params.id = Number(req.params.id);
    if (isNaN(req.params.id)) {
      throw new Error();
    }
    res.send(`Payment methods for cart ${req.params.id}`);
  } catch (e) {
    res.sendStatus(404);
  }
});
module.exports = app;

/**
 * Defines an Express.js server with the following routes:
 *
 * - GET / - Returns a welcome message
 * - GET /cart/:id - Returns payment info for a cart with the given ID
 * - GET /available_payments - Returns available payment methods
 * - POST /login - Logs in a user and returns a welcome message
 *
 * Exports the app instance to allow starting the server in another module.
 */
const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Welcome to the payment system");
});

app.get("/cart/:id(\\d+)", (req, res) => {
  const idToSend = req.params.id;
  res.status(200).send(`Payment methods for cart ${idToSend}`);
});

app.get("/available_payments", (req, res) => {
  res.status(200).json({
    payment_methods: {
      credit_cards: true,
      paypal: false,
    },
  });
});

app.post("/login", (req, res) => {
  const userName = req.body.userName;
  res.status(200).send(`Welcome ${userName}`);
});

app.listen(7865, () => {
  console.log("API available on localhost port 7865");
});

module.exports = app;

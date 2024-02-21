/**
 * Connects to Redis and handles connection events.
 * Creates a Redis client and connects to the server.
 * Logs an error if the connection fails.
 * Logs a message when the connection succeeds.
 */
const redis = require("redis");
const client = redis.createClient();

(async () => {
  client
    .on("error", (err) => {
      console.log("Redis client not connected to the server: " + err);
    })
    .on("ready", () => {
      console.log(`Redis client connected to the server`);
    });

  await client.connect();
})();

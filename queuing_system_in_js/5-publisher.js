/**
 * Publishes messages to a Redis channel at different intervals using setTimeout.
 *
 * - Imports the redis client module.
 * - Creates a new Redis client instance.
 * - Connects the client.
 * - Defines a publishMessage function that publishes a message
 *   to the 'holberton school channel' after a delay.
 * - Calls publishMessage a few times with different messages and delays
 *   to publish sample messages.
 */ const redis = require("redis");
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

const publishMessage = (message, time) => {
  setTimeout(() => {
    console.log(`About to send ${message}`);
    client.publish("holberton school channel", message);
  }, time);
};

publishMessage("Holberton Student #1 starts course", 100);
publishMessage("Holberton Student #2 starts course", 200);
publishMessage("KILL_SERVER", 300);
publishMessage("Holberton Student #3 starts course", 400);

/**
 * Creates a Redis client, connects to the server,
 * subscribes to a channel, and handles incoming messages.
 * Exits when it receives the 'KILL_SERVER' message on the channel.
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

client.subscribe("holberton school channel");

client.on("message", (channel, message) => {
  console.log(`${message}`);
  if (message === "KILL_SERVER") {
    client.unsubscribe(channel);
    process.exit(0);
  }
});

/**
 * Imports the redis module and creates a client instance.
 * Connects the client to the Redis server.
 *
 * Defines a hash key 'HolbertonSchools' and hash values mapping
 * city names to student counts. Uses Redis hSet command to set
 * the hash field-value pairs.
 *
 * Gets all fields and values from the hash using hGetAll, and logs
 * the result.
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

const hashKey = "HolbertonSchools";
const hashValues = {
  Portland: "100",
  Seattle: "80",
  "New York": "20",
  Bogota: "20",
  Cali: "40",
  Paris: "2",
};
for (let key in hashValues) {
  const hSet = client
    .hSet(hashKey, hashValues, hashValues[key], redis.print, (err, reply) => {
      if (err) {
        console.log(err);
      }
      return reply;
    })
    .then((res) => {
      console.log(`Reply: ${res + 1}`);
    });
}
/**
 * Gets all fields and values from the 'HolbertonSchools' hash
 * using the Redis hGetAll command.
 *
 * Logs any errors.
 *
 * Returns a promise that resolves with the result of hGetAll.
 */
const hGetAll = client
  .hGetAll(hashKey, (err, reply) => {
    if (err) {
      console.log(err);
    }
    return reply;
  })
  .then((res) => {
    console.log(res);
  });

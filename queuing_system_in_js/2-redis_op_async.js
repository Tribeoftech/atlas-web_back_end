/**
 * Connects to Redis server and exposes functions to set & get values from Redis store
 * Creates Redis client and connects to Redis server
 * Defines callback handlers for client connection events
 * Exposes setNewSchool and displaySchoolValue functions to set & get values in Redis with school name as key
 * setNewSchool - Sets value for provided school name in Redis
 * displaySchoolValue - Gets & displays value for provided school name from Redis
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

function setNewSchool(schoolName, value) {
  const setKey = client.set(schoolName, value, (err, reply) => {
    if (err) {
      console.log(err);
    }
    return reply;
  });
  setKey.then((res) => {
    console.log(`Result: ${res.toString()}`);
  });
}

async function displaySchoolValue(schoolName) {
  const getKey = client.get(schoolName, (err, reply) => {
    if (err) {
      console.log(err);
    }
    return reply;
  });
  await getKey.then((res) => {
    console.log(res);
  });
}

displaySchoolValue("Holberton");
setNewSchool("HolbertonSanFrancisco", "100");
displaySchoolValue("HolbertonSanFrancisco");

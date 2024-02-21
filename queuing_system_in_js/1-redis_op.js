/**
 * Connects to Redis server and exports functions to set and get values from Redis store
 * setNewSchool(schoolName, value) - Sets a new key-value pair in Redis where schoolName is the key and value is the value
 * displaySchoolValue(schoolName) - Gets the value for the given schoolName key in Redis and prints it
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

function displaySchoolValue(schoolName) {
  const getKey = client.get(schoolName, (err, reply) => {
    if (err) {
      console.log(err);
    }
    return reply;
  });
  getKey.then((res) => {
    console.log(res);
  });
}

displaySchoolValue("Holberton");
setNewSchool("HolbertonSanFrancisco", "100");
displaySchoolValue("HolbertonSanFrancisco");

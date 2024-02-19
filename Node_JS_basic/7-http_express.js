/**
 * Imports Express and the countStudents module.
 * Creates an Express app instance and sets the port.
 */
const express = require('express');
const countStudents = require('./3-read_file_async');

const app = express();
const port = 1245;

app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

/**
 * Handles GET requests to /students route.
 * Counts students from a file asynchronously using countStudents module.
 * Writes response with number of students and lists by major.
 * Handles errors by writing error message.
 */ app
  .get('/students', async (req, res) => {
    await countStudents(process.argv[2])
      .then((data) => {
        res.write('This is the list of our students\n');
        res.write(`Number of students: ${data.CS.num + data.SWE.num}\n`);
        res.write(
          `Number of students in CS: ${data.CS.num}. List: ${data.CS.list}\n`,
        );
        res.write(
          `Number of students in SWE: ${data.SWE.num}. List: ${data.SWE.list}`,
        );
        res.end();
      })
      .catch((err) => {
        res.write('This is the list of our students\n');
        res.end(err.message);
      });
  })
  .listen(port);

module.exports = app;

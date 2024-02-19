/**
 * Exports an HTTP server app that handles requests and responses.
 * 
 * Creates the HTTP server with http.createServer, handling requests and responses.
 * Implements route handling for '/' and '/students' paths.
 * Calls async utility functions like countStudents() to get data.
 * Writes responses and ends connections based on route and request.
 */
const http = require('http');
const countStudents = require('./3-read_file_async');

/**
 * Creates an HTTP server using http.createServer.
 * Handles requests based on URL:
 * - '/' responds with a simple text message
 * - '/students' makes an async call to get student data,
 *   writes a response with the data, and ends the response.
 * - Other URLs are not handled.
 */
const app = http
  .createServer(async (req, res) => {
    if (req.method === "GET") {
      if (req.url === "/") {
        res.end("Hello Holberton School!");
      } else if (req.url === "/students") {
        await countStudents(process.argv[2])
          .then((data) => {
            res.write("This is the list of our students\n");
            res.write(`Number of students: ${data.CS.num + data.SWE.num}\n`);
            res.write(
              `Number of students in CS: ${data.CS.num}. List: ${data.CS.list}\n`
            );
            res.write(
              `Number of students in SWE: ${data.SWE.num}. List: ${data.SWE.list}`
            );
            res.end();
          })
          .catch((err) => {
            res.write("This is the list of our students\n");
            res.end(err.message);
          });
      }
    }
  })
  .listen(1245);

module.exports = app;
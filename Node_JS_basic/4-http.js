/**
 * Creates an HTTP server that responds with 'Hello Holberton School!'
 * when requests are received on port 1245.
 */
const http = require('http');

const app = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end('Hello Holberton School!');
}).listen(1245);

module.exports = app;
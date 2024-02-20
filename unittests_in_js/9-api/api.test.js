/**
 * Test suite for index page for api.js
 * Checks for correct HTTP status code and response body
 */

/**
 * Test suite for cart page for api.js
 * Checks for correct HTTP status codes and responses
 * when :id is valid vs invalid
 */
const { expect } = require("chai");
const request = require("request");

describe("Test suite for index page for api.js", () => {
  it("Checks for correct HTTP status code", (done) => {
    request("http://localhost:7865", (error, response, body) => {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });
  it("Checks for correct result for index page", (done) => {
    request("http://localhost:7865", (error, response, body) => {
      expect(body).to.equal("Welcome to the payment system");
      done();
    });
  });
});

describe("Test suite for cart page for api.js", () => {
  it("Checks for correct HTTP status code when :id is a number", (done) => {
    request("http://localhost:7865/cart/1", (error, response, body) => {
      expect(response.statusCode).to.equal(200);
      expect(body).to.equal("Payment methods for cart 1");
      done();
    });
  });
  it("Checks for correct HTTP status code when :id is not a number", (done) => {
    request("http://localhost:7865/cart/a", (error, response, body) => {
      expect(response.statusCode).to.equal(404);
      expect(body).to.equal("Not Found");
      done();
    });
  });
});

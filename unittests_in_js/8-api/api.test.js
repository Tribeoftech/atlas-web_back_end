/**
 * Test suite for testing the index page API.
 * Checks for correct HTTP status code and response body.
 */
const { expect } = require("chai");
const mocha = require("mocha");
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

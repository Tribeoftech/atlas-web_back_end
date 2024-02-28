/**
 * Tests for index and cart endpoints.
 *
 * describe() blocks are used to group related tests.
 *
 * The 'Index page' describe() block contains a test for the
 * index endpoint. It makes a GET request and asserts
 * the response status code and body.
 *
 * The 'Cart page' describe() block contains tests for the
 * cart endpoint.
 */
const request = require("request");
const { expect } = require("chai");

describe("Index and Cart Endpoints", function () {
  describe("Index page", function () {
    it("should return 200 OK with a welcome message", function (done) {
      request.get("http://localhost:7865", function (error, response, body) {
        expect(response.statusCode).to.equal(200);
        expect(body).to.equal("Welcome to the payment system");
        done();
      });
    });
  });

        /**
   * Tests for the '/cart/:id' endpoint.
   *
   * The first test checks that a valid numeric cart ID
   * returns 200 OK with the expected message.
   *
   * The second test checks that a non-numeric cart ID
   * returns 404 Not Found.
   */
  describe("Cart page", function () {
    it("should return 200 and the correct message for a numeric ID", function (done) {
      request.get(
        "http://localhost:7865/cart/12",
        function (error, response, body) {
          expect(response.statusCode).to.equal(200);
          expect(body).to.equal("Payment methods for cart 12");
          done();
        }
      );
    });

    it("should return 404 for a non-numeric ID", function (done) {
      request.get(
        "http://localhost:7865/cart/hello",
        function (error, response, body) {
          expect(response.statusCode).to.equal(404);
          done();
        }
      );
    });
  });
});

/**
 * Tests for the '/available_payments' and '/login' endpoints.
 *
 * The first test checks that '/available_payments' returns
 * 200 with the expected payment methods object.
 *
 * The second test checks that '/login' returns 200 and
 * welcomes the user when a valid username is provided.
 */
describe("Available Payments and Login Endpoints", function () {
  describe("Available payment methods", function () {
    it("should return 200 with payment methods object", function (done) {
      request.get(
        "http://localhost:7865/available_payments",
        function (error, response, body) {
          expect(response.statusCode).to.equal(200);
          expect(JSON.parse(body)).to.deep.equal({
            payment_methods: {
              credit_cards: true,
              paypal: false,
            },
          });
          done();
        }
      );
    });
  });

  describe("Login functionality", function () {
    it("should welcome a user when username is provided", function (done) {
      const options = {
        url: "http://localhost:7865/login",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName: "Betty" }),
      };

      request(options, function (error, response, body) {
        expect(response.statusCode).to.equal(200);
        expect(body).to.equal("Welcome Betty");
        done();
      });
    });
  });
});

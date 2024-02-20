/**
 * Tests that getPaymentTokenFromApi returns a Promise that resolves
 * with expected data when passed true.
 */
const getPaymmentTokenFromApi = require("./6-payment_token");
const chai = require("chai");

describe("Test suite", function () {
  it("Tests that getPaymentTokenFromApi returns a new Promise", function (done) {
    getPaymmentTokenFromApi(true).then(function (result) {
      chai.expect(result.data).to.equal("Successful response from the API");
      done();
    });
  });
});

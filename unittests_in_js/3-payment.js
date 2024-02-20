/**
 * Sends a payment request to the API.
 *
 * Calculates the total payment amount by summing the totalAmount and totalShipping.
 * Logs the total to the console.
 */
const Utils = require("./utils");

function sendPaymentRequestToApi(totalAmount, totalShipping) {
  const result = Utils.calculateNumber("SUM", totalAmount, totalShipping);
  console.log(`The total is: ${result}`);
}

module.exports = sendPaymentRequestToApi;

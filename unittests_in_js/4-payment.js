/**
 * Sends a payment request to the API.
 *
 * @param {number} totalAmount - The total order amount.
 * @param {number} totalShipping - The total shipping amount.
 * @returns {number} The calculated total amount including shipping.
 */
const Utils = require("./utils");

function sendPaymentRequestToApi(totalAmount, totalShipping) {
  const result = Utils.calculateNumber("SUM", totalAmount, totalShipping);
  console.log(`The total is: ${result}`);
}

module.exports = sendPaymentRequestToApi;

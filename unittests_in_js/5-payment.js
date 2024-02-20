const Utils = require('./utils');


/**
 * Sends a payment request to the API.
 *
 * Calculates the total payment amount by summing the totalAmount
 * and totalShipping parameters. Logs the total to the console.
 */
function sendPaymentRequestToApi(totalAmount, totalShipping) {
  const result = Utils.calculateNumber("SUM", totalAmount, totalShipping);
  console.log(`The total is: ${result}`);
}

module.exports = sendPaymentRequestToApi;

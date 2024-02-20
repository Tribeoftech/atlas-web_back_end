/**
 * Retrieves a payment token from an external API.
 *
 * @param {boolean} success - Whether the API request succeeded.
 * @returns {Promise} A promise that resolves with the API response.
 */
function getPaymentTokenFromAPI(success) {
  if (success) {
    return new Promise((Resolve, reject) => {
      Resolve({ data: "Successful response from the API" });
    });
  }
}

module.exports = getPaymentTokenFromAPI;

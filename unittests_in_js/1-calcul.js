/**
 * Calculates a number based on the provided type and operands.
 *
 * @param {string} type - The type of calculation to perform. Can be 'SUM', 'SUBTRACT', or 'DIVIDE'.
 * @param {number} a - The first operand.
 * @param {number} b - The second operand.
 * @returns {number} The result of the calculation, rounded to an integer. Returns 'Error' if division by zero.
 */
const calculateNumber = (type, a, b) => {
  if (type === "SUM") {
    return Math.round(a) + Math.round(b);
  }
  if (type === "SUBTRACT") {
    return Math.round(a) - Math.round(b);
  }
  if (type === "DIVIDE") {
    a = Math.round(a);
    b = Math.round(b);
    if (b === 0) {
      return "Error";
    }
    return a / b;
  }
};

module.exports = calculateNumber;

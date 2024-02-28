/**
 * Reads the student data from the provided file path
 * and returns a promise that resolves to an object mapping
 * fields to arrays of first names.
 *
 * @param {string} filePath - The path to the file containing the student data
 * @returns {Promise<Object>} - Promise resolving to the mapped student data
 */
const fs = require("fs").promises;

/**
 *
 * @param {string} filePath
 * @returns {Promise<Object>}
 */
async function readDatabase(filePath) {
  try {
    const data = await fs.readFile(filePath, "utf8");
    const lines = data.trim().split("\n");
    const students = lines.slice(1);

    /**
     * Parses the student data from the database file into an object indexed by field.
     *
     * @param {string} filePath - The path to the database file
     * @returns {Promise<Object>} - Promise resolving to the parsed student data object
     */
    const studentsByField = {};

    students.forEach((studentLine) => {
      const [firstName, , , field] = studentLine.split(",");
      if (field) {
        if (!studentsByField[field]) {
          studentsByField[field] = [];
        }
        studentsByField[field].push(firstName);
      }
    });

    return Promise.resolve(studentsByField);
  } catch (error) {
    return Promise.reject(new Error("Cannot load the database"));
  }
}

export default readDatabase;

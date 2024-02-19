const fs = require('fs');
/**
 * Counts the number of students in different majors by reading a CSV file.
 *
 * Reads the student data file, counts the total number of students, and the number of
 * students in CS and SWE majors. Also extracts the list of names of students in CS and SWE.
 *
 * @param {string} path - The path to the CSV file containing the student data
 * @throws {Error} If the file cannot be read
 */
function countStudents(path) {
  let fileData;
  try {
    fileData = fs.readFileSync(path, "utf8");
  } catch (err) {
    throw new Error("Cannot load the database");
  }
  console.log(`Number of students: ${fileData.split("\n").length - 2}`);
  const CS = fileData.split("\n").filter((line) => line.includes("CS")).length;
  const SWE = fileData
    .split("\n")
    .filter((line) => line.includes("SWE")).length;
  let CSstudents = fileData
    .split("\n")
    .filter((line) => line.includes("CS"))
    .map((line) => line.split(",")[0]);
  let SWEstudents = fileData
    .split("\n")
    .filter((line) => line.includes("SWE"))
    .map((line) => line.split(",")[0]);
  CSstudents = CSstudents.join(", ");
  SWEstudents = SWEstudents.join(", ");
  console.log(`Number of students in CS: ${CS}. List: ${CSstudents}`);
  console.log(`Number of students in SWE: ${SWE}. List: ${SWEstudents}`);
}

module.exports = countStudents;

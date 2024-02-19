const fs = require('fs').promises;
/**
 * Counts students from a CSV file asynchronously.
 * Reads the file, gets the number of students.
 * Gets unique fields of study, number of students per field.
 * Returns object with fields and student counts.
 */
const countStudents = async (path) => {
  let fileData;
  try {
    fileData = await fs.readFile(path, "utf8");
  } catch (err) {
    throw new Error("Cannot load the database");
  }
  console.log(`Number of students: ${fileData.split("\n").length - 2}`);
  const fields = fileData.split("\n").map((line) => line.split(",")[3]);
  const uniqueFields = [...new Set(fields)];
  const dict = {};
  for (let i = 0; i < uniqueFields.length; i += 1) {
    const studentsInField = fileData
      .split("\n")
      .filter((line) => line.includes(uniqueFields[i])).length;
    const studentsInFieldList = fileData
      .split("\n")
      .filter((line) => line.includes(uniqueFields[i]))
      .map((line) => line.split(",")[0]);
    const studentsInFieldListString = studentsInFieldList.join(", ");
    console.log(
      `Number of students in ${uniqueFields[i]}: ${studentsInField}. List: ${studentsInFieldListString}`
    );
    dict[uniqueFields[i]] = {
      num: studentsInField,
      list: studentsInFieldListString,
    };
  }
  console.log(dict);
  return dict;
};

module.exports = countStudents;
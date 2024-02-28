/**
 * Gets all students from the database and returns them in the response.
 * Sends total student counts by major and a list of names.
 * Handles any errors loading the database.
 */

/**
 * Gets students for the requested major from the database and returns them.
 * Validates that major is 'CS' or 'SWE'.
 * Handles any errors loading the database.
 */
import readDatabase from "../utils";

class StudentsController {
  static getAllStudents(req, res) {
    readDatabase(process.argv[2])
      .then((data) => {
        res.status(200).send(`This is the list of our students
Number of students in CS: ${data.CS.length}. List: ${data.CS.join(", ")}
Number of students in SWE: ${data.SWE.length}. List: ${data.SWE.join(", ")}`);
      })
      .catch(() => {
        res.status(500).send("Cannot load the database");
      });
  }

  static getAllStudentsByMajor(req, res) {
    readDatabase(process.argv[2])
      .then((data) => {
        if (req.params.major === "CS") {
          res.status(200).send(`List: ${data.CS.join(", ")}`);
        } else if (req.params.major === "SWE") {
          res.status(200).send(`List: ${data.SWE.join(", ")}`);
        } else {
          res.status(500).send("Major parameter must be CS or SWE");
        }
      })
      .catch(() => {
        res.status(500).send("Cannot load the database");
      });
  }
}

module.exports = StudentsController;

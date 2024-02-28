/**
 * Defines routes and maps them to controller methods.
 * Exports router instance to be used by app.
 */
import AppController from "../controllers/AppController";
import StudentsController from "../controllers/StudentsController";

const express = require("express");

const router = express.Router();
router.get("/", AppController.getHomepage);

router.get("/students", StudentsController.getAllStudents);
router.get("/students/:major", StudentsController.getAllStudentsByMajor);

module.exports = router;

const express = require("express");
const router = express.Router();
const studentController = require("../controller/studentController");

// => For Signup
router.post("/signup" , studentController.studentSignup)

// => For Get all Students
router.get("/all" , studentController.getAllStudents)

// => For Students login
router.post("/login" , studentController.loginStudentApi)


module.exports = router;
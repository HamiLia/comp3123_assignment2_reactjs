const express = require("express");
const router = express.Router();
const { body, param, query } = require("express-validator");
const { handleValidation } = require("../middleware/validate");
const employeeController = require("../controllers/employeeController");

router.get(
  "/searchEmployees",
  [
    query("department").optional().isString(),
    query("position").optional().isString(),
  ],
  handleValidation,
  employeeController.searchEmployees
);

router.get("/employees", employeeController.listEmployees);

router.post(
  "/employees",
  [
    body("first_name").notEmpty(),
    body("last_name").notEmpty(),
    body("email").isEmail(),
    body("position").notEmpty(),
    body("salary").isNumeric(),
    body("date_of_joining").isISO8601(),
    body("department").notEmpty(),
  ],
  handleValidation,
  employeeController.createEmployee
);

router.get(
  "/employees/:eid",
  [param("eid").notEmpty()],
  handleValidation,
  employeeController.getEmployee
);

router.put(
  "/employees/:eid",
  [param("eid").notEmpty()],
  handleValidation,
  employeeController.updateEmployee
);

router.delete(
  "/employees",
  [query("eid").notEmpty()],
  handleValidation,
  employeeController.deleteEmployee
);

module.exports = router;

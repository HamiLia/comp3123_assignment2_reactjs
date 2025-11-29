// backend/routes/employeeRoutes.js
const express = require("express");
const router = express.Router();
const { body, param, query } = require("express-validator");
const { handleValidation } = require("../middleware/validate");
const employeeController = require("../controllers/employeeController");

// ✅ 직원 검색 (department, position)
//    GET /api/v1/emp/searchEmployees?department=xxx&position=yyy
router.get(
  "/searchEmployees",
  [
    query("department").optional().isString(),
    query("position").optional().isString(),
  ],
  handleValidation,
  employeeController.searchEmployees
);

// 전체 직원 목록
router.get("/employees", employeeController.listEmployees);

// 직원 생성
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

// 단일 직원 조회
router.get(
  "/employees/:eid",
  [param("eid").notEmpty()],
  handleValidation,
  employeeController.getEmployee
);

// 직원 수정
router.put(
  "/employees/:eid",
  [param("eid").notEmpty()],
  handleValidation,
  employeeController.updateEmployee
);

// 직원 삭제 (쿼리스트링 eid 사용)
router.delete(
  "/employees",
  [query("eid").notEmpty()],
  handleValidation,
  employeeController.deleteEmployee
);

module.exports = router;

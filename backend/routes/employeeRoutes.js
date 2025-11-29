// backend/routes/employeeRoutes.js
const express = require("express");
const router = express.Router();

const employeeController = require("../controllers/employeeController");

// ================== multer 설정 (파일 업로드) ==================
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// backend 루트의 uploads 폴더 절대경로
const uploadPath = path.join(__dirname, "..", "uploads");

// 폴더 없으면 자동 생성
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
  console.log("Created uploads folder at:", uploadPath);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  },
});

const upload = multer({ storage });
// ===============================================================

// 직원 목록
router.get("/employees", employeeController.listEmployees);

// 직원 생성 (프로필 사진 포함 가능, validation은 컨트롤러/프론트에서 처리)
router.post(
  "/employees",
  upload.single("profileImage"), // multipart 처리 + 파일 저장
  employeeController.createEmployee
);

// 단일 직원 조회
router.get("/employees/:eid", employeeController.getEmployee);

// 직원 수정 (프로필 사진 변경 가능)
router.put(
  "/employees/:eid",
  upload.single("profileImage"),
  employeeController.updateEmployee
);

// 직원 삭제 (쿼리스트링 eid)
router.delete("/employees", employeeController.deleteEmployee);

module.exports = router;

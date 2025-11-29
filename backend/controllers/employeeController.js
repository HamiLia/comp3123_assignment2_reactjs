// backend/controllers/employeeController.js
const mongoose = require("mongoose");
const Employee = require("../models/Employee");

// 직원 목록 조회
exports.listEmployees = async (req, res) => {
  try {
    const emps = await Employee.find({});
    const out = emps.map((e) => ({
      employee_id: e._id,
      first_name: e.first_name,
      last_name: e.last_name,
      email: e.email,
      position: e.position,
      salary: e.salary,
      date_of_joining: e.date_of_joining,
      department: e.department,
    }));
    return res.status(200).json(out);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, message: "Server error" });
  }
};

// 직원 생성
exports.createEmployee = async (req, res) => {
  try {
    const payload = req.body;
    const emp = new Employee(payload);
    await emp.save();
    return res.status(201).json({
      message: "Employee created successfully.",
      employee_id: emp._id,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, message: "Server error" });
  }
};

// 단일 직원 조회
exports.getEmployee = async (req, res) => {
  try {
    const { eid } = req.params;
    if (!mongoose.Types.ObjectId.isValid(eid)) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid employee id" });
    }

    const emp = await Employee.findById(eid);
    if (!emp) {
      return res
        .status(404)
        .json({ status: false, message: "Employee not found" });
    }

    return res.status(200).json({
      employee_id: emp._id,
      first_name: emp.first_name,
      last_name: emp.last_name,
      email: emp.email,
      position: emp.position,
      salary: emp.salary,
      date_of_joining: emp.date_of_joining,
      department: emp.department,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, message: "Server error" });
  }
};

// 직원 수정
exports.updateEmployee = async (req, res) => {
  try {
    const { eid } = req.params;
    if (!mongoose.Types.ObjectId.isValid(eid)) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid employee id" });
    }

    const updates = req.body;
    updates.updated_at = new Date();

    const updated = await Employee.findByIdAndUpdate(eid, updates, {
      new: true,
    });

    if (!updated) {
      return res
        .status(404)
        .json({ status: false, message: "Employee not found" });
    }

    return res
      .status(200)
      .json({ message: "Employee details updated successfully." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, message: "Server error" });
  }
};

// 직원 삭제
exports.deleteEmployee = async (req, res) => {
  try {
    const { eid } = req.query;
    if (!eid) {
      return res
        .status(400)
        .json({ status: false, message: "Missing eid query param" });
    }

    if (!mongoose.Types.ObjectId.isValid(eid)) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid employee id" });
    }

    const deleted = await Employee.findByIdAndDelete(eid);
    if (!deleted) {
      return res
        .status(404)
        .json({ status: false, message: "Employee not found" });
    }

    return res.status(204).send();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, message: "Server error" });
  }
};

exports.searchEmployees = async (req, res) => {
  try {
    const { department, position } = req.query;

    // 둘 다 없으면 에러
    if (!department && !position) {
      return res.status(400).json({
        status: false,
        message: "department 또는 position 중 하나는 있어야 합니다.",
      });
    }

    const filter = {};

    if (department) {
      filter.department = { $regex: new RegExp(department, "i") };
    }

    if (position) {
      filter.position = { $regex: new RegExp(position, "i") };
    }

    const emps = await Employee.find(filter);

    const out = emps.map((e) => ({
      employee_id: e._id,
      first_name: e.first_name,
      last_name: e.last_name,
      email: e.email,
      position: e.position,
      salary: e.salary,
      date_of_joining: e.date_of_joining,
      department: e.department,
    }));

    return res.status(200).json(out);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, message: "Server error" });
  }
};

// backend/controllers/employeeController.js
const mongoose = require("mongoose");
const Employee = require("../models/Employee");

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
      profile_image: e.profile_image,
    }));
    return res.status(200).json(out);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, message: "Server error" });
  }
};

exports.createEmployee = async (req, res) => {
  try {
    const payload = { ...req.body };

    // 문자열로 온 salary -> 숫자로
    if (payload.salary) {
      payload.salary = Number(payload.salary);
    }

    // 날짜 문자열(YYYY-MM-DD)은 mongoose가 자동으로 Date로 변환해줌
    // 파일 업로드된 경우 profile_image 경로 세팅
    if (req.file) {
      payload.profile_image = `/uploads/${req.file.filename}`;
    }

    const emp = new Employee(payload);
    await emp.save();

    return res.status(201).json({
      message: "Employee created successfully.",
      employee_id: emp._id,
    });
  } catch (err) {
    console.error("createEmployee error:", err);
    return res.status(500).json({ status: false, message: "Server error" });
  }
};

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
      profile_image: emp.profile_image,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, message: "Server error" });
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    const { eid } = req.params;
    if (!mongoose.Types.ObjectId.isValid(eid)) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid employee id" });
    }

    const updates = { ...req.body };

    if (updates.salary) {
      updates.salary = Number(updates.salary);
    }

    if (req.file) {
      updates.profile_image = `/uploads/${req.file.filename}`;
    }

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

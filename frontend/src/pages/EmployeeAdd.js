// frontend/src/pages/EmployeeAdd.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";

function EmployeeAdd() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState("");
  const [salary, setSalary] = useState("");
  const [dateOfJoining, setDateOfJoining] = useState("");
  const [department, setDepartment] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (
      !firstName ||
      !lastName ||
      !email ||
      !position ||
      !salary ||
      !dateOfJoining ||
      !department
    ) {
      setError("All fields are required.");
      return;
    }

    try {
      await api.post("/emp/employees", {
        first_name: firstName,
        last_name: lastName,
        email,
        position,
        salary: Number(salary),
        date_of_joining: dateOfJoining,
        department,
      });
      navigate("/employees");
    } catch (err) {
      console.error(err);
      setError("Failed to add employee.");
    }
  };

  return (
    <div>
      <h2>Add Employee</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name *</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        <div>
          <label>Last Name *</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div>
          <label>Email *</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label>Position *</label>
          <input
            type="text"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          />
        </div>

        <div>
          <label>Salary *</label>
          <input
            type="number"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
          />
        </div>

        <div>
          <label>Date of Joining *</label>
          <input
            type="date"
            value={dateOfJoining}
            onChange={(e) => setDateOfJoining(e.target.value)}
          />
        </div>

        <div>
          <label>Department *</label>
          <input
            type="text"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          />
        </div>

        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default EmployeeAdd;

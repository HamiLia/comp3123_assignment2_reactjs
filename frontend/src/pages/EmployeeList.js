// frontend/src/pages/EmployeeList.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";

function EmployeeList() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [deptFilter, setDeptFilter] = useState("");
  const [positionFilter, setPositionFilter] = useState("");
  const [error, setError] = useState("");

  const loadEmployees = async () => {
    try {
      const res = await api.get("/emp/employees");
      setEmployees(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load employees.");
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this employee?")) return;
    try {
      await api.delete(`/emp/employees?eid=${id}`);
      await loadEmployees();
    } catch (err) {
      console.error(err);
      alert("Failed to delete employee.");
    }
  };

  const filtered = employees.filter((e) => {
    const byDept = deptFilter
      ? e.department.toLowerCase().includes(deptFilter.toLowerCase())
      : true;
    const byPos = positionFilter
      ? e.position.toLowerCase().includes(positionFilter.toLowerCase())
      : true;
    return byDept && byPos;
  });

  const handleReset = () => {
    setDeptFilter("");
    setPositionFilter("");
  };

  return (
    <div>
      <h2>Employees</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Search 영역 */}
      <div>
        <h4>Search</h4>
        <div>
          <input
            placeholder="Department"
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
          />
          <input
            placeholder="Position"
            value={positionFilter}
            onChange={(e) => setPositionFilter(e.target.value)}
          />
          <button onClick={handleReset}>Reset</button>
        </div>
      </div>

      <button onClick={() => navigate("/employees/add")}>Add Employee</button>

      <table border="1" cellPadding="6" style={{ marginTop: "12px" }}>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Position</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length === 0 && (
            <tr>
              <td colSpan="6">No employees found.</td>
            </tr>
          )}
          {filtered.map((e) => (
            <tr key={e.employee_id}>
              <td>{e.first_name}</td>
              <td>{e.last_name}</td>
              <td>{e.email}</td>
              <td>{e.department}</td>
              <td>{e.position}</td>
              <td>
                <button onClick={() => navigate(`/employees/${e.employee_id}`)}>
                  View
                </button>
                <button
                  onClick={() => navigate(`/employees/edit/${e.employee_id}`)}
                >
                  Edit
                </button>
                <button onClick={() => handleDelete(e.employee_id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeList;

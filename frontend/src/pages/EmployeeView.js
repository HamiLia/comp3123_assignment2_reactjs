// frontend/src/pages/EmployeeView.js
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axiosInstance";

function EmployeeView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await api.get(`/emp/employees/${id}`);
        setEmployee(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load employee.");
      }
    };

    fetchEmployee();
  }, [id]);

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!employee) return <p>Loading...</p>;

  return (
    <div>
      <h2>Employee Details</h2>
      <p>
        <strong>First Name:</strong> {employee.first_name}
      </p>
      <p>
        <strong>Last Name:</strong> {employee.last_name}
      </p>
      <p>
        <strong>Email:</strong> {employee.email}
      </p>
      <p>
        <strong>Position:</strong> {employee.position}
      </p>
      <p>
        <strong>Salary:</strong> {employee.salary}
      </p>
      <p>
        <strong>Date of Joining:</strong>{" "}
        {employee.date_of_joining?.slice(0, 10)}
      </p>
      <p>
        <strong>Department:</strong> {employee.department}
      </p>

      <button onClick={() => navigate("/employees")}>Back to list</button>
    </div>
  );
}

export default EmployeeView;

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axiosInstance";
import { useAuth } from "../contexts/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.email || !form.password) {
      setError("Email and password are required.");
      return;
    }

    try {
      const res = await api.post("/user/login", form);
      console.log("login response:", res.data);

      res.data.token ||
        res.data.accessToken ||
        res.data.jwt ||
        (res.data.data && res.data.data.token);

      if (!token) {
        console.warn("No token in response. Using dummy token for now.");
        token = "dummy-token-for-assignment2";
      }

      login(token, form.email);
      navigate("/employees");
    } catch (err) {
      console.error(err);
      const backendMsg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        JSON.stringify(err.response?.data || {});
      setError(backendMsg || "Login failed. Please check your credentials.");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "40px auto" }}>
      <h2>Login</h2>
      {error && <div style={{ color: "red", marginBottom: 10 }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 10 }}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            style={{ width: "100%", padding: 8 }}
          />
        </div>
        <div style={{ marginBottom: 10 }}>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            style={{ width: "100%", padding: 8 }}
          />
        </div>
        <button type="submit" style={{ width: "100%", padding: 10 }}>
          Login
        </button>
      </form>
      <p style={{ marginTop: 10 }}>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
};

export default Login;

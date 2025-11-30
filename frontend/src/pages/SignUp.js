import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axiosInstance";

const SignUp = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const { username, email, password } = form;

    if (!username || !email || !password) {
      setError("All fields are required.");
      return;
    }

    try {
      const res = await api.post("/user/signup", {
        username,
        email,
        password,
      });

      console.log("signup response:", res.data);
      navigate("/login");
    } catch (err) {
      console.error("signup error:", err);

      let msg =
        err.response?.data?.message || err.response?.data?.error || err.message;

      if (err.response?.status === 409 && !msg) {
        msg = "User already exists with this email.";
      }

      if (!msg || msg === "{}") {
        msg = "Sign up failed. Please try again.";
      }

      setError(msg);
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: "40px auto" }}>
      <h2>Sign Up</h2>

      {error && <div style={{ color: "red", marginBottom: 8 }}>{error}</div>}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 10 }}>
          <label>Username</label>
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            style={{ width: "100%", padding: 8 }}
          />
        </div>

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
          Sign Up
        </button>
      </form>

      <p style={{ marginTop: 10 }}>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default SignUp;

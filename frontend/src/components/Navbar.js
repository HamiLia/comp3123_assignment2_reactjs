import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
  const { isAuthenticated, logout, userEmail } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  if (location.pathname === "/login" || location.pathname === "/signup") {
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 20px",
        borderBottom: "1px solid #ddd",
        marginBottom: 20,
      }}
    >
      <div>
        <Link to="/employees" style={{ marginRight: 16, fontWeight: "bold" }}>
          Employee Manager
        </Link>
        {isAuthenticated && (
          <>
            <Link to="/employees" style={{ marginRight: 10 }}>
              Employees
            </Link>
            <Link to="/employees/add" style={{ marginRight: 10 }}>
              Add Employee
            </Link>
          </>
        )}
      </div>
      <div>
        {isAuthenticated && (
          <>
            <span style={{ marginRight: 10, fontSize: 14 }}>
              {userEmail && `Logged in as ${userEmail}`}
            </span>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

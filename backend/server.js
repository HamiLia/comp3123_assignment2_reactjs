require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const employeeRoutes = require("./routes/employeeRoutes");

const app = express();
app.use(cors());
app.use(express.json());

connectDB(
  process.env.MONGO_URI || "mongodb://localhost:27017/comp3123_assigment1"
);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/emp", employeeRoutes);

app.get("/", (req, res) => res.json({ message: "API running" }));

app.use((err, req, res, next) => {
  console.error("Global error handler:", err);
  const status = err.status || 500;
  const message = err.message || "Server error";
  res.status(status).json({ message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

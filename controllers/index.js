const AppError = require("../utils/appError");
const conn = require("../services/db");
const bcrypt = require("bcrypt");

exports.registerUser = (req, res) => {
  const { username, password, email } = req.body;

  bcrypt.hash(password, 10, (hashErr, hashedPassword) => {
    if (hashErr) {
      return res.status(500).json({ error: "Error hashing password" });
    }
    conn.query(
      "INSERT INTO userlist (username, password, email) VALUES (?, ?, ?)",
      [username, hashedPassword, email],
      (err, result) => {
        if (err) {
          return res.status(500).json({ error: "Error storing user data" });
        }

        res.status(201).json({ message: "User registered successfully" });
      }
    );
  });
};
exports.loginUser = (req, res) => {
  const { username, email, password } = req.body;
  const identifier = username ? username : email;

  const query = "SELECT * FROM userlist WHERE username = ? OR email = ?";
  conn.query(query, [identifier, identifier], (err, data, fields) => {
    if (err) {
      return res.status(500).json({ error: "Database query error" });
    }

    if (data.length === 0) {
      return res.status(401).json({ error: "Invalid username or email" });
    }

    const storedHashedPassword = data[0].password;

    bcrypt.compare(password, storedHashedPassword, (compareErr, result) => {
      if (compareErr) {
        return res.status(500).json({ error: "Error comparing passwords" });
      }

      if (!result) {
        return res.status(401).json({ error: "Invalid password" });
      }

      res.status(200).json({ message: "Authentication successful" });
    });
  });
};

exports.forgotPassword = (req, res) => {
  const { username, email, password: newPassword } = req.body;

  const query = "SELECT * FROM userlist WHERE username = ? AND email = ?";
  conn.query(query, [username, email], (err, data, fields) => {
    if (err) {
      return res.status(500).json({ error: "Database query error" });
    }

    if (data.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const userId = data[0].id;
    bcrypt.hash(newPassword, 10, (hashErr, hashedPassword) => {
      if (hashErr) {
        console.error("Bcrypt Error:", hashErr);
        return res.status(500).json({ error: "Error hashing password" });
      }

      const updateQuery = "UPDATE userlist SET password = ? WHERE id = ?";
      conn.query(updateQuery, [hashedPassword, userId], (updateErr, result) => {
        if (updateErr) {
          return res.status(500).json({ error: "Error updating password" });
        }

        res.status(200).json({ message: "Password updated successfully" });
      });
    });
  });
};

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/Users");

exports.register = (req, res) => {
  const { name, userName, email, password, age, weight } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => {
      UserModel.create({ name, userName, email, password: hash, age, weight })
        .then(() => {
          res.json({ status: "OK" });
        })
        .catch((err) => {
          if (err.name === "MongoError" && err.code === 11000) {
            res.status(400).json({ error: "Email already exists" });
          } else {
            res
              .status(500)
              .json({ error: "Internal Server Error", details: err });
          }
        });
    })
    .catch((err) => {
      res.status(500).json({ error: "Error hashing password", details: err });
    });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  UserModel.findOne({ email: email })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "No user found" });
      }

      bcrypt
        .compare(password, user.password)
        .then((response) => {
          if (response) {
            const token = jwt.sign(
              { email: user.email, role: user.role },
              "jwt-secret-key",
              { expiresIn: "1d" }
            );

            return res.json({
              Status: "Success",
              role: user.role,
              token: token,
            });
          } else {
            return res.status(401).json({ error: "The password is incorrect" });
          }
        })
        .catch((err) => {
          return res
            .status(500)
            .json({ error: "Error comparing passwords", details: err });
        });
    })
    .catch((err) => {
      return res
        .status(500)
        .json({ error: "Internal Server Error", details: err });
    });
};

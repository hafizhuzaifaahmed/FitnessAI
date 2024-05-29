const UserModel = require("../models/Users");

exports.getUserProfile = (req, res) => {
  const userEmail = req.user.email;

  UserModel.findOne({ email: userEmail })
    .then((user) => {
      if (user) {
        res.json({
          name: user.name,
          email: user.email,
        });
      } else {
        res.status(404).json({ error: "User not found" });
      }
    })
    .catch((err) => {
      console.error("Error fetching user profile data:", err);
      res.status(500).json({ error: "Internal server error" });
    });
};

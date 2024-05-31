const UserModel = require("../models/Users");

exports.getUserProfile = (req, res) => {
  const userEmail = req.user.email;

  UserModel.findOne({ email: userEmail })
    .then((user) => {
      if (user) {
        res.json({
          name: user.name,
          userName: user.userName, // Ensure username is included
          email: user.email,
          age: user.age, // Ensure age is included
          weight: user.weight, // Ensure weight is included
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

exports.updateUserProfile = (req, res) => {
  const userEmail = req.user.email;
  const updatedData = req.body; // Assuming the request body contains the updated data

  UserModel.findOneAndUpdate({ email: userEmail }, updatedData, { new: true })
    .then((updatedUser) => {
      if (updatedUser) {
        res.json({
          message: "Profile updated successfully",
          user: updatedUser,
        });
      } else {
        res.status(404).json({ error: "User not found" });
      }
    })
    .catch((err) => {
      console.error("Error updating user profile:", err);
      res.status(500).json({ error: "Internal server error" });
    });
};

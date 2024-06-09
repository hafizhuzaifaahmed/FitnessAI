const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const path = require("path");

const app = express();

// Allow requests from the domain where your frontend is hosted
app.use(
  cors({
    origin: "https://ded-lift-frontend.azurewebsites.net", // Replace with your frontend app's URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://hafizhuzaifaahmed:Huzaifa14052002@cluster0.9nx9tuc.mongodb.net/fitness-app"
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Connection error", err));

app.use("/auth", authRoutes);
app.use("/user", userRoutes);

// Serve static files from the frontend build directory
app.use(express.static(path.join(__dirname, "Frontend", "build")));

// Route all other requests to the frontend's index.html
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "Frontend", "build", "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

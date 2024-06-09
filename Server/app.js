const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const path = require("path");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://hafizhuzaifaahmed:Huzaifa14052002@cluster0.9nx9tuc.mongodb.net/fitness-app"
  )
  .then(() => console.log("Connected"))
  .catch((err) => console.error("Connection error", err));

app.use("/auth", authRoutes);
app.use("/user", userRoutes);

//production script
app.use(express.static("./Frontend/build"));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "Frontend", "build", "index.html"));
});

module.exports = app;

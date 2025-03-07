const express = require("express");
const app = express();
const path = require("path");

// Serve files from the 'public' folder
app.use(express.static("public"));

// Route for homepage ("/")
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start the server on Render's port or 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


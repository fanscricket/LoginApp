const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.post("/login", (req, res) => {
    const { username, password } = req.body;
    const attempt = `Username: ${username}, Password: ${password}\n`;

    fs.appendFileSync("login_attempts.txt", attempt);

    res.json({ message: "Login attempt recorded." });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

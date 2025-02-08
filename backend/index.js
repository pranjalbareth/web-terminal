const express = require("express");
const cors = require("cors");
const { getCommand } = require("./commands");

const app = express();
app.use(cors());
app.use(express.json());

let commandHistory = [];

app.post("/run", (req, res) => {
    const { input } = req.body;
    const parts = input.trim().split(" ");
    const cmd = parts[0];
    const args = parts.slice(1);

    const output = getCommand(cmd, args);
    if (output === null) {
        return res.json({ output: "Error: Command not found! This project is still in works ⚠" });
    }

    commandHistory.push({ command: input, output });
    res.json({ output });
});

app.get("/history", (req, res) => {
    res.json({ history: commandHistory });
});

app.listen(5000, () => console.log("Server running on port 5000"));

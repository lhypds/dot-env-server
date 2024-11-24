const express = require("express");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;
const DOT_ENV_FILE_PATH = process.env.DOT_ENV_FILE_PATH;
const BLOCKED_KEYS = process.env.BLOCKED_KEYS
  ? process.env.BLOCKED_KEYS.split(",")
  : [];
const PROJECT_NAME = process.env.PROJECT_NAME || "Dot Env Server";

// Serve static files
app.use(express.static("public"));

// Middleware to parse JSON bodies
app.use(express.json());

// Helper function to read .env file
const readEnvFile = (filePath) => {
  const data = fs.readFileSync(filePath, "utf8");
  return data.split("\n").reduce((acc, line) => {
    const [key, value] = line.split("=");
    if (key && value && !BLOCKED_KEYS.includes(key)) {
      acc[key] = value;
    }
    return acc;
  }, {});
};

// Helper function to write to .env file
const writeEnvFile = (filePath, data) => {
  const content = Object.entries(data)
    .map(([key, value]) => `${key}=${value}`)
    .join("\n");
  fs.writeFileSync(filePath, content, "utf8");
};

// List all available variables and current values
app.get("/list", (req, res) => {
  const envData = readEnvFile(DOT_ENV_FILE_PATH);
  res.json(envData);
});

// Update a specific key in the .env file
app.post("/update", (req, res) => {
  const { key, value } = req.query;
  if (!key || !value) {
    return res.status(400).send("Key and value are required");
  }
  if (BLOCKED_KEYS.includes(key)) {
    return res.status(403).send("This key is blocked from being updated");
  }

  const envData = readEnvFile(DOT_ENV_FILE_PATH);
  envData[key] = value;
  writeEnvFile(DOT_ENV_FILE_PATH, envData);
  res.send(`Updated ${key} to ${value}`);
});

// Get a specific key's value
app.get("/get", (req, res) => {
  const { key } = req.query;
  if (!key) {
    return res.status(400).send("Key is required");
  }
  if (BLOCKED_KEYS.includes(key)) {
    return res.status(403).send("This key is blocked from being accessed");
  }

  const envData = readEnvFile(DOT_ENV_FILE_PATH);
  const value = envData[key];
  if (value) {
    res.send(`${key}=${value}`);
  } else {
    res.status(404).send("Key not found");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on \`http://localhost:${PORT}\``);
});

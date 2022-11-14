const fs = require("fs");

const API_KEY_FILE_NAME = "API_KEY";

const API_KEY = fs.readFileSync(API_KEY_FILE_NAME).toString();

const fs = require("fs");

const API_KEY_FILE_NAME = "API_KEY";
const API_KEY = fs.readFileSync(API_KEY_FILE_NAME).toString().substring(0, 32);

async function postCall(keyword) {
  const request = await fetch("http://www.hashscraper.com/api/twitter", {
    method: "POST",
    body: JSON.stringify({
      api_key: API_KEY,
      keyword,
    }),
    headers: {
      "Content-type": "application/json; version=2; charset=UTF-8",
    },
  });

  const result = await request.json();

  console.log(result);
}

postCall("gun");

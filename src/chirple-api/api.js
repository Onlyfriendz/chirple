const fs = require("fs");
const { sleep } = require("./utils.js");

const MAX_COUNT = 10;
const TOTAL_ROUNDS = 1;
const ROUND_DELAY = 3000;

const API_KEY_FILE_NAME = "API_KEY";
const API_KEY = fs.readFileSync(API_KEY_FILE_NAME).toString().substring(0, 32);

async function postCall(keyword, startDate, endDate, nextToken) {
  const request = await fetch("http://www.hashscraper.com/api/twitter", {
    method: "POST",
    body: JSON.stringify({
      api_key: API_KEY,
      keyword,
      start_date: startDate,
      end_date: endDate,
      max_count: MAX_COUNT,
      next_token: nextToken,
    }),
    headers: {
      "Content-type": "application/json; version=2; charset=UTF-8",
    },
  });

  const result = await request.json();
  return result;
}

async function scrape(keyword, startDate, endDate) {
  const initialResult = await postCall(keyword, startDate, endDate);
  let allTweets = initialResult.data;
  let count = 1;
  let nextToken = initialResult.next_token;
  while (nextToken && count < TOTAL_ROUNDS) {
    await sleep(ROUND_DELAY);
    const nextPage = await postCall(keyword, startDate, endDate, nextToken);
    allTweets = allTweets.concat(nextPage.data);
    nextToken = nextPage.next_token;
    count++;
  }
  return allTweets;
}

postCall("gun");


module.exports = { scrape };

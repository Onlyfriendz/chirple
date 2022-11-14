const { API_KEY } = require("./key.js");
const { sleep } = require("./utils.js");

const MAX_COUNT = 10;
const TOTAL_ROUNDS = 1;
const ROUND_DELAY = 3000;
const PROXY_URL = "https://hidden-ocean-65167.herokuapp.com/";
const HTTP_PORT = "localhost:3000";

async function postCall(keyword, startDate, endDate, nextToken) {
  const request = await fetch(
    `${PROXY_URL}http://www.hashscraper.com/api/twitter`,
    {
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
        Origin: HTTP_PORT,
      },
    }
  );

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

module.exports = { scrape };

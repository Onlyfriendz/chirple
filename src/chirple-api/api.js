const { API_KEY } = require("./key.js");
const { sleep } = require("./utils.js");

const MAX_COUNT = 10;
const TOTAL_COUNT = 10;
const ROUND_DELAY = 3000;
const ERROR_LIMIT = 3;
const PROXY_URL = "https://pure-falls-05958.herokuapp.com/";
const HTTP_PORT = "localhost:3000";
const HASHSCRAPPER = "http://www.hashscraper.com/api/twitter";
const API_ERROR = `Error: Server error during API call,`
  + ` after ${ERROR_LIMIT} attempt${ERROR_LIMIT === 1 ? '' : 's'}.`
  + `\nTry again later.`;

async function postCall(keyword, startDate, endDate, nextToken) {
  const body = JSON.stringify({
    api_key: API_KEY,
    keyword,
    start_date: startDate,
    end_date: endDate,
    max_count: MAX_COUNT,
    next_token: nextToken,
  });
  const length = body.length;
  const request = await fetch(`${PROXY_URL}${HASHSCRAPPER}`, {
    method: "POST",
    body,
    headers: {
      "Content-Type": "application/json; version=2; charset=UTF-8",
      Origin: HTTP_PORT,
      "Content-Length": length.toString(),
    },
  });

  try {
    const result = await request.json();
    return result;
  } catch (error) {
    throw API_ERROR;
  }
}

async function scrape(keyword, startDate, endDate) {
  let errorCount = 0;
  let count = 0;
  let nextToken;
  let allTweets = [];

  // init round 1
  try {
    const initialResult = await postCall(keyword, startDate, endDate);
    allTweets.push(...initialResult.data);
    nextToken = initialResult.next_token;
    if (allTweets.length === count) {
      return [];
    }
    count = allTweets.length;
  } catch (error) {
      errorCount++;
      if (ERROR_LIMIT > 0 && errorCount >= ERROR_LIMIT) {
        throw API_ERROR;
      }
  }

  // subsequent rounds, if necessary
  while (nextToken && count < TOTAL_COUNT) {
    sleep(ROUND_DELAY);
    try {
      const nextPage = await postCall(keyword, startDate, endDate, nextToken);
      allTweets.push(...nextPage.data);
      nextToken = nextPage.next_token;

      // check if there are zero new tweets
      if (allTweets.length === count) {
        break;
      }

      count = allTweets.length;
    } catch (error) {
      errorCount++;
      if (ERROR_LIMIT > 0 && errorCount >= ERROR_LIMIT) {
        throw API_ERROR;
      }
    }
  }
  return allTweets;
}

module.exports = { scrape };

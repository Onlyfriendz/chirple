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


function getTotal(object) {
  totalFavorites = 0;
  totalRetweets = 0;
  totalQuoteCount = 0;
  for (let i = 0; i < object.length; i++) {
    totalFavorites += object[i]['value8'];
    totalRetweets += object[i]['value9'];
    totalQuoteCount += object[i]['value11'];
  }
  return [totalFavorites, totalRetweets, totalQuoteCount];
}

function getMostLikedPost(object) {

}

function getGeneralSentiments(object) {
  score = 0;
  objectLength = object.length
  for (let i = 0; i < objectLength; i++) {
    score += getSentimentScore(object[i]['value_15']);
  }

  return score / (objectLength)
}

function getSentimentScore(subObject) {
  score = 0
  subObjectLength = subObject.length
  for (let i = 0; i < subObjectLength; i++) {
    score += subObject[i]['score'];
  }

  return score / (subObjectLength)
}
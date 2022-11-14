const { getTotal, getGeneralSentiments, get3MostLikedPosts, getNumberSentiments } = require("./analysis");

const { scrape } = require("./api.js", "./analysis.js");
const { timeAnalysis } = require("./time-analysis");

async function scrapeTest() {
  const keyword = "zoukout";
  const startDate = null;
  const endDate = null;
  const result = await scrape(keyword, startDate, endDate);
  console.log(result);
}

async function testTotal() {
  const keyword = "zoukout";
  const startDate = null;
  const endDate = null;
  const result = await scrape(keyword, startDate, endDate);
  console.log(getTotal(result));
}

async function testSentiments() {
  const keyword = "zoukout";
  const startDate = null;
  const endDate = null;
  const result = await scrape(keyword, startDate, endDate);
  console.log(getGeneralSentiments(result));
}

async function test3LikedPosts() {
  const keyword = "zoukout";
  const startDate = null;
  const endDate = null;
  const result = await scrape(keyword, startDate, endDate);
  console.log(get3MostLikedPosts(result));
}

async function testNumberSentiments() {
  const keyword = "zoukout";
  const startDate = null;
  const endDate = null;
  const result = await scrape(keyword, startDate, endDate);
  console.log(getNumberSentiments(result));
}

async function testTime() {
  const result = await scrape("zoukout", null, null);
  console.log(timeAnalysis(result));
}

scrapeTest();


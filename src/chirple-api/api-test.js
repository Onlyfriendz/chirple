const { scrape } = require("./api.js");
const { timeAnalysis } = require("./time-analysis");

async function test() {
  const keyword = "zoukout";
  const startDate = null;
  const endDate = null;
  const result = await scrape(keyword, startDate, endDate);
  console.log(result);
}

async function testTime() {
  const result = await scrape("zoukout", null, null);
  console.log(timeAnalysis(result));
}

testTime();

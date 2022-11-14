const { scrape } = require("./api.js");

async function test() {
  const keyword = "zoukout";
  const startDate = null;
  const endDate = null;
  const result = await scrape(keyword, startDate, endDate);
  console.log(result);
}

test();

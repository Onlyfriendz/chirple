const { scrape } = require("./api.js");

function timeAnalysis(tweets) {
    const result = {};
    const res2 = [];
    for (const tweet of tweets) {
        const time = tweet["value14"].substring(0, 10);
        if (!result[time]) {
            result[time] = 0;
        } 
        result[time] += 1;
    }
    for (const date in result) {
        res2.push({
            time: date,
            value: result[date]
        });
    }
    return res2;
}

module.exports = {timeAnalysis};
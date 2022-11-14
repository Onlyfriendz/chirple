const { scrape } = require("./api.js");

function timeAnalysis(tweets) {
    const result = {}
    for (const tweet of tweets) {
        const time = tweet["value14"].substring(0, 10);
        if (!result[time]) {
            result[time] = 0;
        } 
        result[time] += 1;
    }
    return result;
}

module.exports = {timeAnalysis};
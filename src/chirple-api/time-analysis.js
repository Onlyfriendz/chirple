const { scrape } = require("./api.js");

function timeAnalysis(tweets) {
    const result = {};
    var res2 = [];
    for (const tweet of tweets) {
        const time = tweet["value14"].substring(0, 10);
        if (!result[time]) {
            result[time] = 0;
        } 
        result[time] += 1;
    }
    for (const date in result) {
        res2.push({
            time: new Date(date),
            value: result[date]
        });
    }
    res2 = res2.sort((p1, p2) => (p1.time < p2.time) ? -1 : (p1.time > p2.time) ? 1 : 0);

    for ( let obj of res2) {
        obj["time"] = obj["time"].toString().slice(4,10);
    }
    return res2;

}

module.exports = {timeAnalysis};
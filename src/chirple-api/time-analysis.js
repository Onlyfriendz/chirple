const { scrape } = require("./api.js");

function removeTime(date = new Date()) {
    return new Date(date.toDateString());
  }

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
            time: removeTime(new Date(date)),
            value: result[date]
        });
    }
    console.log(res2);
    res2 = res2.sort((p1, p2) => (p1.time < p2.time) ? -1 : (p1.time > p2.time) ? 1 : 0);

    for ( let obj of res2) {
        //console.log(obj);
        obj["time"] = obj["time"].toString().slice(4,10);
    }

    // for (const object in res2) {
    //     object["time"] = object["time"].substring(0,10);
    // }
    return res2;

}

module.exports = {timeAnalysis};
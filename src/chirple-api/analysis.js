const {
    PriorityQueue
} = require('@datastructures-js/priority-queue');

function getTotal(object) {
    let totalFavorites = 0;
    let totalRetweets = 0;
    let totalQuoteCount = 0;
    for (let i = 0; i < object.length; i++) {
        totalFavorites += parseInt(object[i]['value8']);
        totalRetweets += parseInt(object[i]['value9']);
        totalQuoteCount += parseInt(object[i]['value11']);
    }
    return [totalFavorites, totalRetweets, totalQuoteCount];
}

function get3MostLikedPosts(object) {
    const pq = PriorityQueue.fromArray(object, (a, b) => b['value8'] - a['value8']);
    const number1 = pq.dequeue();
    const number2 = pq.dequeue();
    const number3 = pq.dequeue();
    return [number1['value1'].split("/")[5], number2['value1'].split("/")[5], number3['value1'].split("/")[5]]
}

function getGeneralSentiments(object) {
    let score = 0;
    const objectLength = object.length;
    for (let i = 0; i < objectLength; i++) {
        var parsedJSON = JSON.parse(object[i]['value15']);
        score += getSentimentScore(parsedJSON);
    }
    return score / (objectLength)
}

function getSentimentScore(subObject) {
    let score = 0;
    const subObjectLength = subObject.length;
    for (let i = 0; i < subObjectLength; i++) {
        score += parseFloat(subObject[i]['score']);
    }
    const avg = score / parseInt(subObjectLength);
    return avg;
}

function getNumberSentiments(object) {
    var positiveNumber = 0;
    var negativeNumber = 0;
    var neutralNumber = 0;
    for (let i = 0; i < object.length; i++) {
        var parsedJSON = JSON.parse(object[i]['value15']);
        if (getSentimentScore(parsedJSON) > 0.2) {
            positiveNumber += 1;
        } else if (getSentimentScore(parsedJSON) < -0.2) {
            negativeNumber += 1;
        } else {
            neutralNumber += 1
        }
    }
    return [positiveNumber, negativeNumber, neutralNumber];
}

module.exports = { getTotal, getGeneralSentiments, get3MostLikedPosts, getNumberSentiments };
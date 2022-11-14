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
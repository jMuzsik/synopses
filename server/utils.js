var defaultImage = 'https://www.fluentu.com/blog/english/wp-content/uploads/sites/4/2015/01/15-weird-english-words-you-wont-believe-exist.jpg';

var defaultString = "To be filled in.";


var isURL = function (str) {
    var regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
    if (regexp.test(str)) {
        return true;
    }
    else {
        return false;
    }
}

var checkAllURLS = function (...possibilities) {
    var arrayOfPossibleURLs = possibilities;
    arrayOfPossibleURLs = arrayOfPossibleURLs.map(function (possibleURL) {
        if (!isURL(possibleURL)) {
            possibleURL = defaultImage;
        }
    })
    return arrayOfPossibleURLs;
}

var checkAllStrings = function (...possibilities) {
    var arrayOfPossibleStrings = possibilities;

    for (var el of arrayOfPossibleStrings) {
        if (el) {
            defaultString = el;
            break;
        }
    }
    arrayOfPossibleStrings = arrayOfPossibleStrings.map(function (possibility) {
        if (!possibility) {
            possibility = defaultString;
        }
    })
    return arrayOfPossibleStrings;
}

module.exports = { isURL, checkAllURLS, checkAllStrings }

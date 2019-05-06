const cheerio = require("cheerio");

module.exports = function(text) {
  const $ = cheerio.load(text);
  const wordCount = $("*")
    .text()
    .split(" ").length;

  var readingTimeInMinutes = Math.floor(wordCount / 280) + 1;
  var readingTimeAsString =
    wordCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
    " words, ~ reading time: " +
    readingTimeInMinutes +
    "min";

  return readingTimeAsString;
};

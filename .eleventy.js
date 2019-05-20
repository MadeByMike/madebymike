const { DateTime } = require("luxon");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const externalArticles = require("./src/site/_data/external_articles");
const events = require("./src/site/_data/dev/events");
const get = require("lodash.get");

let markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");

module.exports = function(config) {
  // A useful way to reference to the contect we are runing eleventy in
  let env = process.env.ELEVENTY_ENV;

  let options = {
    html: true,
    breaks: true,
    linkify: true
  };

  config.setLibrary("md", markdownIt(options).use(markdownItAnchor));

  // Layout aliases can make templates more portable
  config.addLayoutAlias("default", "layouts/base.njk");
  config.addCollection("writing", collection =>
    collection
      .getAllSorted()
      .filter(
        item =>
          item.url &&
          !item.inputPath.includes("index.njk") &&
          item.inputPath.startsWith("./src/site/writing/")
      )
  );

  // OMG this is so bad! I'm making a fake collection by combining data and posts so I can avoid munging it in templates
  const externalArticlesFakeCollectionItems = externalArticles.map(item => ({
    template: null,
    inputPath: `./src/site/index.md`,
    fileSlug: null,
    data: { description: item.description, title: item.title },
    date: item.date,
    outputPath: null,
    url: item.url,
    templateContent: null
  }));

  config.addCollection("allWriting", collection =>
    collection
      .getAll()
      .filter(
        item =>
          item.url &&
          !item.inputPath.includes("index.njk") &&
          item.inputPath.startsWith("./src/site/writing/")
      )
      .concat(externalArticlesFakeCollectionItems)
      .sort((a, b) => a.date - b.date)
  );

  // OMG I'm doing it again. Someone stop me!
  const eventsFakeCollectionItems = events.past.map(item => {
    return {
      template: null,
      inputPath: `./src/site/index.md`,
      fileSlug: null,
      data: { event: item.event, presentation: item.presentation },
      date: new Date(item.event.starts_on),
      outputPath: null,
      url: item.link,
      templateContent: null
    };
  });

  config.addCollection("allContent", collection =>
    collection
      .getAll()
      .filter(
        item =>
          item.url &&
          !item.inputPath.includes("index.njk") &&
          item.inputPath.startsWith("./src/site/writing/")
      )
      .concat(externalArticlesFakeCollectionItems)
      .concat(eventsFakeCollectionItems)
      .sort((a, b) => a.date - b.date)
  );

  // Add some utility filters
  config.addFilter("squash", require("./src/filters/squash.js"));
  config.addFilter("wordCount", require("./src/filters/word-count.js"));

  config.addFilter("dateDisplay", (dateObj, format = "LLL d, y") => {
    const date = DateTime.fromJSDate(new Date(dateObj), {
      zone: "utc"
    });
    return date.isValid ? date.toFormat(format) : "";
  });

  config.addFilter("stripYear", string => {
    return string.replace(/(19|20)[0-9][0-9]/, "");
  });

  config.addFilter("get", function(ref, key) {
    if (!ref) ref = this.ctx;
    const result = key ? get(ref, key, "undefined") : ref;
    console.log(result, Object.keys(result));
    return result;
  });

  // pass some assets right through
  config.addPassthroughCopy({ "./src/site/static/": "./" });

  // syntax hl
  config.addPlugin(syntaxHighlight);

  // make the seed target act like prod
  env = env == "seed" ? "prod" : env;
  return {
    dir: {
      input: "src/site",
      output: "dist",
      data: `_data/${env}`
    },
    templateFormats: ["njk", "md"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    passthroughFileCopy: true
  };
};

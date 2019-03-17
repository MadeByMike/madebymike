const { DateTime } = require("luxon");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function(config) {
  // A useful way to reference to the contect we are runing eleventy in
  let env = process.env.ELEVENTY_ENV;

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

  // Add some utiliuty filters
  config.addFilter("squash", require("./src/filters/squash.js"));
  config.addFilter("dateDisplay", (dateObj, format = "LLL d, y") => {
    return DateTime.fromJSDate(dateObj, {
      zone: "utc"
    }).toFormat(format);
  });

  config.addFilter("get", function(key) {
    return this.ctx[key] || "";
  });

  // minify the html output
  config.addTransform("htmlmin", require("./src/utils/minify-html.js"));

  // pass some assets right through
  config.addPassthroughCopy("./src/site/static", "./");

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

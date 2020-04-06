const critical = require("critical");
process.setMaxListeners(Infinity); // <== Sorry generating critical CSS is a resource hog!

module.exports = async (value, outputPath) => {
  if (outputPath.endsWith(".html") && !outputPath.startsWith("dist/static/")) {
    const { html } = await critical.generate({
      base: "dist/",
      html: value,
      penthouse: { timeout: 120000 },
      dimensions: [
        {
          height: 400,
          width: 599
        },
        {
          height: 900,
          width: 899
        },
        {
          height: 900,
          width: 1201
        }
      ],
      inline: true
    });

    return html;
  }
  return value;
};

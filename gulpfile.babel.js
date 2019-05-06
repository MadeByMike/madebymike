import { src, dest, series, parallel, watch } from "gulp";
import sass from "gulp-sass";
import webpack from "webpack-stream";
import named from "vinyl-named";

/*
  generate the css with sass
*/
const css = () =>
  src("./src/scss/*.scss")
    .pipe(
      sass({
        outputStyle: "compressed"
      }).on("error", sass.logError)
    )
    .pipe(dest("./src/site/_includes/css"));

const doJS = output => () =>
  src("./src/js/**/*.js")
    .pipe(named())
    .pipe(
      webpack({
        devtool: "source-map",
        module: {
          rules: [
            {
              test: /\.js$/,
              exclude: /(node_modules)/,
              use: {
                loader: "babel-loader",
                options: {
                  presets: ["@babel/preset-env"]
                }
              }
            }
          ]
        }
      })
    )
    .pipe(dest(output));

const js = series(
  doJS("./src/site/_includes/js"),
  doJS("./src/site/static/js")
);

export const watchFiles = () => {
  watch("./src/scss/**/*.scss", css);
  watch("./src/js/**/*.js", js);
};
export const build = parallel(css, js);
export const dev = series(build, watchFiles);

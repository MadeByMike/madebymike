import gulp from "gulp";
import cp from "child_process";
import gutil from "gulp-util";
import sass from "gulp-sass";
import postcss from "gulp-postcss";
import autoprefixer from "autoprefixer";
import cssnano from "cssnano";
import rename from "gulp-rename";
import cssvariables from "postcss-css-variables";
import BrowserSync from "browser-sync";
import webpack from "webpack";
import webpackConfig from "./webpack.conf";
import svgstore from "gulp-svgstore";
import svgmin from "gulp-svgmin";
import inject from "gulp-inject";
import debug from "gulp-debug";
import clean from 'gulp-clean';
var critical = require('critical').stream;

const browserSync = BrowserSync.create();
const defaultArgs = ["-d", "../dist", "-s", "site"];

if (process.env.DEBUG) {
  defaultArgs.unshift("--debug");
}

gulp.task("hugo", cb => buildSite(cb));

gulp.task("hugo-preview", cb =>
  buildSite(cb, ["--buildDrafts", "--buildFuture"])
);

gulp.task("build", [
  "css",
  "css-no-vars",
  "critical-css",
  "js",
  "cms-assets",
  "hugo"
]);

gulp.task("build-preview", [
  "css",
  "css-no-vars",
  "critical-css",
  "js",
  "cms-assets",
  "hugo-preview"
]);

gulp.task("css", () =>
  gulp
    .src("./src/css/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(rename({ extname: ".css" }))
    .pipe(gulp.dest("./dist/css"))
    .pipe(browserSync.stream())
);

gulp.task("css-no-vars", () =>
  gulp
    .src("./src/css/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss([autoprefixer(), cssvariables(), cssnano()]))
    .pipe(rename({ extname: ".old.css" }))
    .pipe(gulp.dest("./dist/css"))
    .pipe(browserSync.stream())
);

gulp.task("critical-css", () => {
  var css = gulp
    .src("./src/css/critical.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(rename({ extname: ".css" }))
    .pipe(gulp.dest("site/layouts/partials/"));
});

gulp.task("clean", function (cb) {
  return gulp.src('dist/*', { read: false })
    .pipe(clean());
})

gulp.task("critical", ["build"], function (cb) {
  critical.generate({
    base: "dist/",
    src: "index.html",
    css: ['dist/css/styles.css'],
    dest: "critical.css",
    minify: true,
    dimensions: [
      {
        height: 600,
        width: 450
      },
      {
        height: 900,
        width: 1200
      }
    ],
    ignore: ["@font-face", /url\(/]
  });
});

gulp.task('critical', function () {
  return gulp.src('dist/*.html')
    .pipe(critical({ base: 'dist/', inline: true, css: ['dist/css/styles.css'] }))
    .on('error', function (err) { gutil.log(gutil.colors.red(err.message)); })
    .pipe(gulp.dest('dist'));
});

gulp.task("cms-assets", () =>
  gulp
    .src("./node_modules/netlify-cms/dist/*.{woff,eot,woff2,ttf,svg,png,css}")
    .pipe(gulp.dest("./dist/css"))
);

gulp.task("js", cb => {
  const myConfig = Object.assign({}, webpackConfig);

  webpack(myConfig, (err, stats) => {
    if (err) throw new gutil.PluginError("webpack", err);
    gutil.log(
      "[webpack]",
      stats.toString({
        colors: true,
        progress: true
      })
    );
    browserSync.reload();
    cb();
  });
});

gulp.task("svg", () => {
  const svgs = gulp
    .src("./site/static/img/icon-*.svg")
    .pipe(svgmin())
    .pipe(svgstore({ inlineSvg: true }));

  function fileContents(filePath, file) {
    return file.contents.toString();
  }

  return gulp
    .src("./site/layouts/partials/svg.html")
    .pipe(inject(svgs, { transform: fileContents }))
    .pipe(gulp.dest("site/layouts/partials/"));
});

gulp.task(
  "server",
  ["hugo", "css", "css-no-vars", "cms-assets", "js", "svg"],
  () => {
    browserSync.init({
      server: {
        baseDir: "./dist"
      }
    });
    gulp.watch("./src/js/**/*.js", ["js"]);
    gulp.watch("./src/css/**/*.scss", ["css", "css-no-vars"]);
    gulp.watch("./site/static/img/icons-*.svg", ["svg"]);
    gulp.watch("./site/**/*", ["hugo"]);
  }
);

function buildSite(cb, options) {
  const args = options ? defaultArgs.concat(options) : defaultArgs;

  return cp.spawn(`hugo`, args, { stdio: "inherit" }).on("close", code => {
    if (code === 0) {
      browserSync.reload("notify:false");
      cb();
    } else {
      browserSync.notify("Hugo build failed :(");
      cb("Hugo build failed");
    }
  });
}

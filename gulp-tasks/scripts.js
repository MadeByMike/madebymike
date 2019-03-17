const gulp = require("gulp");
const uglify = require("gulp-uglify");
const webpack = require("webpack-stream");
const named = require("vinyl-named");

/*
  Uglify our javascript files into one.
*/
gulp.task("js", function() {
  return gulp
    .src("./src/js/**/*.js")
    .pipe(named())
    .pipe(webpack())
    .pipe(uglify())
    .pipe(gulp.dest("./src/site/_includes/js"))
    .pipe(gulp.dest("./src/static/js"));
});

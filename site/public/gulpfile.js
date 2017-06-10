'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var template = require('gulp-template');
var sourcemaps = require('gulp-sourcemaps');
var fs = require("fs");

var cqheader;
var cqimage;
var cqfooter;

gulp.task('min', function () {
  return gulp.src('./scss/styles.scss')
	.pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
	.pipe(rename({ extname: '.min.css' }))
	.pipe(sourcemaps.write('./css'))
    .pipe(gulp.dest('./css'));
});

gulp.task('extended', function () {
  return gulp.src('./scss/styles.scss')
    .pipe(sass({outputStyle: 'extended'}).on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});

gulp.task('inline', function () {
  return gulp.src('./scss/inline.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('./_includes'));
});

gulp.task('fluidType', function () {
  return gulp.src('./scss/fluid-type-examples.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});

gulp.task('cqDemo', function () {

  var cqheader = new Buffer(fs.readFileSync('./demos/svg/cq-header.svg')).toString('base64');
  var cqimage = new Buffer(fs.readFileSync('./demos/svg/cq-image.jpg')).toString('base64');
  var cqfooter = new Buffer(fs.readFileSync('./demos/svg/cq-footer.svg')).toString('base64');

  var adimage = new Buffer(fs.readFileSync('./demos/svg/ad-image.jpg')).toString('base64');

  gulp.src('./demos/svg/ad-template.tpl')
  .pipe(template({ adimage: adimage }))
  .pipe(rename('ad-main.svg'))
  .pipe(gulp.dest('./demos/svg/'))

  return gulp.src('./demos/svg/cq-template.tpl')
	.pipe(template({
		cqheader: cqheader,
		cqfooter: cqfooter,
		cqimage: cqimage
	}))
	.pipe(rename('cq-main.svg'))
	.pipe(gulp.dest('./demos/svg/'))
});


gulp.task('default', ['min', 'extended']);

gulp.task('watch', function () {
  gulp.watch('./scss/**/*.scss', ['default']);
});

gulp.task('watch:cqDemo', function () {
  gulp.watch([
    './demos/svg/cq-header.svg',
    './demos/svg/cq-footer.svg',
    './demos/svg/cq-template.tpl',
    './demos/svg/ad-template.tpl'
  ], ['cqDemo']);
});

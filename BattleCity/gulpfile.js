const gulp = require('gulp');
const inlinesource = require('gulp-inline-source');
const webpack = require('gulp-webpack');
const connect = require('gulp-connect');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
const base64 = require('gulp-base64');
const babel = require('gulp-babel');
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass');
// const toBase64 = require('gulp-to-base64');

gulp.task('connect', function () {
  connect.server({
    livereload: true
  });
});

gulp.task('minify', function () {
  gulp.src('src/entry.js')
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest('dist'))
    .pipe(connect.reload());
});

gulp.task('html', function () {
  gulp.src('src/index.html')
    .pipe(gulp.dest('dist'))
    .pipe(connect.reload());
});

gulp.task('sass', function () {
  return gulp.src('src/style/*.scss')
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(base64())
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist'))
    .pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch('src/**/*.js', ['minify']);
  gulp.watch('src/style/*.scss', ['sass']);
});

gulp.task('default', [ 'minify', 'html', 'sass', 'watch', 'connect']);
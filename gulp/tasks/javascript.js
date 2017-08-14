'use strict';

var config      = require('../config');
var gulp        = require('gulp');
var gulpif      = require('gulp-if');
var eslint      = require('gulp-eslint');
var uglify      = require('gulp-uglify');
var babel       = require('gulp-babel');

gulp.task('javascript', function() {

  return gulp.src([config.scripts.src, '!node_modules/**'])
    // .pipe(eslint())
    // .pipe(eslint.format())
    // .pipe(gulpif(global.isProd, eslint.failAfterError()))
    .pipe(babel({ presets: ['es2015'] }))
    .pipe(gulpif(global.isProd, uglify()))
    .pipe(gulp.dest(config.scripts.dest));

});

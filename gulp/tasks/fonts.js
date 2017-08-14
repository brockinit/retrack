'use strict';

var config     = require('../config');
var gulp       = require('gulp');

gulp.task('fonts', function() {

  var dest = config.fonts.dest;

  return gulp.src(config.fonts.src)
    .pipe(gulp.dest(dest));

});

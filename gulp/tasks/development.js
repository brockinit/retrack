'use strict';

var gulp        = require('gulp');
var runSequence = require('run-sequence');

gulp.task('dev', function(cb) {

  global.isProd = false;

  runSequence('styles', 'javascript', 'images', 'fonts', 'watch', cb);

});

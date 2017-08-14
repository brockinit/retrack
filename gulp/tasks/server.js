'use strict';

var gulp    = require('gulp');
var nodemon = require('gulp-nodemon');

gulp.task('server', function() {

  nodemon({
    script: './server/index.js',
    ext: 'js html',
    ignore: ['assets/', 'bower_components/', 'gulp/', 'node_modules/', 'public/']
  }).on('restart', function() {
    console.log('restarted! ' + (new Date()));
  });

});

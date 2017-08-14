'use strict';

module.exports = {
  serverport: 3000,
  browserSyncPort: 3001,

  styles: {
    src: [
      'assets/sass/base/**/*.scss',
      'assets/sass/components/**/*.scss',
      'assets/sass/layout/**/*.scss',
      'assets/sass/pages/**/*.scss',
      'assets/sass/styles.scss',
      'assets/sass/utils/**/*.scss',
      'assets/sass/vendors/**/*.scss',
    ],
    dest: 'public/css',
  },

  scripts: {
    src: 'assets/js/**/*.js',
    dest: 'public/js',
  },

  images: {
    src: 'assets/images/**/*',
    dest: 'public/images',
  },

  fonts: {
    src: 'assets/fonts/**/*',
    dest: 'public/fonts',
  },

  views: {
    watch: 'views/**/*.jade',
    src: 'views/*.jade',
  },

  dist: {
    root: 'public',
  },
};

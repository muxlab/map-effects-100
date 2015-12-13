'use strict';

var gulp = require('gulp');
var eslint = require('gulp-eslint');
var plumber = require('gulp-plumber');
var notifier = require('node-notifier');
var gfi = require('gulp-file-insert');
var processhtml = require('gulp-processhtml');
var foreach = require('gulp-foreach');

gulp.task('lint', function() {
  return gulp.src(['src/*.js'])
    .pipe(plumber({
      errorHandler: function(error) {
        var taskName = 'eslint';
        var title = '[task]' + taskName + ' ' + error.plugin;
        var errorMsg = 'error: ' + error.message;
        console.error(title + '\n' + errorMsg);
        notifier.notify({
          title: title,
          message: errorMsg,
          time: 3000
        });
      }
    }))
    .pipe(eslint({
      useEslintrc: true
    }))
    .pipe(eslint.format())
    .pipe(eslint.failOnError())
    .pipe(plumber.stop());
});

gulp.task('build', function() {
  return gulp.src('src/*.html')
    .pipe(foreach(function(stream, file) {
      return stream
        .pipe(gfi({
          '/* jsFile 01 */': 'src/01_fadein-highlight.js',
          '/* jsFile 02 */': 'src/02_classified-highlightcolor.js'
        }))
    }))
    .pipe(processhtml())
    .pipe(gulp.dest('./Leaflet/'));
});

gulp.task('watch', function() {
  gulp.watch('src/*.js', function(event) {
    gulp.run('lint');
  });
});

gulp.task('default', ['lint'], function() {
  gulp.run('watch');
});

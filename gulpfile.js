"use strict";

var gulp = require('gulp');
var eslint = require('gulp-eslint');
var plumber = require('gulp-plumber');
var notifier = require('node-notifier');

gulp.task('lint', function() {
  return gulp.src(['Leaflet/dist/*.js'])
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
    .pipe(eslint({ useEslintrc: true }))
    .pipe(eslint.format())
    .pipe(eslint.failOnError())
    .pipe(plumber.stop());
});

gulp.task('watch',function(){
    gulp.watch('Leaflet/dist/*.js', function(event){
        gulp.run('lint');
    });
});

gulp.task('default', ['lint'], function(){
    gulp.run('watch');
});

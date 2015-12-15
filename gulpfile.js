var gulp = require('gulp');
var eslint = require('gulp-eslint');
var plumber = require('gulp-plumber');
var notifier = require('node-notifier');
var gfi = require('gulp-file-insert');
var processhtml = require('gulp-processhtml');
var foreach = require('gulp-foreach');
var File = require('vinyl');

function returnGFI(filedata) {
  var file = new File(filedata);
  var tag = '/* jsFile ' + file.stem.substr(0, 2) + ' */';
  var jsFile = 'src/' + file.stem + '.js';
  var obj = {};
  Object.defineProperty(obj, tag, {
    value: jsFile,
    writable: true,
    enumerable: true,
    configurable: true
  });
  console.log('Processing ' + tag + ' : ' + jsFile);
  return obj;
}

gulp.task('lint', function () {
  return gulp.src(['src/*.js'])
    .pipe(plumber({
      errorHandler: function (error) {
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

gulp.task('build', function () {
  return gulp.src('src/*.html')
    .pipe(foreach(function (stream, file) {
      return stream
        .pipe(gfi(returnGFI(file)));
    }))
    .pipe(processhtml())
    .pipe(gulp.dest('./Leaflet/'));
});

gulp.task('watch', function () {
  gulp.watch('src/*.js', function () {
    gulp.run('lint');
  });
});

gulp.task('default', ['lint'], function () {
  gulp.run('watch');
});

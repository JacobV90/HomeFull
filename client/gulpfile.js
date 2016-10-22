var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var typescript = require('gulp-tsc');
var gulpTypings = require("gulp-typings");
var livereload = require('gulp-livereload');
var connect = require('gulp-connect');

var paths = {
  sass: ['./scss/**/*.scss'],
  src: ['./src/**/*.ts'],
  www: ['./www/**/*']
};

gulp.task('default', ['install-typings','sass','compile','watch','server',]);

gulp.task('compile', function() {
  gulp.src(paths.src)
    .pipe(typescript({
      emitError: false
    }))
    .pipe(gulp.dest('www/js/'))
    .pipe(livereload());
});

gulp.task("install-typings",function(){
    var stream = gulp.src("./typings.json")
        .pipe(gulpTypings()); //will install all typingsfiles in pipeline.
    return stream; // by returning stream gulp can listen to events from the stream and knows when it is finished.
});

gulp.task('server', function(){
  connect.server({
    root: ['www'],
    port: 9000,
    livereload: true
  });
});

gulp.task('watch', function(){
    livereload.listen();
    gulp.watch(paths.sass, ['sass']);
    gulp.watch(paths.src, ['compile']);
});

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
  .pipe(sass({
        compass: true,
        errLogToConsole:true
        }))
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({
      extname: '.min.css'
    }))
    .pipe(gulp.dest('./www/css/'))
    .pipe(livereload())
    .on('end', done);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});

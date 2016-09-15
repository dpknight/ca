'use-strict';
var gulp = require('gulp');
var watch = require('gulp-watch');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var cp = require('child_process');
var jade = require('gulp-jade');
var jadeToPHP = require('gulp-jade2php');
var pugTwo = require('gulp-pug2');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var connect = require('gulp-connect-php');
var jadePHP = require('gulp-jade-php');
var browserSync = require('browser-sync');
var php = [];


var jekyll   = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';
var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};


/**
 * Build the Jekyll Site
 */
gulp.task('jekyll-build', function (done) {
    browserSync.notify(messages.jekyllBuild);
    return cp.spawn( jekyll , ['build'], {stdio: 'inherit'})
        .on('close', done);
});



/**
 * Rebuild Jekyll & do page reload
 */
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
    browserSync.reload();
});


/**
 * Compile files from _scss into both _site/css (for live injecting) and site (for future jekyll builds)
 */
gulp.task('sass', function () {
    return gulp.src('assets/css/main.scss')
        .pipe(sass({
            includePaths: ['css'],
            onError: browserSync.notify
        }))
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(gulp.dest('_site/assets/css'))
        .pipe(browserSync.reload({stream:true}))
        .pipe(gulp.dest('assets/css'));
});

/**
  * Watch jade files for changes & recompile
  */
gulp.task('jade', function (){
  return gulp.src('_jade/*.jade')
    .pipe(jade())
    .pipe(gulp.dest('_includes'));
});

/**
  * Watch js files for changes & recompile
  */
gulp.task('scripts', function() {
  return gulp.src('assets/js/**/*.js')
    .pipe(gulp.dest('_site/assets/js'))
    .pipe(browserSync.reload({stream:true}))
    .pipe(gulp.dest('assets/js'));
});

/*
  * Task to handle changes to PHP files
  */
gulp.task('php', function() {
  return gulp.src('_php/**/*.php')
  .pipe(gulp.dest('_site/assets/php'))
  .pipe(browserSync.reload({stream:true}))
  .pipe(gulp.dest('assets/php/'));
});

/*
* Compile Jade files to PHP
*/
gulp.task('jadeToPHP', function() {

});

/*
  * PHP Server Conncetion/Creation
  */
gulp.task('connect-sync', function() {
  return connect.server();
  });

/**
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 * Watch for jade files, run jekyll & reload BrowserSync
 * Watch for js files, run jekyll & reload BrowserSync
 */
gulp.task('watch', function () {
    gulp.watch('assets/css/**', ['sass']);
    gulp.watch(['*.html', '_layouts/*.html', '_posts/*', '_includes/*', '_php/*'], ['jekyll-rebuild']);
    gulp.watch('_jade/*.jade', ['jade']);
    gulp.watch('assets/js/**/*.js', ['scripts']);
    gulp.watch('_php/**/*.php', ['php']);
});

/**
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('browser-sync', ['connect-sync', 'sass', 'scripts', 'jade', 'php', 'jekyll-build'], function() {
    browserSync({
        server: {
          baseDir: '_site'
        },
        notify: false // Hide the browser-sync message box
    });
});

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', ['browser-sync', 'watch']);

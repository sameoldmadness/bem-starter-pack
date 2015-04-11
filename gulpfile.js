var fs = require('fs');
var path = require('path');

var gulp = require('gulp');

// Load all gulp plugins automatically
// and attach them to the `plugins` object
var plugins = require('gulp-load-plugins')();

// Temporary solution until gulp 4
// https://github.com/gulpjs/gulp/issues/355
var runSequence = require('run-sequence');

var pkg = require('./package.json');

gulp.task('clean', function (done) {
    require('del')(['dist', 'bower_components'], done);
});

gulp.task('copy', [
    'copy:bem-components',
    'copy:license',
    'copy:misc'
]);

gulp.task('copy:bem-components', function () {
    return gulp.src([
                    'bower_components/bem-components-dist/desktop/bem-components.css',
                    'bower_components/bem-components-dist/desktop/bem-components.ie.css',
                    'bower_components/bem-components-dist/desktop/bem-components.js+bh.js'
                ])
               .pipe(gulp.dest('dist/vendor/bem-components'));
});

gulp.task('copy:license', function () {
    return gulp.src('LICENSE.txt')
               .pipe(gulp.dest('dist'));
});

gulp.task('copy:misc', function () {
    return gulp.src(['src/**/*'], { dot : true })
               .pipe(gulp.dest('dist'));
});

gulp.task('lint:js', function () {
    return gulp.src([
        'gulpfile.js',
        'src/js/*.js'
    ]).pipe(plugins.jscs())
      .pipe(plugins.jshint())
      .pipe(plugins.jshint.reporter('jshint-stylish'))
      .pipe(plugins.jshint.reporter('fail'));
});

gulp.task('install:bower', function () {
    return plugins.bower();
});

gulp.task('build', function (done) {
    runSequence(
        ['clean', 'lint:js'],
        'install:bower',
        'copy',
    done);
});

gulp.task('default', ['build']);

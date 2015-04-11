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
    'copy:index.html',
    'copy:jquery',
    'copy:bem-components',
    'copy:license',
    // 'copy:main.css',
    'copy:misc'
]);

gulp.task('copy:index.html', function () {
    return gulp.src('src/index.html')
               .pipe(plugins.replace(/{{JQUERY_VERSION}}/g, pkg.devDependencies.jquery))
               .pipe(gulp.dest('dist'));
});

gulp.task('copy:jquery', function () {
    return gulp.src('node_modules/jquery/dist/jquery.min.js')
               .pipe(plugins.rename('jquery-' + pkg.devDependencies.jquery + '.min.js'))
               .pipe(gulp.dest('dist/vendor/jquery'));
});

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
    return gulp.src([

        // Copy all files
        'src/**/*',

        // Exclude the following files
        // (other tasks will handle the copying of these files)
        '!src/index.html'

    ], {

        // Include hidden files by default
        dot : true

    }).pipe(gulp.dest('dist'));
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

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

gulp.task('archive:create_archive_dir', function () {
    fs.mkdirSync(path.resolve('archive'), '0755');
});

gulp.task('archive:zip', function (done) {

    var archiveName = path.resolve('archive', pkg.name + '_v' + pkg.version + '.zip');
    var archiver = require('archiver')('zip');
    var files = require('glob').sync('**/*.*', {
        cwd : 'dist',
        dot : true // include hidden files
    });
    var output = fs.createWriteStream(archiveName);

    archiver.on('error', function (error) {
        done();
        throw error;
    });

    output.on('close', done);

    files.forEach(function (file) {

        var filePath = path.resolve('dist', file);

        // `archiver.bulk` does not maintain the file
        // permissions, so we need to add files individually
        archiver.append(fs.createReadStream(filePath), {
            name : file,
            mode : fs.statSync(filePath)
        });

    });

    archiver.pipe(output);
    archiver.finalize();
});

gulp.task('clean', function (done) {
    require('del')(['archive', 'dist', 'bower_components'], done);
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

gulp.task('archive', function (done) {
    runSequence(
        'build',
        'archive:create_archive_dir',
        'archive:zip',
    done);
});

gulp.task('build', function (done) {
    runSequence(
        ['clean', 'lint:js'],
        'install:bower',
        'copy',
    done);
});

gulp.task('default', ['build']);

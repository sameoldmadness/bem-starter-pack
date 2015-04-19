/* jshint mocha: true */

var assert = require('assert'),
    fs = require('fs'),
    path = require('path'),

    pkg = require('../package.json'),

    expectedFilesInArchiveDir = [
        pkg.name + '_v' + pkg.version + '.zip'
    ],

    expectedFilesInDistDir = [
        'css/',
            'css/app.css',

        'index.html',

        'js/',
            'js/app.js',
            'js/bem-starter-pack.js',

        'vendor/',
            'vendor/bem-components/',
                'vendor/bem-components/bem-components.css',
                'vendor/bem-components/bem-components.ie.css',
                'vendor/bem-components/bem-components.js+bh.js',

        'LICENSE.txt'
    ];

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

function checkFiles(directory, expectedFiles) {

    // Get the list of files from the specified directory
    var files = require('glob').sync('**/*', {
        'cwd' : directory,
        'dot' : true,      // include hidden files
        'mark' : true      // add a `/` character to directory matches
    });

    // Check if all expected files are present in the
    // specified directory, and are of the expected type
    expectedFiles.forEach(function (file) {
        var ok = false,
            expectedFileType = (file.slice(-1) !== '/'? 'regular file' : 'directory');

        // If file exists
        if(files.indexOf(file) !== -1) {

            // Check if the file is of the correct type
            if(file.slice(-1) !== '/') {
                // Check if the file is really a regular file
                ok = fs.statSync(path.resolve(directory, file)).isFile();
            } else {
                // Check if the file is a directory
                // (Since glob adds the `/` character to directory matches,
                // we can simply check if the `/` character is present)
                ok = (files[files.indexOf(file)].slice(-1) === '/');
            }

        }

        it('"' + file + '" should be present and it should be a ' + expectedFileType, function () {
            assert.equal(true, ok);
        });
    });

    // List all files that should be NOT
    // be present in the specified directory
    (files.filter(function (file) {
        return expectedFiles.indexOf(file) === -1;
    })).forEach(function (file) {
        it('"' + file + '" should NOT be present', function () {
            assert(false);
        });
    });

}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

function runTests() {
    describe('Test if all the expected files, and only them, are present in the build directories', function () {
        describe('archive', function () {
            checkFiles('archive', expectedFilesInArchiveDir);
        });

        describe('dist', function () {
            checkFiles('dist', expectedFilesInDistDir);
        });
    });
}

runTests();

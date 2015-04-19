/* jshint mocha: true */

var assert = require('assert'),
    fs = require('fs'),
    path = require('path'),

    pkg = require('./../package.json');

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

function checkString(file, string, done) {
    var character = '',
        matchFound = false,
        matchedPositions = 0,
        readStream = fs.createReadStream(file, { 'encoding' : 'utf8' });

    readStream.on('close', done);
    readStream.on('error', done);
    readStream.on('readable', function () {
        // Read file until the string is found
        // or the whole file has been read
        while(matchFound !== true &&
                (character = readStream.read(1)) !== null) {

            if(character === string.charAt(matchedPositions)) {
                matchedPositions += 1;
            } else {
                matchedPositions = 0;
            }

            if(matchedPositions === string.length) {
                matchFound = true;
            }

        }

        assert.equal(true, matchFound);
        this.close();
    });
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

function runTests() {
    describe('Test if the files from the "dist" directory have the expected content', function () {
        it('"app.css" should have block style example', function (done) {
            var string = '.app {';

            checkString(path.resolve('dist', 'css/app.css'), string, done);
        });

        it('"app.js" should have template example', function (done) {
            var string = 'BEM.HTML.match(\'app\', function (ctx) {';

            checkString(path.resolve('dist', 'js/app.js'), string, done);
        });

        it('"app.js" should have app init example', function (done) {
            var string = 'BEM.DOM.append(\'body\', BEM.HTML.apply({ block : \'app\' }));';

            checkString(path.resolve('dist', 'js/app.js'), string, done);
        });

        it('"bem-starter-pack.js" should have "onready" function', function (done) {
            var string = 'function BEM(fn) {';

            checkString(path.resolve('dist', 'js/bem-starter-pack.js'), string, done);
        });

        it('"index.html" should have ie8 css shim', function (done) {
            var string = '<!--[if lt IE 9]>';

            checkString(path.resolve('dist', 'index.html'), string, done);
        });
    });
}

runTests();

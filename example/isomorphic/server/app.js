var BEM = require('../../../src/js/trivial-bem.js')

BEM(function(HTML, DOM) {
	HTML.match('foo', function (ctx) {
		ctx.content('bar');
	});

	console.log(HTML.apply('foo'));
});
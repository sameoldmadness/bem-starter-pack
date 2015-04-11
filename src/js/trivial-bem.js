(function(global) {
	var BEM;

	if(typeof exports === 'object') {
	    BEM = function(fn) {
			var BEMHTML = require('../../bower_components/bem-components-dist/desktop/bem-components.dev.bh.js');
	
	    	fn(BEMHTML);
	    };

	    module.exports = BEM;
	}
	else {
		BEM = function(fn) {
		    modules.require(['bh', 'i-bem__dom'], function(BEMHTML, BEMDOM) {
		        fn(BEMHTML, BEMDOM);
		    });
	    };

	    global.BEM = BEM;
	}
})(this);
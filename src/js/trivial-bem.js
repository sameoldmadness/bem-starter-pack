function BEM(fn) {
    modules.require(['bh', 'i-bem__dom', 'jquery'], function(BEMHTML, BEMDOM, $) {
        BEM.HTML = BEMHTML;
        BEM.DOM = BEMDOM;
        fn();
    });
}

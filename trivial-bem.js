function BEM(fn) {
    modules.require(['bh', 'i-bem__dom'], function(BEMHTML, BEMDOM) {
        BEM.HTML = BEMHTML;
        BEM.DOM = BEMDOM;
        fn();
    });
}

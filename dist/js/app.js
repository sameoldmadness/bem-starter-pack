BEM(function() {
    BEM.HTML.match('app', function (ctx) {
        ctx.tag('p').content('Hello world! This is trivial BEM.');
    });

    BEM.DOM.append('body', BEM.HTML.apply({ block : 'app' }));
});

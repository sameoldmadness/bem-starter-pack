BEM(function() {
    BEM.HTML.match('app', function (ctx) {
        ctx.tag('p').content('Hello world! This is bem-starter-pack.');
    });

    BEM.DOM.append('body', BEM.HTML.apply({ block : 'app' }));
});

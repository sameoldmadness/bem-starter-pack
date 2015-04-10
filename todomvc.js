BEM(function() {

// todomvc

BEM.HTML.match('todomvc', function(ctx) {
    ctx.content([
        { block : 'header', title : 'ToDo MVC' },
        { block : 'footer' }
    ])
});

// header

BEM.HTML.match('header', function(ctx) {
    ctx.js(true);
    ctx.content(ctx.param('title'));
});

BEM.DOM.decl('header', {
    onSetMod : {
        js : {
            inited : function() {
                this.bindTo('click', function() {
                    this.setMod('bla');
                });
            }
        }
    }
});

// footer

BEM.DOM.append('body', BEM.HTML.apply({ block: 'todomvc' }));

});



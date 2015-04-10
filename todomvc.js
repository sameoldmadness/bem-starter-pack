BEM(function() {

// todomvc

BEM.HTML.match('todomvc', function(ctx) {
    ctx.js(true);
    ctx.content([
        { block : 'header', title : 'ToDo MVC' },
        { block : 'search' },
        { block : 'results' }
    ])
});

BEM.DOM.decl('todomvc', {
    onSetMod : {
        js : {
            inited : function() {
                var search = this.findBlockInside('search');
                var results = this.findBlockInside('results');

                search.on('submit', function(event, data) {
                    BEM.DOM.update(results.domElem, 'You searched: ' + data.query);
                });
            }
        } 
    }
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

// search

BEM.HTML.match('search', function(ctx) {
    ctx.js(true);
    ctx.content([
        {
            block : 'input',
            mods : { 
                theme : 'islands',
                size: 'm',
                type : 'search'
            },
            placeholder : 'Enter your question'
        },
        {
            block : 'button',
            mods : { 
                theme : 'islands', 
                size : 'm', 
                type : 'submit',
                view : 'action',
                disabled : true
            },
            text : 'Search'
        }
    ]);
});

BEM.DOM.decl('search', {
    onSetMod : {
        js : {
            inited : function() {
                var that = this;
                var input = this.findBlockInside('input');
                var button = this.findBlockInside('button');

                input.on('change', function() {
                    button.setMod('disabled', input.getVal() === '');
                });

                button.on('click', function() {
                    that.emit('submit', {
                        query: input.getVal()
                    });
                });
            }
        }
    }
});

BEM.DOM.append('body', BEM.HTML.apply({ block: 'todomvc' }));
    
});

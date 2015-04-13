# Usage

Once you have cloned or downloaded bem-starter-pack, you've got a nice setup that allows you to create blocks — independent components of your application.

A rich library of builin blocks is also avaliable.

Let's start with using standard blocks in our application.

## Standard blocks library

### Attaching standard block on a page

This project includes [bem-components][bem-components] library, that provides a lot of blocks such as button, input, textarea, and [many more][bem-components blocks].

```js
BEM.DOM.append('body', BEM.HTML.apply({
    block: 'button',
    content: 'Submit'
}));
```

Let's see what's going on here.

Every block can be described with a JSON object:

```js
var buttonJson = {
    block: 'button',
    content: 'Submit'
};
```

The only required field is `block` — a block's name.

You can read more about this format in [bemjson][bemjson] documentation.

After defining an object, we should use BEM.HTML.apply to compile it to HTML:

```js
var buttonHTML = BEM.HTML.apply(buttonJSON);
```

[BH][BH] template engine is in charge of the compilation `bemjson` to `html`.

Then we can leverage BEM.DOM.append method to attach HTML into the page:

```js
var button = BEM.DOM.append('body', buttonHTML);
```

Further documentation on BEM.DOM can be found [here][i-bem].

### Block customization

Block can be customised via modifications.

i.e. we could change a buttons's theme by adding to modificators: theme and size.

```js
var json = {
    block: 'button',
    mods: {
        theme: 'islands',
        size: 'm'
    },
    content: 'Нажми меня'    
}
```

All avaliable modificators are listed on a [block's page][bem-components button].

### Взаимодействие с блоком

Block can be managed either with events or with direct modification change:

```js
button.on('click', function () {
    console.log('кнопка был нажата');

    button.setMod('disabled');
});
```

## Creating custom block

Creating template:

```js
BEM.HTML.match('paragraph', function (ctx) {
    // указываем тэг блока
    ctx.tag('p');

    // задаём содержимое
    ctx.content([
        { 
            elem: 'foo',
            content: 'test'
        },
        {
            elem: 'bar',
            content: 'test'
        }
    ]);
});
```

Defining behavior:

```js
BEM.DOM.decl('paragraph', {
    onSetMod: {
        js: {
            inited: function () {
                // constructor
            }
        },

        expanded: function () {
            this.trigger('ho-ho-ho');
        }
    },
});
```

Setting up styles:

```css
.paragraph {
    color: red;
}
```


<!-- Links -->

[bem-core]: https://ru.bem.info/libs/bem-core/v2.6.0/
[bem-components]: https://ru.bem.info/libs/bem-components/v2.1.0/
[bem-components blocks]: https://ru.bem.info/libs/bem-components/v2.1.0/#Блоки
[bem-components button]: https://ru.bem.info/libs/bem-components/v2.1.0/desktop/button/

[bemjson]: https://ru.bem.info/technology/bemjson/v2/bemjson/
[bem-components-dist]: https://github.com/bem/bem-components-dist
[i-bem]: https://ru.bem.info/technology/i-bem/v2/i-bem-js/
[i-bem events]: https://ru.bem.info/technology/i-bem/v2/i-bem-js/#%D0%94%D0%B5%D0%BB%D0%B5%D0%B3%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5-%D1%81%D0%BE%D0%B1%D1%8B%D1%82%D0%B8%D0%B9
[bh]: https://ru.bem.info/technology/bh/v4/about/
[getbem]: http://getbem.com/
[pen]: http://codepen.io/sameoldmadness/pen/vEqeVB?editors=001

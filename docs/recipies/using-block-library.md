Using block library
===================

Let's say we need a spinner to visualize content loading process.

## Inserting block into the page

We can go to the page with a [list of avaliable blocks][bem-components] and look through it.

It seems like the [spin][bem-components blocks spin] is the right one.

Scroll down to the examples, click on `bemjson` tab, copy and paste blocks' json:

```js
var spinJSON = {
    block : 'spin',
    mods : { theme : 'islands', size : 'm', visible : true }
};
```

Now we should compile this `json` to actual `html` and insert it into the page:

```js
var spinHTML = BEM.HTML.apply(spinJSON);

BEM.DOM.append('body', spinHTML);
```

Of course, we don't always want to attach out block to the body, right?

In fact, we can choose any valid [jQuery selector][jquery selectors] as a mounting point:

```js
BEM.DOM.append('.container > .wrapper', spinHTML);
```

But what if we want to prepend our block instead of appending it?

Well, we've got your back. BEM.DOM provides a handfull of helpful methods: append, prepend, update and replace. 

You can read more about them [here][i-bem rendering]. For now, it's in Russian only. But they're quite self-descriptive, arent they?

## Configuring block

Now we can tune our block up a little.

Let's say we want it to be smaller: lets tweak its `size` modificator.

```js
var spinJSON = {
    block : 'spin',
    mods : { theme : 'islands', size : 's', visible : true }
};
```

Now our block will be rendered with `s` size modificator.

[bem-components blocks]: https://en.bem.info/libs/bem-components/v2.1.0/#Blocks
[bem-components blocks spin]: https://en.bem.info/libs/bem-components/v2.1.0/desktop/spin/

[jquery selectors]: https://api.jquery.com/category/selectors/
[i-bem rendering]: https://ru.bem.info/technology/i-bem/v2/i-bem-js/#Динамическое-обновление-блоков-и-элементов-в-dom-дереве

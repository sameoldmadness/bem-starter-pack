## Что это и зачем?

Шаблон для быстрого старта на БЭМ-стеке.

Минимум технологий, но расширяемый.

Подходит для 

* ознакомления с БЭМ
* быстрого прототипирования
* небольших проектов

Позволяет создавать БЭМ-блоки, состоящие из

* шаблона (html)
* стилей (css)
* поведения (js)

Предлагается использовать библиотеку готовых блоков, а также создавать собственные блоки.

## Библиотека блоков

### Вставка блока на страницу

В проекте подключена библиотека готовых блоков [bem-components][bem-components]. Доступны такие блоки, как button, input, textarea, а также [многие другие][bem-components blocks].

```js
BEM.DOM.append('body', BEM.HTML.apply({
    block: 'button',
    content: 'Submit'
}));
```

Разберём подробно этот пример.

Любой блок может быть описан в виде json-объекта:

```js
var buttonJson = {
    block: 'button',
    content: 'Submit'
};
```

В объекте указывается название блока и перечисляются его модификаторы. Этот формат назвается [bemjson][bemjson].

Чтобы преобразовать этот объект в html-код, используется метод BEM.HTML.apply:

```js
var buttonHTML = BEM.HTML.apply(buttonJSON);
```

За преобразование `bemjson` в `html` отвечает шаблонизатор [BH][BH].

Для вставки полученного `html` в документ используется ещё один вспомогательный метод — BEM.DOM.append:

```js
var button = BEM.DOM.append('body', buttonHTML);
```

Подробнее про этот метод можно прочитать в документации [i-bem][i-bem].

Использование специального метода для вставки блока обусловлено тем, что, кроме непосредственно вставки html-кода, также происходит инициализация js-представления блока.

### Настройка блока

Настройка блока происходит путём установки его модификаторов.

Продолжая пример с кнопкой, настроим её внешний вид и зададим текст:

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

Все доступные модификаторы перечислены [на странце блока][bem-components button].

### Взаимодействие с блоком

Существует два способа взаимодействия с блоком: подписка на события и изменение модификаторов:

```js
button.on('click', function () {
    console.log('кнопка был нажата');

    button.setMod('disabled');
});
```

Для вставки используется специальный метод: он не только вставляет код в шаблон, но и инициализирует js-представление кнопки. так, при нажатии на кнопку будет вызвано BEM-событие click. Про разницу между dom-событиями и bem-событиями можно почитать [тут][i-bem events].

## Как создать собственный компонент TODO

Задаём разметку блока:

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

Задаём поведение блока:

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

Интерфейс блока формируется из событий и модификаторов

Задаём внешний вид блока.

Просто создаём стили с учётом bem naming convention (link)

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

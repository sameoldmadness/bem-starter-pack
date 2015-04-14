BEM(function () {

BEM.HTML.match('header', function (ctx) {
  ctx.tag('header');
  ctx.content([
    { elem: 'title', tag: 'h1', content: ctx.param('title') },
    { elem: 'subtitle', tag: 'h2', content: ctx.param('subtitle') },
    { elem: 'tagline', tag: 'h3', content: ctx.param('tagline') }
  ]);
});

BEM.HTML.match('codepen', function (ctx) {
  var config = ctx.param('config');

  Object.keys(config).forEach(function (key) {
    ctx.attr('data-' + key, config[key]);
  });
});

BEM.HTML.match('steps', function (ctx) {
  var steps = ctx.param('steps');

  ctx.tag('ul');

  ctx.content(steps.map(function (step) {
    return { elem: 'step', tag: 'li', content: step };
  }));
});

BEM.HTML.match('technologies', function (ctx) {
    ctx.content([
      {
        elem: 'item',
        title: 'js-библиотека i-bem',
        url: 'https://ru.bem.info/technology/i-bem/v2/i-bem-js/',
        code:
          'BEM.DOM.decl(\'form\', {\n' +
          '  onSetMod: {\n' +
          '    submit: function () {\n' +
          '      this.findBlockInside(\'button\')\n' +
          '          .setMod(\'disabled\');\n' +
          '    }\n' +
          '  }\n' +
          '});'
      },
      {
        elem: 'item',
        title: 'шаблонизатор bh',
        url: 'https://ru.bem.info/technology/bh/v4/about/',
        code:
          'bh.match(\'button\', function(ctx) {\n' +
          '  ctx.tag(\'button\')\n' +
          '     .attr(\'role\', \'button\')\n' +
          '     .mod(\'view\', \'action\')\n' +
          '     .content({ elem: \'text\' });' +
          '});'
      },
      {
        elem: 'item',
        title: 'библиотека блоков o2',
        url: 'https://ru.bem.info/libs/bem-components/v2.1.0/',
        examples: [
          {
            block : 'checkbox-group',
            mods : { theme : 'islands', size : 'm', type : 'button' },
            name : 'checkbox-button',
            options : [
                { val : 1, text : 'Блок' },
                { val : 2, text : 'Элемент' },
                { val : 3, text : 'Модификатор' }
            ]
          },
          {
              block : 'attach',
              mods : { theme : 'islands', size : 'm' },
              button : 'Выберите файл',
              noFileText : 'Файл не выбран'
          },
          {
              block : 'select',
              mods : { mode : 'check', theme : 'islands', size : 'm' },
              name : 'select1',
              val : [2, 3],
              text : 'Программа конференции',
              options : [
                  { val : 1, text : 'Доклад' },
                  { val : 2, text : 'Мастер-класс' },
                  { val : 3, text : 'Круглый стол' }
              ]
          }
        ]
      }
    ]);
});

BEM.HTML.match('technologies__item', function (ctx) {
  var code = ctx.param('code');
  var examples = ctx.param('examples');

  ctx.content([
    {
      block: 'link',
      mix: { block: 'technologies', elem: 'link' },
      mods: { theme: 'islands', size: 'xl' },
      url: ctx.param('url'),
      content: ctx.param('title'),
      target: '_blank'
    },
    code && { elem: 'code', content: code },
    examples && { elem: 'preview', examples: examples }
  ]);
});

BEM.HTML.match('technologies__code', function (ctx) {
  ctx.tag('pre');
});

BEM.HTML.match('technologies__preview', function (ctx) {
  ctx.content(ctx.param('examples').map(function (example) {
    return { elem: 'example', content: example };
  }));
});

BEM.DOM.append('body', BEM.HTML.apply([
  {
    block: 'section',
    content: [
      {
        block: 'header',
        title: 'BEM starter pack',
        subtitle: 'Шаблон для мгновеного старта на полном БЭМ-стеке'
      }
    ]
  },
  {
    block: 'section',
    mods: { type: 'secondary' },
    content: [
      {
        elem: 'title',
        content: 'Как начать?'
      },
      {
        block: 'steps',
        steps: [
          {
            block: 'button',
            mods: {
              theme: 'islands',
              size: 'xl',
              type: 'link',
              view: 'action'
            },
            url: 'https://github.com/sameoldmadness/bem-starter-pack/releases/download/1.0.0/bem-starter-pack_v1.0.0.zip',
            text: 'Скачать архив'
          },
          'Распаковать',
          'Открыть в браузере'
        ]
      },
      {
        elem: 'postscriptum',
        content: 'А можно просто поиграться в онлайн-редакторе'
      }
    ]
  },
  {
    block: 'codepen',
    config: {
      'height': 400,
      'theme-id': 0,
      'slug-hash': 'vEqeVB',
      'default-tab': 'js',
      'user': 'sameoldmadness'
    }
  },
  {
    block: 'section',
    mods: { codepen: 'after' },
    content: [
      {
        elem: 'title',
        content: 'Что под капотом?'
      },
      {
        block: 'technologies'
      }
    ]
  }
]));

});

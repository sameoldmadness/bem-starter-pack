BEM(function () {

var lang = (window.location.search
    .slice(1).split('&')
    .map(function (x) { return x.split('='); })
    .filter(function (x) { return x[0] === 'lang'; })[0] || [])[1];
var i18n = BEM.I18N(lang === 'ru' ? 'ru' : 'en');

BEM.HTML.match('github-ribbon', function (ctx) {
    ctx.tag('a');
    ctx.attr('href', ctx.param('url'));
    ctx.content({
        tag: 'img',
        attrs: {
            src: ctx.param('image'),
            alt: ctx.param('alt') || 'Fork me on GitHub'
        }
    })
});

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
        title: i18n('techBemLibTitle'),
        url: i18n('techBemLibLink'),
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
        title: i18n('techBhLibTitle'),
        url: i18n('techBhLibLink'),
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
        title: i18n('techComponentsLibTitle'),
        url: i18n('techComponentsLibLink'),
        examples: [
          {
            block : 'checkbox-group',
            mods : { theme : 'islands', size : 'm', type : 'button' },
            name : 'checkbox-button',
            options : [
                { val : 1, text : i18n('techComponentsLibCheckbox1') },
                { val : 2, text : i18n('techComponentsLibCheckbox2') },
                { val : 3, text : i18n('techComponentsLibCheckbox3') }
            ]
          },
          {
              block : 'attach',
              mods : { theme : 'islands', size : 'm' },
              button : i18n('techComponentsLibAttach1'),
              noFileText : i18n('techComponentsLibAttach2')
          },
          {
              block : 'select',
              mods : { mode : 'check', theme : 'islands', size : 'm' },
              name : 'select1',
              val : [2, 3],
              text : i18n('techComponentsLibSelect'),
              options : [
                  { val : 1, text : i18n('techComponentsLibSelect1') },
                  { val : 2, text : i18n('techComponentsLibSelect2') },
                  { val : 3, text : i18n('techComponentsLibSelect3') }
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

BEM.HTML.match('lang-switch', function (ctx) {
  ctx.content({
    block: 'link',
    url: i18n('langSwitchUrl'),
    content: i18n('langSwitchContent')
  });
});

BEM.DOM.append('body', BEM.HTML.apply([
  {
    block: 'lang-switch'
  },
  {
    block: 'github-ribbon',
    mods: { right: true },
    url: 'https://github.com/sameoldmadness/bem-starter-pack',
    image: 'https://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png'
  },
  {
    block: 'section',
    content: [
      {
        block: 'header',
        title: i18n('pageTitle'),
        subtitle: i18n('pageSubtitle')
      }
    ]
  },
  {
    block: 'section',
    mods: { type: 'secondary' },
    content: [
      {
        elem: 'title',
        content: i18n('whatIsBemTitle')
      },
      {
        elem: 'description',
        content: i18n('whatIsBemDescription')
      },
      {
        elem: 'description',
        content: i18n('whatIsBemDescription2')
      },
    ]
  },
  {
    block: 'section',
    mods: { type: 'secondary' },
    content: [
      {
        elem: 'title',
        content: i18n('howToStartTitle')
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
            text: i18n('howToStartStep1')
          },
          i18n('howToStartStep2'),
          i18n('howToStartStep3')
        ]
      },
      {
        elem: 'postscriptum',
        content: i18n('howToStartPS')
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
        content: i18n('techTitle'),
      },
      {
        block: 'technologies'
      }
    ]
  },
  {
    block: 'section',
    mods: { type: 'secondary' },
    content: [
      {
        elem: 'title',
        content: i18n('whatNextTitle')
      },
      {
        elem: 'description',
        content: i18n('whatNextDescription')
      },
      {
        elem: 'description',
        content: i18n('whatNextDescription2')
      }
    ]
  }
]));

});

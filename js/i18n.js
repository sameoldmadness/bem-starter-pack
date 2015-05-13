BEM(function () {
    var link = function (content, url) {
        return BEM.HTML.apply({
            block: 'link',
            mods: { theme: 'islands' },
            content: content,
            url: url
        });
    };

    var dict = {
        ru: {
            pageTitle: 'BEM starter pack',
            pageSubtitle: 'Шаблон для мгновеного старта на полном БЭМ-стеке',
            whatIsBemTitle: 'А что такое БЭМ?',
            whatIsBemDescription: 'БЭМ — методология разработки, а также набор инструментов, упрощающий эту самую разработку.',
            whatIsBemDescription2: 'Для начала будет полезно узнать, '+ link('что', 'https://ru.bem.info/method/definitions/') + ' такое БЭМ и ' + link('зачем', 'https://ru.bem.info/method/') + ' он нужен.<br>А затем — сразу к ' + link('туториалу', 'https://github.com/sameoldmadness/bem-starter-pack/blob/master/docs/tutorial.md') + ', создавать свой собственный блок.',
            techTitle: 'Что под капотом?',
            techBemLibTitle: 'js-библиотека i-bem',
            techBemLibLink: 'https://ru.bem.info/technology/i-bem/v2/i-bem-js/',
            techBhLibTitle: 'шаблонизатор bh',
            techBhLibLink: 'https://ru.bem.info/technology/bh/v4/about/',
            techComponentsLibTitle: 'библиотека блоков o2',
            techComponentsLibLink: 'https://ru.bem.info/libs/bem-components/v2.1.0/',
            techComponentsLibCheckbox1: 'Блок',
            techComponentsLibCheckbox2: 'Элемент',
            techComponentsLibCheckbox3: 'Модификатор',
            techComponentsLibAttach1: 'Выберите файл',
            techComponentsLibAttach2: 'Файл не выбран',
            techComponentsLibSelect: 'Программа конференции',
            techComponentsLibSelect1: 'Доклад',
            techComponentsLibSelect2: 'Мастер-класс',
            techComponentsLibSelect3: 'Круглый стол',
            howToStartTitle: 'Как начать?',
            howToStartStep1: 'Скачать архив',
            howToStartStep2: 'Распаковать',
            howToStartStep3: 'Открыть в браузере',
            howToStartPS: 'А можно просто поиграться в онлайн-редакторе',
            whatNextTitle: 'И что же дальше?',
            whatNextDescription: 'Тем, кто хочет стать настоящим БЕМ-ниндзей, стоит изучить ' + link('шаблонизатор', 'https://ru.bem.info/technology/bh/v4/about/') + ', ' + link('js-библиотеку', 'https://ru.bem.info/technology/i-bem/v2/i-bem-js/') + ' и <br>' + link('библиотеку блоков', 'https://ru.bem.info/libs/bem-components/v2.1.0/') + '. Затем можно посмотреть на ' + link('систему сборки', 'https://ru.bem.info/tools/bem/enb-bem-examples/') + ' и ' + link('загрузчик модулей', 'https://ru.bem.info/tools/bem/modules/') + '.',
            whatNextDescription2: 'Если же первоочередная задача — развернуть приложение на БЭМ-стеке,<br>вот вам ' + link('репозиторий', 'https://github.com/bem/project-stub') + ' и ' + link('статья', 'https://ru.bem.info/tutorials/project-stub/') + ' про него. Даже ' + link('yeoman-генератор', 'https://ru.bem.info/tools/bem/bem-stub/') + ' есть : )',
            langSwitchUrl: './index.html',
            langSwitchContent: 'English please'
        },

        en: {
            pageTitle: 'BEM starter pack',
            pageSubtitle: 'Full BEM-stack jumpstart template',
            whatIsBemTitle: 'What is BEM?',
            whatIsBemDescription: 'BEM is a development methodology and a set of tools designed to simplify development process.',
            whatIsBemDescription2: 'You can start with reading on ' + link('what', 'https://en.bem.info/method/definitions/') + ' BEM is and ' + link('what', 'https://en.bem.info/method/') + ' is it good for.<br>And then dive right into the ' + link('tutorial', 'https://github.com/sameoldmadness/bem-starter-pack/blob/master/docs/tutorial.md') + ' on creating your first block.',
            techTitle: 'What is under the hood?',
            techBemLibTitle: 'i-bem library',
            techBemLibLink: 'https://en.bem.info/technology/i-bem/v2/i-bem-js/',
            techBhLibTitle: 'bh template engine',
            techBhLibLink: 'https://en.bem.info/technology/bh/v4/about/',
            techComponentsLibTitle: 'o2 block library',
            techComponentsLibLink: 'https://en.bem.info/libs/bem-components/v2.1.0/',
            techComponentsLibCheckbox1: 'Block',
            techComponentsLibCheckbox2: 'Element',
            techComponentsLibCheckbox3: 'Modifier',
            techComponentsLibAttach1: 'Choose file',
            techComponentsLibAttach2: 'File not chosen',
            techComponentsLibSelect: 'Schedule',
            techComponentsLibSelect1: 'Talk',
            techComponentsLibSelect2: 'Workshop',
            techComponentsLibSelect3: 'Discussion',
            howToStartTitle: 'Where to start?',
            howToStartStep1: 'Download an archive',
            howToStartStep2: 'Extract',
            howToStartStep3: 'Open in browser',
            howToStartPS: 'On just play with online editor',
            whatNextTitle: 'What\'s next?',
            whatNextDescription: 'One who wants to become a BEM-ninja need to know ' + link('template engine', 'https://en.bem.info/technology/bh/v4/about/') + ', ' + link('js library', 'https://en.bem.info/technology/i-bem/v2/i-bem-js/') + ' and <br>' + link('blocks library', 'https://en.bem.info/libs/bem-components/v2.1.0/') + '. Then take a look at ' + link('build system', 'https://en.bem.info/tools/bem/enb-bem-examples/') + ' and ' + link('module loader', 'https://en.bem.info/tools/bem/modules/') + '.',
            whatNextDescription2: 'You can use ' + link('project-stub repository', 'https://github.com/bem/project-stub') + ' to quick full-BEM application setup.<br>Here\'s a descriptive ' + link('howto', 'https://ru.bem.info/tutorials/project-stub/') + '. There\'s even a ' + link('yeoman-generator', 'https://ru.bem.info/tools/bem/bem-stub/') + ' : )',
            langSwitchUrl: './index.html?lang=ru',
            langSwitchContent: 'По-русски, пожалуйста'
        }
    };

    BEM.I18N = function (lang) {
        return function (key) {
            return dict[lang][key];
        };
    };
});

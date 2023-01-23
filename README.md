# ШАБЛОН

- react 17
- webpack 5, css modules
- sass
- axios
- jest
- yarn
- prettier, eslint, stylelint
- semantic-release
- gitlab ci

# TO-DO

- Перенести ассеты в отдельную папку сборки
- Подключить шрифты
- Перевести конфиги вебпака на тс
- Переместить конфиги в папку config
- Добавить фича флаги на уровень вебпака
- Что-то с относительными путями бандла в dist index.html - не находит
- Добавить sass цвета, брейкпоинты и миксины
- Добавить полезные uikit компоненты (Flex, Container)
- Учитывать manifest из public
- Попробовать sentry
- Попробовать eslint-kit. Пример в суперапп
- Удалить старый реакт шаблон
- Написать скрипт makeAnIndexExports

- "typescript-plugin-css-modules": "4.1.1", не работает. Попробовать позже более новую версию

```
// tsconfig.json
"plugins": [{
  "name": "typescript-plugin-css-modules",
  "options": {
    "customMatcher": "\\.(c|le|sa|sc)ss$",
  }
}],

// settings.json vscode
"typescript.tsserver.pluginPaths": ["typescript-plugin-css-modules"],
```

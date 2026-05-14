module.exports = {
  overrides: [
    {
      files: ['src/**/*.css', 'src/**/*.scss'],
      extends: ['stylelint-config-standard', 'stylelint-config-standard-scss'],
      plugins: ['stylelint-scss'],
      ignoreFiles: ['node_modules/**/*', '**/*.html', '**/dist/**/*'],
      reportNeedlessDisables: true,
      rules: {
        'no-descending-specificity': null,
        'selector-class-pattern': '.',
        'scss/at-rule-no-unknown': true,
        'at-rule-no-unknown': null,
        'selector-pseudo-class-no-unknown': [true, { ignorePseudoClasses: ['global'] }],
        'scss/load-no-partial-leading-underscore': null,
      },
    },
  ],
};

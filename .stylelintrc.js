module.exports = {
  overrides: [
    {
      files: ["src/**/*.css", "src/**/*.scss"],
      customSyntax: require("postcss-scss"),
      extends: ["stylelint-config-standard"],
      plugins: ["stylelint-scss"],
      ignoreFiles: ["./node_modules/**/*", "**/*.html"],
      reportNeedlessDisables: true,
      rules: {
        "declaration-block-trailing-semicolon": "always",
        "no-descending-specificity": null,
        "selector-class-pattern": ".",
        "scss/at-rule-no-unknown": true,
        "at-rule-no-unknown": null,
        "selector-pseudo-class-no-unknown": [
          true,
          {
            "ignorePseudoClasses": ["global"]
          }
        ]
      }
    }
  ]
};

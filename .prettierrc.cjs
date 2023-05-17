module.exports = {
  printWidth: 80,
  tabWidth: 4,
  useTabs: false,
  singleQuote: true,
  overrides: [
    {
      files: ['*.js', '*.json'],
      options: {
        tabWidth: 2,
        trailingComma: 'none'
      }
    },
    {
      files: '*.php',
      options: {
        trailingCommaPHP: false,
        braceStyle: '1tbs',
        requirePragma: false,
        insertPragma: false,
        printWidth: 120
      }
    },
    {
      files: '*.scss',
      options: {
        tabWidth: 2,
        singleQuote: false,
        printWidth: 240
      }
    }
  ]
};

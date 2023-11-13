module.exports = {
  tabWidth: 2,
  useTabs: false,
  singleQuote: true,
  overrides: [
    {
      files: ['*.js', '*.json', '*.cjs', '*.tsx', '*.ts'],
      options: {
        tabWidth: 2,
        trailingComma: 'none'
      }
    },
    {
      files: '*.php',
      options: {
        plugins: ['@prettier/plugin-php'],
        tabWidth: 4,
        useTabs: true,
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

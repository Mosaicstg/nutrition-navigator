# Nutrition Navigator

- [Background Information](#description)
- [Development](#development)
- [Custom Post Types](#custom-post-types)
- [Custom Taxonomies](#custom-taxonomies)

## Background Information

This project is a WordPress plugin powered by PHP and React. With WordPress we're registering two custom post
types: `Programs` and `Organizations`.

These two custom post types are the backbone for a Vite/React/TypeScript app that renders a map on the frontend via a
WordPress shortcode.

This tool is a map search tool to be used by users in the D.C./Maryland/Virginia area to find locations, programs and
organizations offerings food for certain demographics.

### Code Stack

- [PHP](https://www.php.net/): `^7.x`
- [Vite](https://vitejs.dev/): `^4.x`
- [React](https://react.dev/): `^18.x`
- [TypeScript](https://www.typescriptlang.org/): `^5.x`
- [SASS](https://sass-lang.com/): `^1.x`

#### Linters

- [ESLint](https://eslint.org/)
- [Stylelint](https://stylelint.io/)

## Development

Setup Node and Composer packages to ensure code quality and formatting

### Node

Run the following to install node packages:

```bash
npm install
```

If you run into any issues installed please be sure you're using node v. `^18.x`.

### Composer

Run the following to install composer packages:

```bash
composer install
```

If you run into any issues installing packages be sure your version of php is v. `^7.3.x`.

### Git `pre-commit` hooks

To ensure code quality and formatting consistency across developers and commits we're using pre-commits to handle
linting, formatting and code sniffing.

Run the following to ensure `lint-staged` is set up on your machine:

```bash
npx mrm@2 lint-staged
```

In some instances `lint-staged` assumes hooks you want to set up so keep an eye on the `pacakge.json` file for any new
hook file patterns. If any new ones are added please remove them.

## Custom Post Types

- Programs
- Organizations

## Custom Taxonomies

- Program Types
    - Post type: Programs
- Venues
    - Post type: Programs
- Audiences
    - Post type: Programs


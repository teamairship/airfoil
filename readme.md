# airfoil CLI

A CLI for airfoil.

## Installation

Clone this repo to your machine, then run:

```
yarn install
yarn link
```

## Usage

```
airfoil <CMD>
```

[See available commands here](./docs/commands.md).

---

## Customizing your CLI

Check out the documentation at https://github.com/infinitered/gluegun/tree/master/docs.

## Publishing to NPM

To package your CLI up for NPM, do this:

```shell
$ npm login
$ npm whoami
$ npm lint
$ npm test
(if typescript, run `npm run build` here)
$ npm publish
```

# License

MIT - see LICENSE

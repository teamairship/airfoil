![Airfoil](/assets/airfoilLogo@2x.png)

# Airfoil CLI

A tool to get your project off the ground. :airplane:

## About

Airfoil is a collection of opinionated boilerplates and generators for
React Native. Its goal is to streamline the app creation process.

## Installation

Run the following command to install this command as a global binary:

```
npm install @airship/airfoil -g
```

## Usage

```
airfoil <CMD>
```

[See Airfoil Documentation](https://airfoil-docs.herokuapp.com/) ([Docs sourcecode](https://github.com/teamairship/airfoil-docs)).

---

## Customizing your CLI

Check out the documentation at https://github.com/infinitered/gluegun/tree/master/docs.

## Publishing to NPM

To package your CLI up for NPM, do this:

```shell
$ npm login
$ npm whoami
$ npm version [major|minor|patch] # bump the version number - [see docs for more info](https://docs.npmjs.com/cli/v7/commands/npm-version)
$ git push # Make sure that `develop` and `main` branches are in sync
$ npm publish # pre-publish script formats, lints, tests, and builds
```

## Dependencies

<!-- TODO: add steps for ensuring that airfoil works on user's machine (node, cocoapods, RN setup docs, etc.) -->

## Steps for Adding a New Template

add some steps here...

# License

MIT - see LICENSE

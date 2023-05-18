# Development

After [forking the repo from GitHub](https://help.github.com/articles/fork-a-repo) and [installing Node.js](https://nodejs.org/en):

```shell
git clone https://github.com/<your-name-here>/node-emoji
cd node-emoji
npm install
```

## Building

[tsup](https://tsup.egoist.dev) is used to build this package into both CommonJS and ECMAScript Modules output:

```shell
npm run build
```

You can run with [`tsup`'s `--watch` mode](https://tsup.egoist.dev/#watch-mode) to continuously rebuild as you make changes:

```shell
npm run build -- --watch
```

## Testing

[Jest](https://jestjs.io) is used for unit tests:

```shell
npm run test
```

You can run with [Jest's `--watch` mode](https://jestjs.io/docs/cli#--watch) to continuously rerun tests as you make changes:

```shell
npm run test -- --watch
```

## Type Checking

Separately from building, [TypeScript](https://typescriptlang.org)'s compiler can be used to type check code:

```shell
npm run compile
```

You can run with with [TypeScript's `-w`/`--watch` mode](https://www.typescriptlang.org/docs/handbook/compiler-options.html) to continuously rerun the type checker as you make changes:

```shell
npm run compile -- -w
```

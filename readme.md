# korn [![Build Status](https://travis-ci.org/SamVerschueren/korn.svg?branch=master)](https://travis-ci.org/SamVerschueren/korn)

> Front-end testing in a headless environment

This tool can be used to run your front-end tests in an environment without a display server, like Jenkins. The only requirement is [Docker](https://www.docker.com/).  The underlying container used by `korn` is [`circleci/node:X.Y.Z-browsers`](https://hub.docker.com/r/circleci/node/) depending on the `--node` flag provided.


## Install

```
$ npm install -g korn
```


## Usage

```
$ korn --help

	Usage
	  $ korn [cwd]

	Options
	  --verbose    Run in verbose mode [Default: false]
	  --node, -n   Node.js version to run your tests in [Default: Running Node.js version]
	  --flags, -f  Extra flags that are passed to the test command

	Example
	  $ korn -f=single-run
```


## Related

- [Trevor](https://github.com/vadimdemedes/trevor) - Your own Travis CI to run tests locally.


## License

MIT © [Sam Verschueren](https://github.com/SamVerschueren)

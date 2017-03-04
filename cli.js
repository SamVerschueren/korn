#!/usr/bin/env node
'use strict';
const meow = require('meow');
const Listr = require('listr');
const uuid = require('uuid/v1');
const commands = require('./lib/commands');
const prerequisite = require('./lib/prerequisite');

const cli = meow(`
	Usage
	  $ korn [cwd]

	Options
	  --verbose  Run in verbose mode [Default: false]
`);

const options = Object.assign({
	name: uuid()
}, cli.flags);

options.cwd = cli.input.length > 0 ? cli.input : process.cwd();

const tasks = new Listr([
	{
		title: 'Prerequisite check',
		task: () => prerequisite(options)
	},
	{
		title: 'Pulling image',
		task: () => commands.pull(options)
	},
	{
		title: 'Running test',
		task: ctx => commands.test(ctx, options)
	},
	{
		title: 'Cleaning up',
		task: () => commands.cleanup(options)
	}
], {
	showSubtasks: false,
	renderer: cli.flags.verbose ? 'verbose' : 'default'
});

tasks
	.run()
	.catch(() => {
		return commands.cleanup(options);
	});

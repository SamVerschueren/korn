'use strict';
const Listr = require('listr');
const execa = require('execa');
const hasYarn = require('has-yarn');

module.exports = options => new Listr([
	{
		title: 'Check `Docker` installation',
		task: () => execa('docker', ['--version'])
			.catch(() => {
				throw new Error('Docker could not be found, make sure to install it first https://www.docker.com/');
			})
	},
	{
		title: 'Check `yarn.lock`',
		task: ctx => {
			if (hasYarn(options.cwd)) {
				return execa.stdout('yarn', ['cache', 'dir'])
					.then(cacheDir => {
						ctx.yarnCacheDir = cacheDir;
					})
					.catch(() => { });
			}
		}
	}
]);

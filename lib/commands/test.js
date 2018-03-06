'use strict';
const util = require('../util');

module.exports = (ctx, options) => {
	let pkgMngr = 'npm';

	let args = [
		'run',
		'-e', 'CI=true',
		'-v', `${options.cwd}:/app`
	];

	if (ctx.yarnCacheDir) {
		pkgMngr = 'yarn';

		args = args.concat([
			'-v', `${ctx.yarnCacheDir}:/yarn_cache`
		]);
	}

	let flags = options.flags.length > 0 ? ' --' : '';

	for (const flag of options.flags) {
		flags += ` --${flag}`;
	}

	args = args.concat([
		'--name', options.name,
		'-t', 'circleci/node:8.9.4-browsers',
		'bash', '-c', `cp -r /app ~/app && cd ~/app && ${pkgMngr} install && ${pkgMngr} test${flags}`
	]);

	if (options.verbose) {
		console.log(`docker ${args.join(' ')}`);
	}

	return util.exec('docker', args);
};

'use strict';
const util = require('../util');

module.exports = (ctx, options) => {
	let install = 'npm install';

	let args = [
		'run',
		'-e', 'CI=true',
		'-v', `${options.cwd}:/app`
	];

	if (ctx.yarnCacheDir) {
		install = 'yarn';

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
		'-t', 'circleci/node:6-browsers',
		'bash', '-c', `cd /app && ${install} && npm test${flags}`
	]);

	return util.exec('docker', args);
};

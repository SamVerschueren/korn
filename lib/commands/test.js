'use strict';
const util = require('../util');

module.exports = (ctx, options) => {
	let install = 'npm install';

	let args = [
		'run',
		'-v', `${options.cwd}:/app`
	];

	if (ctx.yarnCacheDir) {
		install = 'yarn';

		args = args.concat([
			'-v', `${ctx.yarnCacheDir}:/yarn_cache`
		]);
	}

	args = args.concat([
		'--name', options.name,
		'-t', 'samverschueren/node-chromium-xvfb',
		'bash', '-c', `cd /app && ${install} && npm test -- --single-run`
	]);

	return util.exec('docker', args);
};

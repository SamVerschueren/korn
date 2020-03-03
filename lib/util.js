'use strict';
const merge = require('rxjs').merge;
const filter = require('rxjs/operators').filter;
const execa = require('execa');
const streamToObservable = require('stream-to-observable');
const split = require('split');

exports.exec = (cmd, args) => {
	// Use `Observable` support if merged https://github.com/sindresorhus/execa/pull/26
	const cp = execa(cmd, args);

	return merge(
		streamToObservable(cp.stdout.pipe(split()), {await: cp}),
		streamToObservable(cp.stderr.pipe(split()), {await: cp})
	).pipe(filter(Boolean));
};

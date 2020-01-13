/* eslint-disable import/no-unassigned-import */
'use strict';
const execa = require('execa');
const streamToObservable = require('stream-to-observable');
const split = require('split');
const {Observable} = require('rxjs/Observable');
require('rxjs/add/observable/merge');
require('rxjs/add/operator/filter');

exports.exec = (cmd, args) => {
	// Use `Observable` support if merged https://github.com/sindresorhus/execa/pull/26
	const cp = execa(cmd, args);

	return Observable.merge(
		streamToObservable(cp.stdout.pipe(split()), {await: cp}),
		streamToObservable(cp.stderr.pipe(split()), {await: cp})
	).filter(Boolean);
};

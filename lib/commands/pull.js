'use strict';
const util = require('../util');

module.exports = options => util.exec('docker', ['pull', `circleci/node:${options.node}-browsers`]);

'use strict';
const util = require('../util');

module.exports = () => util.exec('docker', ['pull', 'circleci/node:8.9.4-browsers']);

'use strict';
const util = require('../util');

module.exports = options => util.exec('docker', ['rm', '-f', options.name]);

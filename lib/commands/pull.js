'use strict';
const util = require('../util');

module.exports = () => util.exec('docker', ['pull', 'samverschueren/node-chromium-xvfb']);

'use strict';

var _Store = require('./Store');

var _Store2 = _interopRequireDefault(_Store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log('Worker started...');

_Store2.default.keys().then(function (keys) {
  console.log(keys);
});
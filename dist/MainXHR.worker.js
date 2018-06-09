'use strict';

var _register = require('promise-worker/register');

var _register2 = _interopRequireDefault(_register);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var chunkSize = 5;

var partitionKeysToExpire = function partitionKeysToExpire(keysAboutToExpire) {
  var i = 0;
  var returnValue = [];
  while (i < keysAboutToExpire.length) {
    returnValue.push(keysAboutToExpire.slice(i, i + chunkSize));
    i += chunkSize;
  }
  return returnValue;
};

(0, _register2.default)(function (keysAboutToExpire) {
  console.log(partitionKeysToExpire(keysAboutToExpire));
});
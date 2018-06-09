'use strict';

var _promiseWorker = require('promise-worker');

var _promiseWorker2 = _interopRequireDefault(_promiseWorker);

var _MainXHR = require('./MainXHR.worker');

var _MainXHR2 = _interopRequireDefault(_MainXHR);

var _Store = require('./Store');

var _Store2 = _interopRequireDefault(_Store);

var _DateUtils = require('./DateUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TIMEOUT = 4000;

var iterateOverStore = function iterateOverStore() {
  var keysAboutToExpire = [];
  var checkKeysForExpiry = function checkKeysForExpiry(value) {
    if (value.lastFetchedAt === null || (0, _DateUtils.getCurrentTimeStamp)() - value.lastFetchedAt > value.prefetchTimeout - TIMEOUT) {
      keysAboutToExpire.push(value);
    }
  };
  _Store2.default.iterate(checkKeysForExpiry).then(function () {
    console.log(keysAboutToExpire); // eslint-disable-line
    var worker = new _MainXHR2.default();
    var promiseWorker = new _promiseWorker2.default(worker);
    promiseWorker.postMessage(keysAboutToExpire).then(function () {
      worker.terminate();
    }).catch(function (error) {
      console.error('Error while working on fetching XHR calls.', error); // eslint-disable-line
      worker.terminate();
    });
  }).catch(function (err) {
    console.error('Error white iterating over data store.', err); // eslint-disable-line
  });
};

setInterval(function () {
  iterateOverStore();
}, TIMEOUT);
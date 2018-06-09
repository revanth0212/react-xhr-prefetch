'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _localforage = require('localforage');

var _localforage2 = _interopRequireDefault(_localforage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_localforage2.default.config({
  driver: _localforage2.default.INDEXEDDB, // Force INDEXEDDB
  name: 'prefetch',
  version: 1.0,
  storeName: 'prefetch',
  description: 'Prefetch DB'
});

var store = _localforage2.default.createInstance({
  name: 'prefetch'
});

store.clear();

exports.default = store;
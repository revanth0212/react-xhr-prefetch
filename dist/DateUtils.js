"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var getCurrentTimeStamp = exports.getCurrentTimeStamp = function getCurrentTimeStamp() {
  return +new Date();
};

var getTimeDifference = exports.getTimeDifference = function getTimeDifference(t1, t2) {
  return (t1 - t2) / 1000;
};
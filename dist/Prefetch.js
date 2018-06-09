'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Store = require('./Store');

var _Store2 = _interopRequireDefault(_Store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Prefetch = function (_React$Component) {
  _inherits(Prefetch, _React$Component);

  function Prefetch() {
    _classCallCheck(this, Prefetch);

    return _possibleConstructorReturn(this, (Prefetch.__proto__ || Object.getPrototypeOf(Prefetch)).apply(this, arguments));
  }

  _createClass(Prefetch, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _props = this.props,
          url = _props.url,
          _props$enable = _props.enable,
          enable = _props$enable === undefined ? false : _props$enable,
          prefetchTimeout = _props.prefetchTimeout;

      if (enable) {
        _Store2.default.setItem(url, { url: url, prefetchTimeout: prefetchTimeout, lastFetchedAt: null });
      }
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(newProps) {
      var _props2 = this.props,
          oldURL = _props2.url,
          oldPrefetchTimeout = _props2.prefetchTimeout,
          oldEnable = _props2.enable;
      var newURL = newProps.url,
          newPrefetchTimeout = newProps.prefetchTimeout,
          newEnable = newProps.enable;

      if (newEnable) {
        if (!oldEnable) {
          _Store2.default.setItem(newURL, { url: newURL, prefetchTimeout: newPrefetchTimeout, lastFetchedAt: null });
        } else if (oldURL !== newURL || oldPrefetchTimeout !== newPrefetchTimeout) {
          _Store2.default.getItem(oldURL).then(function (oldConfig) {
            _Store2.default.setItem(newURL, {
              url: newURL,
              prefetchTimeout: newPrefetchTimeout,
              lastFetchedAt: oldConfig.lastFetchedAt
            }).then(function () {
              _Store2.default.removeItem(oldURL);
            }).catch(function (err) {
              console.warn('Unable to set value for ' + newURL + ' in DB', err); // eslint-disable-line
            });
          }).catch(function (err) {
            console.warn('Unable to find value for ' + oldURL + ' in DB', err); // eslint-disable-line
          });
        }
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _Store2.default.removeItem(this.props.url);
    }
  }, {
    key: 'render',
    value: function render() {
      return this.props.children;
    }
  }]);

  return Prefetch;
}(_react2.default.Component);

exports.default = Prefetch;
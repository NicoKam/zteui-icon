'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

require('../../assets/iconfont/iconfont');

require('../../assets/Zcon.css');

require('../../assets/iconfont/iconfont.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PREFIX = 'zteicon';

var px = function px(clsName) {
  return PREFIX + '-' + clsName;
};

var classnames = function classnames() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return args.map(function (classname) {
    if (typeof classname === 'string') {
      return px(classname);
    } else if ((typeof classname === 'undefined' ? 'undefined' : _typeof(classname)) === 'object') {
      return Object.keys(classname).filter(function (key) {
        return !!classname[key];
      }).map(px).join(' ');
    }
    return '';
  }).join(' ');
};

var spinDefault = ['loading', 'loading-3-quarters'];

/* 多色图标 */
var svgDefault = ['police-avatar', 'in-conversation', 'airport', 'hotel', 'track-point-blue', 'camera-point-samll', 'track-point-red', 'location-point-blue', 'location-point-red', 'judicial-circle-hover', 'judicial-circle', 'location-blue', 'gun-bubble-blue', 'gun-bubble-white', 'gun-bubble-black'];

var Zcon = function (_Component) {
  _inherits(Zcon, _Component);

  function Zcon() {
    _classCallCheck(this, Zcon);

    return _possibleConstructorReturn(this, (Zcon.__proto__ || Object.getPrototypeOf(Zcon)).apply(this, arguments));
  }

  _createClass(Zcon, [{
    key: 'isSpin',
    value: function isSpin() {
      if (this.props.spin) return true;
      if (this.props.spin === false) return false;
      return _lodash2.default.includes(spinDefault, this.props.type);
    }
  }, {
    key: 'isSvg',
    value: function isSvg() {
      if (this.props.svg) return true;
      if (this.props.svg === false) return false;
      return _lodash2.default.includes(svgDefault, this.props.type);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          type = _props.type,
          spin = _props.spin,
          svg = _props.svg,
          style = _props.style,
          className = _props.className,
          otherProps = _objectWithoutProperties(_props, ['type', 'spin', 'svg', 'style', 'className']);

      if (this.isSvg()) {
        return _react2.default.createElement(
          'svg',
          {
            className: PREFIX + ' ' + classnames({ spin: this.isSpin() }) + ' ' + (className || ''),
            'aria-hidden': 'true'
          },
          _react2.default.createElement('use', { xlinkHref: '#' + px(type) })
        );
      }

      return _react2.default.createElement('i', _extends({
        className: PREFIX + ' ' + classnames(type, { spin: this.isSpin() }) + ' ' + (className || ''),
        style: _lodash2.default.assign({}, style)
      }, otherProps));
    }
  }]);

  return Zcon;
}(_react.Component);

Zcon.propTypes = {
  type: _propTypes2.default.string.isRequired,
  spin: _propTypes2.default.bool,
  svg: _propTypes2.default.bool
};

Zcon.defaultProps = {};

exports.default = Zcon;
//# sourceMappingURL=Zcon.js.map
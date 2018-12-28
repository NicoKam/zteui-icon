"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /* eslint-disable react/forbid-prop-types */


var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _svgIcon = require("./svgIcon");

var _svgIcon2 = _interopRequireDefault(_svgIcon);

var _deprecatedIcon = require("./deprecatedIcon");

var _deprecatedIcon2 = _interopRequireDefault(_deprecatedIcon);

require("../../assets/iconfont/iconfont");

require("../../assets/Zcon.css");

require("../../assets/iconfont/iconfont.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PREFIX = "zteicon";

var px = function px(clsName) {
  return PREFIX + "-" + clsName;
};

var classnames = function classnames() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return args.map(function (classname) {
    if (typeof classname === "string") {
      return px(classname);
    } else if ((typeof classname === "undefined" ? "undefined" : _typeof(classname)) === "object") {
      return Object.keys(classname).filter(function (key) {
        return !!classname[key];
      }).map(px).join(" ");
    }
    return "";
  }).join(" ");
};

var spinDefault = ["loading", "loading-3-quarters"];

var deprecatedLog = {};

var typeFilter = function typeFilter(type) {
  if (_deprecatedIcon2.default[type]) {
    var newType = _deprecatedIcon2.default[type];
    if (!deprecatedLog[type]) {
      deprecatedLog[type] = 1;
      console.error("[\u8B66\u544A]\u60A8\u5F53\u524D\u4F7F\u7528\u7684\u56FE\u6807 " + type + " \u5DF2\u88AB\u4FEE\u6539\u4E3A " + newType + " \u3002\u8BF7\u66F4\u6362\u65B0\u7684\u540D\u79F0");
    }
    return newType;
  }
  return type;
};

var Zcon = function (_Component) {
  _inherits(Zcon, _Component);

  function Zcon() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Zcon);

    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Zcon.__proto__ || Object.getPrototypeOf(Zcon)).call.apply(_ref, [this].concat(args))), _this), _this.getType = function () {
      return typeFilter(_this.props.type);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Zcon, [{
    key: "isSpin",
    value: function isSpin() {
      var spin = this.props.spin;

      var type = this.getType();
      if (spin) return true;
      if (spin === false) return false;
      return spinDefault.includes(type);
    }
  }, {
    key: "isSvg",
    value: function isSvg() {
      var svg = this.props.svg;

      var type = this.getType();
      if (svg === false) return false;
      // if (svg && svgDefault.includes(type)) return true;
      return _svgIcon2.default.includes(type);
    }
  }, {
    key: "render",
    value: function render() {
      var _props = this.props,
          spin = _props.spin,
          svg = _props.svg,
          style = _props.style,
          className = _props.className,
          antCls = _props.antCls,
          otherProps = _objectWithoutProperties(_props, ["spin", "svg", "style", "className", "antCls"]);

      var type = this.getType();

      var prefixCls = PREFIX + " " + (antCls ? "anticon" : "");

      if (this.isSvg()) {
        return _react2.default.createElement(
          "svg",
          _extends({
            className: prefixCls + " " + classnames({ spin: this.isSpin() }) + " " + (className || ""),
            "aria-hidden": "true",
            style: Object.assign({}, style)
          }, otherProps),
          _react2.default.createElement("use", { xlinkHref: "#" + px(type) })
        );
      }

      return _react2.default.createElement("i", _extends({
        className: prefixCls + " " + classnames(type, { spin: this.isSpin() }) + " " + (className || ""),
        style: Object.assign({}, style)
      }, otherProps));
    }
  }]);

  return Zcon;
}(_react.Component);

Zcon.propTypes = {
  className: _propTypes2.default.string,
  style: _propTypes2.default.object,
  antCls: _propTypes2.default.bool,
  type: _propTypes2.default.string.isRequired,
  spin: _propTypes2.default.bool,
  svg: _propTypes2.default.bool
};

Zcon.defaultProps = {
  className: undefined,
  style: {},
  spin: undefined,
  svg: undefined,
  antCls: false
};

exports.default = Zcon;
//# sourceMappingURL=Zcon.js.map
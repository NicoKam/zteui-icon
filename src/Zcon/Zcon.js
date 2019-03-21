/* eslint-disable react/forbid-prop-types */
import React, { Component } from "react";
import PropTypes from "prop-types";
import svgDefault from "./svgIcon";
import deprecatedIcon from "./deprecatedIcon";

import IconCache, { specialViewBox } from "../../assets/iconfont/iconfont-es";
// import "../../assets/iconfont/iconfont";
import "../../assets/Zcon.css";
// import "../../assets/iconfont/iconfont.css";

const PREFIX = "zteicon";

const px = (clsName) => `${PREFIX}-${clsName}`;

const classnames = (...args) => args.map((classname) => {
  if (typeof classname === "string") {
    return px(classname);
  } else if (typeof classname === "object") {
    return Object.keys(classname)
      .filter((key) => !!classname[key])
      .map(px)
      .join(" ");
  }
  return "";
})
  .join(" ");

const spinDefault = [
  "loading",
  "loading-3-quarters",
];

const deprecatedLog = {};

const typeFilter = (type) => {
  if (deprecatedIcon[type]) {
    const newType = deprecatedIcon[type];
    if (!deprecatedLog[type]) {
      deprecatedLog[type] = 1;
      console.error(`[警告]您当前使用的图标 ${type} 已被修改为 ${newType} 。请更换新的名称`);
    }
    return newType;
  }
  return type;
};

export const createPrefixIcon = (prefix = PREFIX) => {
  class Zcon extends Component {
    getType = () => {
      const { type } = this.props;
      return typeFilter(type);
    };

    getViewBox = (p, type) => {
      const { viewBox } = this.props;
      if (viewBox) return viewBox;
      if (p === PREFIX && specialViewBox[type]) {
        return specialViewBox[type];
      }
      return "0 0 1024 1024";
    };

    isSpin() {
      const { spin } = this.props;
      const type = this.getType();
      if (spin) return true;
      if (spin === false) return false;
      return spinDefault.includes(type);
    }

    isSvg() {
      const { svg } = this.props;
      const type = this.getType();
      if (svg === false) return false;
      // if (svg && svgDefault.includes(type)) return true;
      return svgDefault.includes(type);
    }

    render() {
      const {
        spin, svg, style, className, antCls, prefix: p, viewBox, ...otherProps
      } = this.props;
      const type = this.getType();

      const prefixCls = `${PREFIX} ${antCls ? "anticon" : ""}`;
      let children = <use xlinkHref={`#${p}-${(type)}`} />;

      const hasCache = p === PREFIX && IconCache[type];
      if (hasCache) {
        children = IconCache[type].map((props, index) => (
          <path key={`${p}-${type}-${index}`} {...props} />));
      }

      return (
        <i
          className={`${prefixCls} ${classnames({ spin: this.isSpin() })} ${className || ""}`}
          aria-hidden="true"
          style={Object.assign({}, style)}
          {...otherProps}
        >
          <svg viewBox={hasCache ? "0 0 1024 1024" : ""}>
            {
              children
            }
          </svg>
        </i>
      );
    }
  }

  Zcon.propTypes = {
    className: PropTypes.string,
    prefix: PropTypes.string,
    viewBox: PropTypes.string,
    style: PropTypes.object,
    antCls: PropTypes.bool,
    type: PropTypes.string.isRequired,
    spin: PropTypes.bool,
    svg: PropTypes.bool,
  };

  Zcon.defaultProps = {
    className: undefined,
    viewBox: undefined,
    prefix,
    style: {},
    spin: undefined,
    svg: undefined,
    antCls: false,
  };
  return Zcon;
};

export default createPrefixIcon();

/* eslint-disable react/forbid-prop-types */
import React, { Component } from "react";
import PropTypes from "prop-types";
import svgDefault from "./svgIcon";
import deprecatedIcon from "./deprecatedIcon";

import IconCache from "../../assets/iconfont/iconfont-es";
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
    getType = () => typeFilter(this.props.type);

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
        spin, svg, style, className, antCls, prefix: p, ...otherProps
      } = this.props;
      const type = this.getType();

      const prefixCls = `${PREFIX} ${antCls ? "anticon" : ""}`;
      let children = <use xlinkHref={`#${p}-${(type)}`} />;

      let hasCache = p === PREFIX && IconCache[type];
      if (hasCache) {
        children = IconCache[type].map((props, index) => (
          <path key={`${p}-${type}-${index}`} {...props} />));
      }

      return (
        <svg
          className={`${prefixCls} ${classnames({ spin: this.isSpin() })} ${className || ""}`}
          aria-hidden="true"
          style={Object.assign({}, style)}
          viewBox={hasCache ? "0 0 1024 1024" : ""}
          {...otherProps}
        >
          {
            children
          }
        </svg>
      );
    }
  }

  Zcon.propTypes = {
    className: PropTypes.string,
    prefix: PropTypes.string,
    style: PropTypes.object,
    antCls: PropTypes.bool,
    type: PropTypes.string.isRequired,
    spin: PropTypes.bool,
    svg: PropTypes.bool,
  };

  Zcon.defaultProps = {
    className: undefined,
    prefix,
    style: {},
    spin: undefined,
    svg: undefined,
    antCls: false,
  };
  return Zcon;
};

export default createPrefixIcon();

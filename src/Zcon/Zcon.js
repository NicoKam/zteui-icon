/* eslint-disable react/forbid-prop-types */
import React, { Component } from "react";
import PropTypes from "prop-types";
import deprecatedIcon from "./deprecatedIcon";
import iconfont from "../../assets/iconfont";
import "../../assets/Zcon.css";

const PREFIX = "zteicon";

const px = (clsName) => `${PREFIX}-${clsName}`;

const { icon: IconCache, specialViewBox } = iconfont;

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
      /* eslint-disable-next-line no-console */
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
      if (typeof type === "string") {
        return typeFilter(type);
      }
      return type;
    };

    getViewBox = (p, type) => {
      const { viewBox } = this.props;
      if (viewBox) return viewBox;
      if (p === PREFIX && specialViewBox[type]) {
        return specialViewBox[type];
      }
      return "0 0 1024 1024";
    };

    isSpin = () => {
      const { spin } = this.props;
      const type = this.getType();
      if (spin) return true;
      if (spin === false) return false;
      return spinDefault.includes(type);
    };

    render() {
      const {
        spin, style, className, antCls, prefix: p, viewBox, type: noUse, icon, ...otherProps
      } = this.props;
      const type = this.getType();

      const prefixCls = `${PREFIX} ${antCls ? "anticon" : ""}`;
      let children = <use xlinkHref={`#${p}-${(type)}`} />;

      if (typeof icon === "object") {
        /* 如果type是object类型，说明自定义传入了icon，所以直接使用type传入的配置即可 */
        children = icon.map((props, index) => (
          <path key={`${p}-${type}-${index}`} {...props} />));
      } else {
        /* 从预设的Icon中获取 */
        const hasCache = p === PREFIX && IconCache[type];
        if (hasCache) {
          children = IconCache[type].map((props, index) => (
            <path key={`${p}-${type}-${index}`} {...props} />));
        }
      }

      const typeClass = `${p}-${type}`;

      return (
        <i
          className={`${prefixCls} ${typeClass} ${classnames({ spin: this.isSpin() })} ${className || ""}`}
          aria-hidden="true"
          style={Object.assign({}, style)}
          {...otherProps}
        >
          <svg viewBox={this.getViewBox(p, type)}>
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
    icon: PropTypes.arrayOf(PropTypes.object),
    spin: PropTypes.bool,
  };

  Zcon.defaultProps = {
    className: undefined,
    viewBox: undefined,
    prefix,
    style: {},
    spin: undefined,
    icon: undefined,
    antCls: false,
  };
  return Zcon;
};

export default createPrefixIcon();

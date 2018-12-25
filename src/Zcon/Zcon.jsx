/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import svgDefault from './svgIcon';


import '../../assets/iconfont/iconfont';
import '../../assets/Zcon.css';
import '../../assets/iconfont/iconfont.css';

const PREFIX = 'zteicon';


const px = (clsName) => `${PREFIX}-${clsName}`;

const classnames = (...args) => args.map((classname) => {
  if (typeof classname === 'string') {
    return px(classname);
  } else if (typeof classname === 'object') {
    return Object.keys(classname)
      .filter((key) => !!classname[key])
      .map(px)
      .join(' ');
  }
  return '';
})
  .join(' ');

const spinDefault = [
  'loading',
  'loading-3-quarters',
];

class Zcon extends Component {
  isSpin() {
    if (this.props.spin) return true;
    if (this.props.spin === false) return false;
    return spinDefault.includes(this.props.type);
  }

  isSvg() {
    if (this.props.svg === false) return false;
    // if (this.props.svg && svgDefault.includes(this.props.type)) return true;
    return svgDefault.includes(this.props.type);
  }

  render() {
    const {
      type, spin, svg, style, className, antCls, ...otherProps
    } = this.props;

    const prefixCls = `${PREFIX} ${antCls ? 'anticon' : ''}`;

    if (this.isSvg()) {
      return (
        <svg
          className={`${prefixCls} ${classnames({ spin: this.isSpin() })} ${className || ''}`}
          aria-hidden="true"
          style={Object.assign({}, style)}
          {...otherProps}
        >
          <use xlinkHref={`#${px(type)}`} />
        </svg>
      );
    }

    return (
      <i
        className={`${prefixCls} ${classnames(type, { spin: this.isSpin() })} ${className || ''}`}
        style={Object.assign({}, style)}
        {...otherProps}
      />
    );
  }
}

Zcon.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  antCls: PropTypes.bool,
  type: PropTypes.string.isRequired,
  spin: PropTypes.bool,
  svg: PropTypes.bool,
};

Zcon.defaultProps = {
  antCls: false,
};

export default Zcon;

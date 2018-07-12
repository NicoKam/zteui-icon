import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';


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

const svgDefault = [
  'in-conversation',
  'airport',
  'hotel',
];

class Zcon extends Component {
  isSpin() {
    if (this.props.spin) return true;
    if (this.props.spin === false) return false;
    return _.includes(spinDefault, this.props.type);
  }

  isSvg() {
    if (this.props.svg) return true;
    if (this.props.svg === false) return false;
    return _.includes(svgDefault, this.props.type);
  }

  render() {
    const {
      type, spin, svg, style, className, ...otherProps
    } = this.props;

    if (this.isSvg()) {
      return (
        <svg
          className={`${PREFIX} ${classnames({ spin: this.isSpin() })} ${className || ''}`}
          aria-hidden="true"
        >
          <use xlinkHref={`#${px(type)}`} />
        </svg>
      );
    }

    return (
      <i
        className={`${PREFIX} ${classnames(type, { spin: this.isSpin() })} ${className || ''}`}
        style={_.assign({}, style)}
        {...otherProps}
      />
    );
  }
}

Zcon.propTypes = {
  type: PropTypes.string.isRequired,
  spin: PropTypes.bool,
  svg: PropTypes.bool,
};

Zcon.defaultProps = {};

export default Zcon;

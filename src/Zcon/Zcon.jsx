import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import '../../assets/Zcon.css';
import '../../assets/iconfont/iconfont.css';

const PREFIX = 'zteicon';


const px = (clsName) => `${PREFIX}-${clsName}`;

const spinDefault = [
  'loading',
  'loading-3-quarters',
];

class Zcon extends Component {
  isSpin() {
    if (this.props.spin) return true;
    if (this.props.spin === false) return false;
    return _.includes(spinDefault, this.props.type);
  }

  render() {
    return (
      <i
        className={`${PREFIX} ${px(this.props.type)} ${this.isSpin() ? px('spin') : ''} ${this.props.className || ''}`}
        style={_.assign({}, this.props.style)}
      />
    );
  }
}

Zcon.propTypes = {
  type: PropTypes.string.isRequired,
  spin: PropTypes.bool,
};

Zcon.defaultProps = {};

export default Zcon;

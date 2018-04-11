import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import '../../assets/Zcon.css';
import '../../assets/iconfont/iconfont.css';

const PREFIX = 'zteicon';

const fontSizeCache = {
  default: 14,
  large: 20,
  small: 12,
};

class Zcon extends Component {
  render() {
    return (
      <i
        className={`${PREFIX} ${PREFIX}-${(this.props.type)} ${this.props.className || ''}`}
        style={_.assign({}, this.props.style)}
      />
    );
  }
}

Zcon.propTypes = {
  type: PropTypes.string.isRequired,
};

Zcon.defaultProps = {
};

export default Zcon;

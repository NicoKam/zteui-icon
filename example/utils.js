import classnames from 'classnames';
import _ from 'lodash';

export default {
  classnames: (prefix, styles) => {
    const cx = classnames.bind(styles);
    return (...names) =>
      cx(_.map(names, name => {
        if (typeof name === 'string') {
          return `${prefix}-${name}`;
        } else if (typeof name === 'object') {
          const returnObj = {};
          for (const key in name) {
            if (Object.prototype.hasOwnProperty.call(name, key)) {
              returnObj[`${prefix}-${key}`] = name[key];
            }
          }
          return returnObj;
        }
        return '';
      }));
  },
};

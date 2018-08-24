import classnames from 'classnames';

export default {
  classnames: (prefix, styles) => {
    const cx = classnames.bind(styles);
    return (...names) =>
      cx(names.map(name => {
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

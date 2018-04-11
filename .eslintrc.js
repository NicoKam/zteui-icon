module.exports = {
  parser: 'babel-eslint',
  extends: 'airbnb',
  plugins: ['react'],
  settings: {
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', 'src'],
      },
    },
  },
  env: {
    browser: true,
    mocha: true,
    es6: true,
  },
  rules: {
    'spaced-comment': [0],
    'class-methods-use-this': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'no-restricted-syntax': 0,
    'react/jsx-closing-tag-location': 0,
    'arrow-parens': 0,
    'react/prefer-stateless-function': 0,
    'react/require-default-props': 0,
    'jsx-a11y/img-redundant-alt': 0,
    'jsx-a11y/interactive-supports-focus': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'jsx-a11y/mouse-events-have-key-events': 0,
    'no-mixed-operators': 0,
    'react/prop-types': [1, { ignore: ['children'], customValidators: [] }],
    'react/no-array-index-key': 1,
    'no-underscore-dangle': 1,
    'no-unused-vars': 1,
    'space-before-blocks': 1,
    'jsx-a11y/no-static-element-interactions': 0,
    'no-return-assign':1,
  },
};

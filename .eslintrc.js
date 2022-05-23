module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  globals: {
    after: true,
    afterAll: true,
    afterEach: true,
    before: true,
    beforeAll: true,
    beforeEach: true,
    describe: true,
    it: true,
    shallow: true,
    mount: true,
    expect: true,
    jest: true,
    render: true,
    toJson: true
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'plugin:react/jsx-runtime',
    'plugin:testing-library/react',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
  // 'prefer-arrow/prefer-arrow-functions': [2],
    'react/function-component-definition': [0],
    'react/jsx-props-no-spreading': [0],
    'comma-dangle': [0],
    'no-param-reassign': [0],
    'implicit-arrow-linebreak': [0],
    'react/no-array-index-key': [0],
    'arrow-spacing': [0],
    'no-return-await': [0],
    'object-curly-newline': [0],
    'operator-linebreak': [0],
    'no-shadow': [0],
    'no-underscore-dangle': [0],
    'react/forbid-prop-types': [1],
    camelcase: [0],
  },

  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.scss'],
        moduleDirectory: ['node_modules', 'src/'],
      },
    },
  },
};

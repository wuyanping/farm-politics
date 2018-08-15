// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential', 
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',


    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    "indent": [0, "tab"],
    "no-tabs": "off",
    "no-undef": 0,
    "no-unused-vars": 0,
    'no-eval': 0,
    "eqeqeq": 0,
    "one-var": 0,
    "no-useless-escape": 0,
    "camelcase": 0,
    "no-unneeded-ternary": 0,
    "no-extra-boolean-cast": 0,
    "no-redeclare": 0,
    "comma-dangle": "off",
    "handle-callback-err": [0],
    "semi": 0,
    'no-new':0,
    // 强制模块内的 import 排序
    "sort-imports": 0,
    "no-useless-return": 0,
    "no-unused-expressions": 0,
    "no-multiple-empty-lines": 0,
    "no-multi-spaces": 0,
    "prefer-promise-reject-errors": 0,
    "import first": 0,
  }
}

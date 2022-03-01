const { ast, visitorKeys } = require('@roku-road/bright')
const { version } = require('../package.json')

const allRules = [
  'dependencies-order',
  'function-no-return',
  'indent',
  'missing-trailing-comma',
  'no-print',
  'no-stop',
  'no-uninitialized-variables',
  'sub-to-function',
].sort()

const makeRules = () => {
  const mapped = {}

  allRules.map(rule => (mapped[rule] = require(`./rules/${rule}`)))

  return mapped
}

const adjustCode = (code) => {
  // Workaround for bug in Bright parser. Empty file and following texts cause parsing errors, so they need to be replaced in parsed code.
  if (!code) {
    code = '\'';
  }

  return code
    .replace(/[.]then/g, '.the~')
    .replace(/[.]catch/g, '.catc~')
    .replace(/[#]/g, '~');
}

const configs = {
  extends: {},
  recommended: {
    parser: "./index.js",
    plugins: ['@dazn/kopytko'],
    rules: {
      "no-empty": "off",
      "no-undef": "off",
      "no-extra-semi": "off",
      "no-regex-spaces": "off",
      "no-unreachable": "off",
      "no-irregular-whitespace": "off",
      "no-useless-escape": "off",
      "no-constant-condition": "off",
      "no-unexpected-multiline": "off",
      "no-multiple-empty-lines": ["error", { "max": 1, "maxEOF": 1 }],
      "@dazn/kopytko/no-print": "warn",
      "@dazn/kopytko/no-stop": "error",
      "@dazn/kopytko/sub-to-function": "warn",
      "@dazn/kopytko/no-uninitialized-variables": "warn",
    }
  },
};

const rules = makeRules()

const parseForESLint = (code) => {
  code = adjustCode(code);

  return {
    ast: ast(code),
    code,
    scopeManager: null,
    services: {},
    visitorKeys,
  }
}

module.exports = { configs, rules, parseForESLint, version }

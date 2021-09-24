const parser = require('@roku-road/bright');
const getRules = require('./get-rules');

const configs = {
  recommended: {
    parser: "@dazn/eslint-plugin-kopytko",
    plugins: ['@dazn/kopytko', 'roku'],
    rules: {},
  },
};

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

const parseForESLint = (code) => {
  code = adjustCode(code);

  return {
    ast: parser.ast(code),
    code,
    scopeManager: null,
    services: {},
    visitorKeys: parser.visitorKeys,
  };
};

module.exports = {
  configs,
  parseForESLint,
  rules: getRules(),
};

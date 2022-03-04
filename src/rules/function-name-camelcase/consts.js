const CAMELCASE_PATTERN = /^_?[a-z]+[a-zA-Z0-9]*$/

const meta = {
  type: 'suggestion',
  docs: {
    category: 'Stylistic Issues',
    description: 'Check that function name with is camelcase, ignoring leading `_`',
    recommended: true,
  },
  fixable: 'code',
  messages: {
    invalid: `Function name: "{{name}}" should match expression ${CAMELCASE_PATTERN.source}`,
  },
  schema: [],
}

module.exports = {
  meta,
  CAMELCASE_PATTERN
};

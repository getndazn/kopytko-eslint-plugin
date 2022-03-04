const MESSAGE = 'missingComma';

const meta = {
  type: 'suggestion',
  docs: {
    category: 'Stylistic Issues',
    description: 'Enforces a trailing comma after every property of multiline associative array',
    recommended: true,
    url: 'https://github.com/getndazn/kopytko-eslint-plugin#@daznkopytkono-uninitialized-variables'
  },
  fixable: 'code',
  messages: {
    [MESSAGE]: 'Property \"{{property}}\" is missing trailing comma',
  },
  schema: [],
};

module.exports = {
  messageId: MESSAGE,
  meta,
};

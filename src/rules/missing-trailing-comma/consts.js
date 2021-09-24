const MESSAGE = 'missingComma';

const meta = {
  docs: {
    category: 'Stylistic Issues',
    description: 'Enforces a trailing comma after every property of multiline associative array',
    recommended: true,
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

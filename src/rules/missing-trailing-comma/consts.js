const MESSAGE = 'missingComma';

const meta = {
  docs: {
    category: 'Stylistic Issues',
    description: 'Check that property of associative array is followed by comma when associative array definition is multiline or property is not the last one',
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

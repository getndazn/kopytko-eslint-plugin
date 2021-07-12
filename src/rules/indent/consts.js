const MESSAGE = 'wrongIndentation';

const meta = {
  docs: {
    category: 'Stylistic Issues',
    description: 'Enforce consistent indentation',
    recommended: true,
  },
  fixable: 'code',
  messages: {
    [MESSAGE]: 'Expected indentation of {{expectedIndentation}} but found {{actualIndentation}}.',
  },
  schema: [{
    type: 'number',
  }],
};

module.exports = {
  messageId: MESSAGE,
  meta,
};

const MESSAGE = 'wrongIndentation';

const meta = {
  type: 'suggestion',
  docs: {
    category: 'Stylistic Issues',
    description: 'Enforce consistent indentation',
    recommended: true,
    url: 'https://github.com/getndazn/kopytko-eslint-plugin#@daznkopytkoindent'
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

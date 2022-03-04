const MESSAGE = 'wrongDependenciesOrder';

const meta = {
  type: 'suggestion',
  docs: {
    category: 'Stylistic Issues',
    description: 'Enforce alphabetical order of dependencies list',
    recommended: true,
    url: 'https://github.com/getndazn/kopytko-eslint-plugin#@daznkopytkodependencies-order'
  },
  fixable: 'code',
  messages: {
    [MESSAGE]: 'Wrong dependencies order',
  },
  schema: [],
};

module.exports = {
  messageId: MESSAGE,
  meta,
};

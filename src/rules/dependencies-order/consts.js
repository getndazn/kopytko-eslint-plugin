const MESSAGE = 'wrongDependenciesOrder';

const meta = {
  docs: {
    category: 'Stylistic Issues',
    description: 'Enforce alphabetical order of dependencies list',
    recommended: true,
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

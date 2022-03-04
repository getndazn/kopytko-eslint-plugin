const { meta, CAMELCASE_PATTERN } = require('./consts');

const create = (context) => {
  function testName(node) {
    const { id } = node
    const { name } = id

    if (!CAMELCASE_PATTERN.test(name)) {
      context.report({
        data: {
          name,
        },
        messageId: 'invalid',
        node,
      })
    }
  }

  return {
    FunctionDeclaration: testName,
    SubDeclaration: testName,
  }
}

module.exports = { meta, create }

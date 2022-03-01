const meta = {
  type: 'suggestion',
  docs: {
    category: 'Possible Errors',
    description: 'Disallows the use of `print` and `?`',
    recommended: true,
    url: 'https://github.com/getndazn/kopytko-eslint-plugin#@daznkopytkono-print'
  },
  fixable: 'code',
  messages: { unexpected: 'Unexpected {{statement}} statement.' },
  schema: []
}

const create = (context) => {
  return {
    PrintStatement(node) {
      context.report({
        data: { statement: 'print' },
        messageId: 'unexpected',
        node
      })
    }
  }
}

module.exports = { meta, create }

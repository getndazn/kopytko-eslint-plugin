const meta = {
  type: 'suggestion',
  docs: {
    category: 'Possible Errors',
    description: 'Disallows the use of `stop`',
    recommended: true,
    url: 'https://github.com/getndazn/kopytko-eslint-plugin#@daznkopytkono-stop'
  },
  fixable: 'code',
  messages: { unexpected: 'Unexpected {{statement}} statement.' },
  schema: []
}

const create = (context) => {
  return {
    StopStatement(node) {
      context.report({
        data: { statement: 'stop' },
        messageId: 'unexpected',
        node
      })
    }
  }
}

module.exports = { meta, create }

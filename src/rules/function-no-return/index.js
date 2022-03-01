const RETURN_TOKEN = 'return'
const EMPTY_MESSAGE = 'empty'
const RETURN_MESSAGE = 'return'

const meta = {
  type: 'suggestion',
  docs: {
    category: 'Stylistic Issues',
    description: 'Check that `Function` with defined return type has RETURN statements',
    recommended: true,
    url: 'https://github.com/getndazn/kopytko-eslint-plugin#@daznkopytkofunction-no-return'
  },
  fixable: 'code',
  messages: {
    [EMPTY_MESSAGE]: 'Function {{name}} should return ({{type}}) but it is EMPTY',
    [RETURN_MESSAGE]: 'Function {{name}} should return ({{type}}) but it has no RETURN'
  },
  schema: []
}

const create = (context) => {
  return {
    FunctionDeclaration(node) {
      const { id, ReturnType, body } = node
      const name = id.name
      const type = ReturnType && ReturnType.value.toLowerCase()
      let messageId = null

      if (type && type !== 'void') {
        if (body.loc === null) {
          messageId = EMPTY_MESSAGE
        } else {
          const allTokens = context.getSourceCode().getTokens(body)

          if (allTokens.length === 0) {
            messageId = EMPTY_MESSAGE
          } else {
            const returnStatement = allTokens.find((token) => token.value.toLowerCase() === RETURN_TOKEN)

            if (!returnStatement) {
              messageId = RETURN_MESSAGE
            }
          }
        }
      }

      if (messageId) {
        context.report({
          data: {
            name,
            type
          },
          messageId,
          node
        })
      }
    }
  }
}

module.exports = { meta, create }

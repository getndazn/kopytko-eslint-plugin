const meta = {
  type: 'suggestion',
  docs: {
    category: 'Stylistic Issues',
    description: 'Check that `Function` has a return TYPE defined',
    recommended: true,
  },
  fixable: 'code',
  messages: {
    NO_RETURN_TYPE: 'Function {{name}} needs a return type specified',
  },
  schema: [],
}

const create = (context) => {
  return {
    FunctionDeclaration(node) {
      const { ReturnType } = node
      if (!ReturnType) {
        context.report({
          data: {
            name: node.id.name,
          },
          messageId: 'NO_RETURN_TYPE',
          node,
        })
      }
    },
  }
}

module.exports = { meta, create }

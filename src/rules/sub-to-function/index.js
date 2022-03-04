const meta = {
  type: 'suggestion',
  docs: {
    category: 'Stylistic Issues',
    description: 'Enforce `function as void` over `sub()`',
    recommended: true,
    url: 'https://github.com/getndazn/kopytko-eslint-plugin#daznkopytkosub-to-function'
  },
  fixable: 'code',
  messages: {
    noReturn: 'Sub {{name}} should not have a return type ({{type}}). Consider replacing it with Function'
  },
  schema: []
}

const create = (context) => {
  return {
    SubDeclaration(node) {
      const { id, ReturnType } = node
      const name = id.name
      const type = ReturnType && ReturnType.value.toLowerCase()

      if (type) {
        context.report({
          data: {
            name,
            type
          },
          messageId: 'noReturn',
          node
        })
      }
    }
  }
}

module.exports = { meta, create }

const meta = {
  type: 'suggestion',
  docs: {
    category: 'Possible Errors',
    description: 'Check that all function parameters are referenced',
    recommended: true,
  },
  fixable: 'code',
  messages: {
    UNUSED:
      'Parameter {{name}} in function {{functionName}} is not used. Consider removing it if it is not needed.',
  },
  schema: [],
}

function findAllRefs(scope) {
  let refs = []
  refs = refs.concat(scope.references)
  scope.childScopes.forEach(s => {
    refs = refs.concat(findAllRefs(s))
  })
  return refs
}

const create = (context) => {
  return {
    Identifier(node) {
      if (node.parent && !['Property', 'Parameter', 'DotMemberExpression'].find(type => type === node.parent.type)) {
        if (!context.getScope().references
          .find(({ identifier }) => identifier.name === node.name && identifier.range[0] === node.range[0] && identifier.range[1] === node.range[1])) {
          context.getScope().references.push({
            from: context.getScope(),
            identifier: node,
          })
        }
      }
    },
    'FunctionDeclaration:exit'(fn) {
      if (fn.params && fn.params.args.length > 0) {
        fn.params.args.forEach(node => {
          const scope = context.getScope()
          const ref = findAllRefs(scope).find(r => r.identifier.name === node.name.name)
          const block = context.getScope().block
          const functionName = block.id ? block.id.name : 'anonymous'
          if (!ref) {
            context.report({
              data: {
                functionName,
                name: node.name.name,
              },
              messageId: 'UNUSED',
              node,
            })
          }
        })
      }
    },
  }
}

module.exports = { meta, create }

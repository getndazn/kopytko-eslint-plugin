const { EOL } = require('os')
const { addDeclaredVariable, addParamsToScope, findAllDeclaredVariables, getFileGlobals, getGlobalsFromComment, getProgramGlobalComments, globals, isInForEach, isInForLoop } = require('./context-globals')

class BaseUninitializedRule {

  meta() {
    return {
      type: 'suggestion',
      docs: {
        category: 'Possible Errors',
        description: this.description(),
        recommended: true,
        url: this.url(),
      },
      messages: {
        NOT_DECLARED:
          this.message(),
      },
      schema: [],
      hasSuggestions: true
    }
  }

  create() {
    const hasValidParent = this.hasValidParent
    return (context) => {
      return {
        'Identifier:exit'(node) {
          if (!globals.find(g => g.toLowerCase() === node.name.toLowerCase()) &&
            node.parent
            && hasValidParent(node)
          ) {
            if (!findAllDeclaredVariables(context.getScope()).find(v => v === node.name)
              && !isInForEach(node, node.name)
              && !isInForLoop(node, node.name)
              && !getFileGlobals(context).find(c => c.toLowerCase() === node.name.toLowerCase())) {

              context.report({
                data: {
                  name: node.name
                },
                loc: node.loc,
                messageId: 'NOT_DECLARED',
                node,
                suggest: [{
                  desc: 'Add to globals comment if this is a sub/function from a dependency.',
                  fix: (fixer) => {
                    const existingComments = getProgramGlobalComments(context)
                    if (existingComments.length > 0) {
                      if (getGlobalsFromComment(existingComments[0]).length > 0) {
                        return fixer.insertTextAfter(existingComments[0], ', ' + node.name)
                      } else {
                        return fixer.insertTextAfter(existingComments[0], ' ' + node.name)
                      }
                    } else {
                      return fixer.insertTextBefore(context.getAncestors()[0], `' globals ${node.name}${EOL}`)
                    }
                  }
                }]

              })
            }
          }
        },
        AssignmentExpression(node) {
          if (node.operator.type === 'EQUAL' && node.left.type === 'Identifier') {
            addDeclaredVariable(node.left.name, context)
          }
        },
        Parameter(node) {
          addDeclaredVariable(node.name.name, context)
        },
        Program(node) {
          node.body
            .filter(b => b.type === 'FunctionDeclaration' || b.type === 'SubDeclaration')
            .map(f => f.id.name)
            .forEach(f => {
              addDeclaredVariable(f, context)
            })
        },
        FunctionExpression(node) {
          addParamsToScope(node, context)
        },
        SubExpression(node) {
          addParamsToScope(node, context)
        },
      }
    }
  }
}

module.exports = BaseUninitializedRule

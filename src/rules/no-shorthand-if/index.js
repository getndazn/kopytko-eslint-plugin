const meta = {
  type: 'suggestion',
  docs: {
    category: 'Stylistic Issues',
    description: 'disallow the use `if` without `then`',
    recommended: true
  },
  fixable: 'code',
  messages: { missing: 'Missing "{{part}}" in "{{statement}}" statement.' },
  schema: []
}

const create = (context) => {
  return {
    IfStatement(node) {
      // This code block solves the issue https://github.com/RokuRoad/eslint-plugin-roku/issues/28
      // and provides indication about if/else if statetments without expression after it.
      if (!node.consequent) {
        context.report({
          data: { statement: 'after if', part: 'expression' },
          messageId: 'missing',
          node
        });
      } else {
        // We grab 2 tokens before If body to check if one of them is THEN
        const tokens = context.getSourceCode().getTokensBefore(node.consequent, 2)

        // usually THEN will be either last token or the one before NEWLINE hence we want to check both
        const maybeThen = tokens.find((t) => t.type === 'THEN')

        if (!maybeThen) {
          context.report({
            data: { statement: 'if', part: 'then' },
            messageId: 'missing',
            node
          })
        }
      }
    }
  }
}

module.exports = { meta, create }

const BaseUninitializedRule = require("../../shared/base-uninitialized-rule")

class NoUninitializedFunctionsRule extends BaseUninitializedRule {
  hasValidParent(node) {
    return node.parent.type === 'CallExpression'
  }
  message() {
    return 'Function/Sub {{name}} is not declared in scope.'
  }
  description() {
    return 'Check that all functions are declared'
  }
}
const rule = new NoUninitializedFunctionsRule()

module.exports = {
  meta: rule.meta(),
  create: rule.create()
}

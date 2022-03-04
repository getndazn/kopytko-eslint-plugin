const BaseUninitializedRule = require("../../shared/base-uninitialized-rule")

class NoUninitializedFunctionsRule extends BaseUninitializedRule {
  hasValidParent(node) {
    return ![
      "Property",
      "Parameter",
      "DotMemberExpression",
      "ForEachStatement",
      "CallExpression",
      "ConditionalIfStatement",
      "TryStatement",
    ].find((n) => n === node.parent.type);
  }
  message() {
    return "Variable {{name}} is not declared in scope.";
  }
  description() {
    return "Check that all variables are declared";
  }
  url() {
    return 'https://github.com/getndazn/kopytko-eslint-plugin#@dazn/kopytko/no-uninitialized-variables'
  }
}

const rule = new NoUninitializedFunctionsRule();

module.exports = {
  meta: rule.meta(),
  create: rule.create()
}

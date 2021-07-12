const IndentationChecker = require('./checker');
const { meta } = require('./consts');

const DEFAULT_INDENTATION = 2;

const create = context => {
  const indentationSize = context.options[0] ? parseInt(context.options[0]) : DEFAULT_INDENTATION;
  const checker = new IndentationChecker(context, indentationSize);

  return {
    SubDeclaration: node => checker.checkFunctionDeclaration(node),
    FunctionDeclaration: node => checker.checkFunctionDeclaration(node),
    BlockStatement: node => checker.checkBlockStatement(node),
    ArrayExpression: node => checker.checkArrayExpression(node),
    ObjectExpression: node => checker.checkObjectExpression(node),
  };
};

module.exports = { meta, create };

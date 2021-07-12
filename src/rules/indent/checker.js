const { messageId } = require('./consts');

const INDENTATION_CHARACTER = ' ';
const BLOCK_NODES = [
  'BlockStatement',
  'ObjectExpression',
  'ArrayExpression',
];
const EMPTY_NODE = 'EmptyStatement';

module.exports = class IndentationChecker {
  constructor(context, indentationSize) {
    this.context = context;
    this.indentationSize = indentationSize;
  }

  checkBlockStatement(node) {
    this._checkBlock(node, node.body);
  }

  checkArrayExpression(node) {
    const nodeLine = node.loc ? node.loc.start.line : null;
    const elements = this._filterFirstNodeInLines(node.elements, nodeLine);

    this._checkBlock(node, elements);
  }

  checkObjectExpression(node) {
    const nodeLine = node.loc ? node.loc.start.line : null;
    const properties = this._filterFirstNodeInLines(node.properties, nodeLine);

    this._checkBlock(node, properties);
  }

  checkFunctionDeclaration(node) {
    const actualIndentation = node.loc.start.column - 1;
    const expectedIndentation = 0;
    if (actualIndentation === 0) {
      return;
    }

    this._reportViolation(node, actualIndentation, expectedIndentation);
  }

  _checkBlock(node, children) {
    const expectedIndentation = this._calculateIndentationLevel(node) * this.indentationSize;

    children.filter(child => child.type !== EMPTY_NODE).forEach(child => {
      const actualIndentation = child.loc.start.column - 1;
      if (actualIndentation === expectedIndentation) {
        return;
      }

      this._reportViolation(child, actualIndentation, expectedIndentation);
    });
  }

  _filterFirstNodeInLines(nodes, parentLine) {
    let previousLine = parentLine;

    return nodes.filter(node => {
      let currentLine = node.loc.start.line;
      if (previousLine !== null && previousLine === currentLine) {
        return false;
      }

      previousLine = currentLine;
      return true;
    });
  }

  _calculateIndentationLevel(node) {
    let level = 1;

    while (node.parent) {
      if (BLOCK_NODES.indexOf(node.parent.type) >= 0) {
        level++;
      }

      node = node.parent;
    }

    return level;
  }

  _reportViolation(node, actualIndentation, expectedIndentation) {
    this.context.report({
      data: { actualIndentation, expectedIndentation },
      messageId,
      node,
      fix: fixer => {
        const indentationDiff = expectedIndentation - actualIndentation;
        if (indentationDiff > 0) {
          const missingIndentation = INDENTATION_CHARACTER.repeat(indentationDiff);

          return fixer.insertTextBefore(node, missingIndentation);
        }

        const sourceCode = this.context.getSourceCode();
        const nodeStartLocation = sourceCode.getIndexFromLoc(node.loc.start) - 1;

        return fixer.removeRange([nodeStartLocation + indentationDiff, nodeStartLocation]);
      }
    });
  }
}

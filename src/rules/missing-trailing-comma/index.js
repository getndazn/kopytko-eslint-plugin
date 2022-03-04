const { messageId, meta } = require('./consts');

const create = context => ({
  Property: (node) => {
    const isLastProperty = (node.parent.properties[node.parent.properties.length - 1] === node);
    const isObjectDefinedInSingleLine = (node.parent.loc.start.line === node.parent.loc.end.line);

    if (isLastProperty && isObjectDefinedInSingleLine) {
      return;
    }

    const sourceCodeText = context.getSourceCode().getText();
    const endOfPropertyIndex = node.range[1];

    const hasTrailingComma = (sourceCodeText[endOfPropertyIndex] === ',');
    if (hasTrailingComma) {
      return;
    }

    context.report({
      messageId,
      data: { property: node.key.name },
      node,
      fix: fixer => fixer.insertTextAfter(node, ','),
    });
  }
});

module.exports = { meta, create };

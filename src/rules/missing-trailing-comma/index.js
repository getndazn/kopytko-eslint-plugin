const { messageId, meta } = require('./consts');

const create = context => ({
  Property: (node) => {
    isLastProperty = (node.parent.properties[node.parent.properties.length - 1] === node);
    isObjectDefinedInSingleLine = (node.parent.loc.start.line == node.parent.loc.end.line);

    if (isLastProperty && isObjectDefinedInSingleLine) {
      return;
    }

    sourceCodeText = context.getSourceCode().getText();
    endOfPropertyIndex = node.range[1];

    hasTrailingComma = (sourceCodeText[endOfPropertyIndex] === ',');
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

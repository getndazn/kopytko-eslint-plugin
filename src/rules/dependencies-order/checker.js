const { messageId } = require('./consts'); 

const IMPORT_DEFINITION_KEY = '@import';
const DEPENDENCY_URI_REGEX = /^@(import|mock)\s+(?:pkg:)?(\/[\w-/.]+\.brs)\s*$/;
const MOCK_DEFINITION_KEY = '@mock';

module.exports = class DependenciesOrderChecker {
  constructor(context) {
    this.context = context;
  }

  check(node) {
    const dependencyEntries = this._getDependencyEntries(node);
    const sortedDependencies = this._sortDependencies([ ...dependencyEntries ]);

    if (JSON.stringify(dependencyEntries) !== JSON.stringify(sortedDependencies)) {
      this._reportViolation(node);
    }
  }

  _getDependencyEntries(node) {
    const dependencyEntries = [];

    for (let i = 0; i < node.body.length; i++) {
      const line = node.body[i];
      if (line.type !== 'Comment') {
        return dependencyEntries;
      }
      if (!line.value.includes(IMPORT_DEFINITION_KEY) && !line.value.includes(MOCK_DEFINITION_KEY)) {
        return dependencyEntries;
      }

      dependencyEntries.push(line.value);
    }

    return dependencyEntries;
  }

  _reportViolation(node) {
    this.context.report({
      messageId,
      node,
    });
  }

  _sortDependencies(dependencies) {
    dependencies.sort((a, b) => {
      const isAMock = a.includes(MOCK_DEFINITION_KEY);
      const isBMock = b.includes(MOCK_DEFINITION_KEY);

      if (isAMock !== isBMock) {
        return isAMock ? 1 : -1;
      }

      const aUri = (a.match(DEPENDENCY_URI_REGEX) || [''])[0];
      const bUri = (b.match(DEPENDENCY_URI_REGEX) || [''])[0];

      const aParts = aUri.split('/');
      const bParts = bUri.split('/');

      let i = 0;
      while (aParts[i]) {
        const aPart = aParts[i];
        const bPart = bParts[i];

        if (aPart === bPart) {
          i++;
        } else {
          if (aParts[i+1] && !bParts[i+1]) {
            return 1;
          } else if (!aParts[i+1] && bParts[i+1]) {
            return -1;
          }

          return a.toLowerCase().localeCompare(b.toLowerCase());
        }
      }
    });
  
    return dependencies;
  }
}

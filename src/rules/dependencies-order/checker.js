const { messageId } = require('./consts'); 

const DEPENDENCY_URI_REGEX = /^@(import|mock)\s+(?:pkg:)?(\/[\w-/.]+\.brs)\s*(?:(?:from\s+)([\w-@/.]+\s*))?$/;

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

      const dependency = this._getDependency(line.value)
      if (!dependency) {
        return dependencyEntries;
      }

      dependencyEntries.push(dependency);
    }

    return dependencyEntries;
  }

  _getDependency(dependencyText) {
    const parts = dependencyText.match(DEPENDENCY_URI_REGEX);

    if (parts) {
      const [_, definitionKey, filePath, packageName] = parts;

      return {
        definitionKey,
        filePath,
        packageName,
      };
    }

    return parts;
  }

  _reportViolation(node) {
    this.context.report({
      messageId,
      node,
    });
  }

  _sortDependencies(dependencies) {
    dependencies.sort((a, b) => {
      if (a.packageName !== b.packageName && (!a.packageName || !b.packageName)) {
        return this._moveExternalDependenciesBeforeLocal(a.packageName, b.packageName);
      }

      if (a.definitionKey !== b.definitionKey) {
        return this._orderDefinitionKeysAlphabetically(a.definitionKey, b.definitionKey);
      }

      if (a.packageName !== b.packageName) {
        return this._orderPackageNamesAlphabetically(a.packageName, b.packageName);
      }

      return this._orderFileNamesAlphabetically(a.filePath, b.filePath);
    });
  
    return dependencies;
  }

  _moveExternalDependenciesBeforeLocal(packageNameA, packageNameB) {
    if (!packageNameA) {
      return 1;
    }

    if (!packageNameB) {
      return -1;
    }

    return 1;
  }

  _orderDefinitionKeysAlphabetically(definitionKeyA, definitionKeyB) {
    return definitionKeyA.localeCompare(definitionKeyB);
  }

  _orderPackageNamesAlphabetically(packageNameA, packageNameB) {
    return packageNameA.localeCompare(packageNameB);
  }

  _orderFileNamesAlphabetically(filePathA, filePathB) {
    return filePathA.toLowerCase().localeCompare(filePathB.toLowerCase());
  }
}

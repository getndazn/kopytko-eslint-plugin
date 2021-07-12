module.exports = function getRules() {
  return {
    'dependencies-order': require('./rules/dependencies-order'),
    'missing-trailing-comma': require('./rules/missing-trailing-comma'),
    'indent': require('./rules/indent'),
  };
};

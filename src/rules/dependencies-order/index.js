const DependenciesOrderChecker = require('./checker');
const { meta } = require('./consts');

const create = context => {
  const checker = new DependenciesOrderChecker(context);

  return {
    Program: node => checker.check(node),
  };
};

module.exports = { meta, create };

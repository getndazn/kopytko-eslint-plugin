/*eslint no-undef: "off"*/

const { RuleTester } = require('eslint')
const { join, resolve } = require('path')

const ruleTester = new RuleTester()

const parser = resolve(join(__dirname, '../src'))

const getRule = (ruleName) => require(join('..', 'src', 'rules', ruleName))

const runTest = (ruleName, tests) => {
  const rule = getRule(ruleName)

  describe(ruleName, () => {
    it('Should exist', () => {
      expect(rule.meta).toBeTruthy()
      expect(rule.meta.docs).toBeTruthy()
      expect(rule.meta.docs.description).toBeTruthy()
      expect(rule.create).toBeTruthy()
    })

    ruleTester.run(ruleName, rule, tests)
  })
}

const validFactory = (
  name,
  head = `function validFactory()`,
  tail = `end function`
) => source => ({
  code: `${head}\n${source}\n${tail}`,
  filename: `${name}.brs`,
  options: [],
  parser,
})

const invalidFactory = (
  name,
  head = `function invalidFactory()`,
  tail = `end function`
) => ([source, errors, output = null]) => ({
  code: `${head}\n${source}\n${tail}`,
  errors,
  output,
  filename: `${name}.brs`,
  options: [],
  parser,
})

module.exports = {
  runTest,
  validFactory,
  invalidFactory
}

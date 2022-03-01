const { invalidFactory, runTest, validFactory } = require('../helpers')

const RULE_NAME = 'indent'

const valid = validFactory(RULE_NAME, '', '')
const invalid = invalidFactory(RULE_NAME, '', '')

runTest(RULE_NAME, {
  invalid: [
    [`sub test()
  example = [
      1,
    2,
  ]
end sub`,
      [{ message: 'Expected indentation of 4 but found 6.' }], `
sub test()
  example = [
    1,
    2,
  ]
end sub
`],
  ].map(invalid),
  valid: [`
sub test()
  example = [
    1,
    2,
  ]
end sub`,
  ].map(valid),
})

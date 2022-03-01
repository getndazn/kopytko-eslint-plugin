const { invalidFactory, runTest, validFactory } = require('../helpers')

const RULE_NAME = 'no-print'

const valid = validFactory(RULE_NAME)
const invalid = invalidFactory(RULE_NAME)

runTest(RULE_NAME, {
  invalid: [
    ['? "message1"', [{ messageId: 'unexpected', data: { statement: 'print' } }]],
    ['print "message1"', [{ messageId: 'unexpected', data: { statement: 'print' } }]],
    ['? 1, 2, 3', [{ messageId: 'unexpected', data: { statement: 'print' } }]],
    ['? []', [{ messageId: 'unexpected', data: { statement: 'print' } }]],
  ].map(invalid),
  valid: [
    // next would not throw stop error
    'next',
    'return 1'
  ].map(valid)
})

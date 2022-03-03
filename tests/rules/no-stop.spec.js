const { invalidFactory, runTest, validFactory } = require('../helpers')

const RULE_NAME = 'no-stop'

const valid = validFactory(RULE_NAME)
const invalid = invalidFactory(RULE_NAME)

runTest(RULE_NAME, {
  invalid: [
    [
      'stop',
      [
        // Error for the source code
        { messageId: 'unexpected', data: { statement: 'stop' } }
      ]
    ]
  ].map(invalid),
  valid: [
    // next would not throw stop error
    'next',
    'return 1'
  ].map(valid)
})

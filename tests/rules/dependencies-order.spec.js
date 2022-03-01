const { invalidFactory, runTest, validFactory } = require('../helpers')

const RULE_NAME = 'dependencies-order'

const valid = validFactory(RULE_NAME, '', '')
const invalid = invalidFactory(RULE_NAME, '', '')

runTest(RULE_NAME, {
  invalid: [
    [`
' @mock /components/mocked-function.brs
' @import /components/nested/cool-function.brs
' @import /components/nested/another-function.brs
' @import /components/main-function.brs
`,
      [{
        message: ''
      }],
    ],
  ].map(invalid),
  valid: [`
' @import /components/main-function.brs
' @import /components/nested/another-function.brs
' @import /components/nested/cool-function.brs
' @mock /components/mocked-function.brs
`,
  ].map(valid),
})

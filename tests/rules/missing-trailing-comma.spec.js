const { invalidFactory, runTest, validFactory } = require('../helpers')

const RULE_NAME = 'missing-trailing-comma'

const valid = validFactory(RULE_NAME, '', '')
const invalid = invalidFactory(RULE_NAME, '', '')

runTest(RULE_NAME, {
  invalid: [
    [`
function test()
test = {
  a: "a",
  b: "b"
}
end function
`,
      [{
        message: "Property \"b\" is missing trailing comma"
      }], `
function test()
test = {
  a: "a",
  b: "b",
}
end function·
`
    ],
  ].map(invalid),
  valid: [`
function test()
test = {
  a: "a",
  b: "b",
}
end function
`,
  ].map(valid),
})

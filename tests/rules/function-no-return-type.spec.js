const { invalidFactory, runTest, validFactory } = require('../helpers')

const RULE_NAME = 'function-no-return-type'

const valid = validFactory(RULE_NAME, '', '')
const invalid = invalidFactory(RULE_NAME, '', '')

runTest(RULE_NAME, {
  invalid: [
    [
      `function a()
        a = 5+5
      end function`,
      [{ message: 'Function a needs a return type specified' }]
    ],
  ].map(invalid),
  valid: [
    `function a() as Dynamic
      return a
     end function
  `,

    `function functionWIthReturn() as string
      return a
    end function`,

    `function voidFunction() as Void
    end function`,

    `function a() as object
      return {
        f: function() as boolean
          return false
        end function
      }
    end function`,
  ].map(valid),
})
